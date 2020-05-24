/**
 * @file: avc.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * h.264/AVC codec
 */
import EventEmitter from '../util/event-emitter';
import NALUnit from './avc/nalu';

interface CachedBytes extends Uint8Array {
	pts?: number;
	dts?: number;
	startCodeLength?: number;
}

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

export class AVCCodec extends EventEmitter {
	private cachedBytes?: CachedBytes;

	constructor() {
		super();

		this.cachedBytes = null;
	}

	push(data: AVCCodecData) {
		let self = this;
		let i = 0,
			naluOffset = 0,
			lastStartCodeLength = 0;
		let { pts, dts, payload, naluSizeLength } = data;
		let data_byte;

		if (this.cachedBytes) {
			try {
				data_byte = new Uint8Array(this.cachedBytes.byteLength + payload.byteLength);
			} catch (e) {
				throw `h264 alloc mem error ${this.cachedBytes.byteLength}/${payload.byteLength}`;
			}
			data_byte.set(this.cachedBytes);
			data_byte.set(payload, this.cachedBytes.byteLength);
		} else {
			data_byte = payload;
		}

		if (!naluSizeLength) {
			let j = data_byte.byteLength - 1;
			let dropZerosLength = 0;

			// Collect tailing zeros.
			// end with 0x000000 and more...
			do {
				if (data_byte[j] === 0x00) {
					dropZerosLength++;
				} else {
					break;
				}

				j--;
			} while (j > 0);

			if (dropZerosLength >= 3) {
				// drop tailing zeros.
				data_byte = data_byte.subarray(0, j + 1);
			}

			do {
				let uint32 =
					(data_byte[i] << 24) | (data_byte[i + 1] << 16) | (data_byte[i + 2] << 8) | data_byte[i + 3];
				let start_code = data_byte.length - i >= 4 ? uint32 : -1;
				let start_code_length = 0;
				let isLastByte = i === data_byte.length - 1;

				if (start_code >> 8 === 1) {
					/*commence with 3 bytes*/
					start_code_length = 3;
				} else if (start_code === 1) {
					/*commence with 4 bytes*/
					start_code_length = 4;
				}

				if (start_code_length === 3 || start_code_length === 4 || isLastByte) {
					let startPos = naluOffset + lastStartCodeLength;
					let isNaluEndByte = isLastByte && dropZerosLength >= 3;

					if (i > naluOffset && (!isLastByte || isNaluEndByte)) {
						let bytes = data_byte.subarray(startPos, isNaluEndByte ? i + 1 : i);
						let nalu = new NALUnit(bytes);

						// PES
						nalu.pts = pts;
						nalu.dts = dts;

						self.emit('nalu', nalu);
						naluOffset = i;
					}

					if (isLastByte) {
						if (dropZerosLength < 3) {
							this.cachedBytes = data_byte.subarray(naluOffset);
							this.cachedBytes.pts = pts;
							this.cachedBytes.dts = dts;
							this.cachedBytes.startCodeLength = lastStartCodeLength;
						} else {
							this.cachedBytes = null;
						}
					}

					if (i === naluOffset) {
						// record last start code length.
						lastStartCodeLength = start_code_length;
					}

					i += start_code_length || 1;
				} else {
					i++;
				}
			} while (i < data_byte.length);
		} else {
			let startPos = 0,
				size = 0,
				endPos = 0;
			do {
				size = 0;
				for (let k = 0; k < naluSizeLength; k++) {
					size = size | (data_byte[startPos + k] << ((naluSizeLength - k - 1) * 8));
				}
				// size = (data_byte[i] << 24) | (data_byte[i + 1] << 16) | (data_byte[i + 2] << 8) | data_byte[i + 3];
				startPos += naluSizeLength;
				endPos = startPos + size;
				if (endPos > data_byte.length) {
					endPos = data_byte.length;
				}

				let bytes = data_byte.subarray(startPos, endPos);
				let nalu = new NALUnit(bytes);
				// PES
				nalu.pts = pts;
				nalu.dts = dts;

				self.emit('nalu', nalu);
				startPos = endPos;
			} while (startPos < data_byte.length);
		}

		if (this.cachedBytes) {
			let nalu = new NALUnit(this.cachedBytes.subarray(this.cachedBytes.startCodeLength));

			nalu.pts = this.cachedBytes.pts;
			nalu.dts = this.cachedBytes.dts;

			this.emit('nalu', nalu);

			this.cachedBytes = null;
		}

		this.emit('done');
	}

	reset() {
		this.cachedBytes = null;
	}
}
