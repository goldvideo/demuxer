/**
 * @file: tag.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * tag structure.
 */
import DataViewReader from '../../util/dv';
import FlvTagTypes from '../../enum/flv-tag-types';

/**
 * @extends DataViewReader
 */
export default class FlvTag extends DataViewReader {
	tagType: number;
	dataSize: number;
	timestamp: number;
	timestampExtended: number;
	streamId: number;
	payload: Uint8Array;
	previousTagSize: number;
	totalSize: number;

	/**
	 * @param buffer
	 */
	constructor(buffer: Uint8Array) {
		super();

		this.tagType = buffer[0];

		this.dataSize = this.readUint32(buffer, 0) & 0x00ffffff;

		this.timestamp = this.readUint32(buffer, 4) & 0x00ffffff;

		this.timestampExtended = buffer[7];

		// this.streamId = this.readUint32(buffer, 8) & 0x00ffffff; // Always 0

		this.payload = buffer.subarray(11, 11 + this.dataSize);

		this.previousTagSize = this.readUint32(buffer, 11 + this.dataSize);

		this.totalSize = this.previousTagSize + 4;
	}

	valid(): boolean {
		let { tagType, dataSize, previousTagSize } = this;
		return (
			previousTagSize === 11 + dataSize &&
			(tagType === FlvTagTypes.SCRIPT_DATA || tagType === FlvTagTypes.VIDEO || tagType === FlvTagTypes.AUDIO)
		);
	}
}
