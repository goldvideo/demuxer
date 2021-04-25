/**
 * @file: avc.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * h.264/AVC codec
 */
import CacheBuffer from '../util/cache-buffer';
import EventEmitter from '../util/event-emitter';
import logger from '../util/logger';
import NALU from './avc/nalu';

export type AVCCodecData = {
    pts: number;
    dts: number;
    naluSizeLength?: number;
    payload: Uint8Array;
};

export interface AVCDecoderConfigurationRecord {
    version: number;
    profile: number;
    profileCompatibility: number;
    level: number;
    naluSizeLength: number;
    spsNalus: Uint8Array[];
    ppsNalus: Uint8Array[];
}

type ParsePesState = 0 | 1 | 2 | 3;

export class AVCCodec extends EventEmitter {
    private lastState: ParsePesState = null;
    private lastNALu: NALU = null;
    private lastNALuState: ParsePesState = null;

    private spitNalu_(bytes: Uint8Array, pts: number, dts: number) {
        let nalu: NALU = new NALU(bytes);

        nalu.pts = pts;
        nalu.dts = dts;

        this.lastNALu = nalu;
        this.emit('nalu', nalu);
    }

    push(data: AVCCodecData) {
        const { lastState, lastNALuState } = this;
        let i = 0,
            lastNALuOffset = -1,
            { pts, dts, payload, naluSizeLength } = data;

        if (!naluSizeLength) {
            // Start parse Annex-B Byte stream format
            let j = payload.byteLength - 1;
            let dropZerosLength = 0;

            // Collect tailing zeros.
            // end with 0x000000 and more...
            do {
                if (payload[j] === 0x00) {
                    dropZerosLength++;
                } else {
                    break;
                }

                j--;
            } while (j > 0);

            if (dropZerosLength >= 3) {
                // drop tailing zeros.
                payload = payload.subarray(0, j + 1);
            }

            const len = payload.length;

            let state: ParsePesState = 0;
            do {
                let value = payload[i++];

                // loop optimization.
                if (state === 0) {
                    state = value ? 0 : 1;
                    continue;
                } else if (state === 1) {
                    state = value ? 0 : 2;
                    continue;
                }

                // value will be 2 or 3
                if (!value) {
                    state = 3;
                } else if (value === 1) {
                    if (lastNALuOffset >= 0) {
                        this.lastNALuState = state;
                        this.spitNalu_(payload.subarray(lastNALuOffset, i - 1 - state), pts, dts);
                    } else {
                        // naluOffset is undefined => this is the first start code found in this PES packet
                        // first check if start code delimiter is overlapping between 2 PES packets,
                        // ie it started in last packet (lastState not zero)
                        // and ended at the beginning of this PES packet (i <= 4 - lastState)
                        const lastUnit = this.lastNALu;
                        if (lastUnit) {
                            if (lastState && i <= 4 - lastState) {
                                // start delimiter overlapping between PES packets
                                // strip start delimiter bytes from the end of last NAL unit
                                // check if lastUnit had a state different from zero
                                if (lastNALuState) {
                                    // strip last bytes
                                    lastUnit.rawData = lastUnit.rawData.subarray(
                                        0,
                                        lastUnit.rawData.byteLength - lastState
                                    );
                                }
                            }

                            // If NAL units are not starting right at the
                            // beginning of the PES packet, push preceding data
                            // into previous NAL unit.
                            let overflow = i - state - 1;
                            if (overflow > 0) {
                                logger.log(`overflow NALU found: ${overflow}/${pts}/${dts}`);
                                let cb = new CacheBuffer();

                                cb.append(lastUnit.rawData);
                                cb.append(payload.subarray(0, overflow));
                                let bytes = cb.toNewBytes();
                                cb.clear(); // gc

                                lastUnit.rawData = bytes;
                            }
                        }
                    }

                    // reset state & record last unit start byte offset.
                    if (i < len) {
                        // console.log(`'find NALU @ offset: ${i}`);
                        lastNALuOffset = i;
                        state = 0;
                    }
                } else {
                    state = 0;
                }
            } while (i < len);

            if (lastNALuOffset >= 0 && state >= 0) {
                this.lastNALuState = state;
                this.spitNalu_(payload.subarray(lastNALuOffset, len), pts, dts);
            }

            this.lastState = state;
        } else {
            let startPos = 0,
                size = 0,
                endPos = 0,
                byteLength = payload.length;
            do {
                size = 0;
                for (let k = 0; k < naluSizeLength; k++) {
                    size = size | (payload[startPos + k] << ((naluSizeLength - k - 1) * 8));
                }
                // size = (data_byte[i] << 24) | (data_byte[i + 1] << 16) | (data_byte[i + 2] << 8) | data_byte[i + 3];
                startPos += naluSizeLength;
                endPos = startPos + size;
                if (endPos > byteLength) {
                    endPos = byteLength;
                }

                this.spitNalu_(payload.subarray(startPos, endPos), pts, dts);
                startPos = endPos;
            } while (startPos < byteLength);
        }

        this.emit('done');
    }

    reset() {
        this.lastState = null;
        this.lastNALu = null;
        this.lastNALuState = null;
    }
}
