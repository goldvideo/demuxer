/**
 * @file: created at Monday, 25th May 2020 12:36:52 am
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * AVCVideoPacket structure.
 */
import { AVCCodec, AVCCodecData, AVCDecoderConfigurationRecord } from '../../codec/avc';
import NALU from '../../codec/avc/nalu';
import DataViewReader from '../../util/dv';
import logger from '../../util/logger';
import { PipelineContext } from '../types/flv-pipeline';

// 0 : AVCDecoderConfigurationRecord（AVC sequence header）
// 1 : One or more NALUs (Full frames are required)
// 2 : AVC end of sequence
export enum AVCPacketTypes {
    SEQUENCE_HEAD = 0, // 0 : AVCDecoderConfigurationRecord（AVC sequence header）
    NALU = 1, // 1 : One or more NALUs (Full frames are required)
    SEQUENCE_END = 2 // 2 : AVC end of sequence
}

/**
 * ISO/IEC 14496-15  5.2.4.1.1 Syntax
 * @param data
 */
export function parseAVCDecoderConfigurationRecord(data: Uint8Array): AVCDecoderConfigurationRecord {
    let version = data[0];
    let profile = data[1];
    let profileCompatibility = data[2];
    let level = data[3];
    let naluSizeLength = 1 + (data[4] & 0x03);
    let ppsNalus = [],
        spsNalus = [];

    let pos = 5;
    let numOfSPS = data[pos] & 0x1f;

    if (numOfSPS === 0) {
        logger.error(`Flv: Invalid AVCDecoderConfigurationRecord: No SPS`);
    } else if (numOfSPS > 0) {
        if (numOfSPS > 1) {
            logger.warn(`Flv: Strange AVCDecoderConfigurationRecord: SPS Count = ${numOfSPS}`);
        }

        pos++;
        for (let i = 0; i < numOfSPS; i++) {
            let spsDataLength = (data[pos] << 8) | data[pos + 1];
            pos += 2;

            spsNalus.push(data.subarray(pos, pos + spsDataLength));
            pos += spsDataLength;
        }
    }

    let numOfPPS = data[pos];

    if (numOfPPS === 0) {
        logger.error(`Flv: Invalid AVCDecoderConfigurationRecord: No PPS`);
    } else if (numOfPPS > 0) {
        if (numOfPPS > 1) {
            logger.warn(`Flv: Strange AVCDecoderConfigurationRecord: PPS Count = ${numOfPPS}`);
        }

        pos++;
        for (let i = 0; i < numOfPPS; i++) {
            let ppsDataLength = (data[pos] << 8) | data[pos + 1];
            pos += 2;

            ppsNalus.push(data.subarray(pos, pos + ppsDataLength));
            pos += ppsDataLength;
        }
    }

    return {
        version,
        profile,
        profileCompatibility,
        level,
        naluSizeLength,
        spsNalus,
        ppsNalus
    };
}

const avcCodec = new AVCCodec();
const naluList_: NALU[] = [];

avcCodec.on('nalu', (nalu: NALU) => {
    naluList_.push(nalu);
});

/**
 * @extends DataViewReader
 */
export default class AVCVideoPacket extends DataViewReader {
    avcPacketType: AVCPacketTypes;
    decoderConfigurationRecord?: AVCDecoderConfigurationRecord;
    cts: number;
    pts: number;
    dts: number;
    payload: Uint8Array;
    naluList?: NALU[];

    private avcCodec?: AVCCodec;

    /**
     * @param buffer
     */
    constructor(pipeCtx: PipelineContext, buffer: Uint8Array, timestamp: number) {
        super();

        const { flv, options } = pipeCtx;

        this.avcPacketType = buffer[0];

        if (this.avcPacketType === 1) {
            let cts_uint32 = this.readUint32(buffer, 0) & 0x00ffffff;
            this.cts = (cts_uint32 << 8) >> 8; // convert to 24-bit signed int
        } else {
            this.cts = 0;
        }

        this.dts = timestamp;
        this.pts = this.dts + this.cts;

        this.payload = buffer.subarray(4);

        if (this.avcPacketType === 0) {
            this.decoderConfigurationRecord = parseAVCDecoderConfigurationRecord(this.payload);

            flv.decoderConfigurationRecord = this.decoderConfigurationRecord;
        } else {
            if (options.decodeCodec) {
                this.naluList = [];

                let raw: AVCCodecData = {
                    pts: this.pts,
                    dts: this.dts,
                    payload: this.payload
                };

                if (!this.decoderConfigurationRecord) {
                    if (flv.decoderConfigurationRecord) {
                        raw.naluSizeLength = flv.decoderConfigurationRecord.naluSizeLength;
                    }

                    avcCodec.push(raw);

                    // Clone nalu to videoData
                    for (let i = 0; i < naluList_.length; i++) {
                        this.naluList.push(naluList_[i]);
                    }

                    // empty cache
                    naluList_.splice(0, naluList_.length);
                }
            }
        }
    }
}
