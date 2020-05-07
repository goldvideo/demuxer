/**
 * @file: dv.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * Bit buffer reader like DataView.
 */

function read(buf: ArrayBuffer | Uint8Array): DataView {
	let byteOffset = 0;

	if (ArrayBuffer.isView(buf)) {
		byteOffset = buf.byteOffset;
		buf = buf.buffer;
	}

	return new DataView(buf, byteOffset);
}

class DataViewReader {
	constructor() {}

	/**
	 * Gets an unsigned 8-bit integer (unsigned byte).
	 * @param buffer
	 * @param byteOffset    The offset, in byte, from the start of the view where to read the data.
	 * @returns {number}    An unsigned 8-bit integer number.
	 */
	readUint8(buffer: ArrayBuffer | Uint8Array, byteOffset: number): number {
		return read(buffer).getUint8(byteOffset);
	}

	/**
	 * Gets an unsigned 16-bit integer (unsigned long).
	 * @param buffer
	 * @param byteOffset     The offset, in byte, from the start of the view where to read the data.
	 * @param littleEndian   Indicates whether the 16-bit int is stored in little- or big-endian format.
	 * @returns {number}     An unsigned 16-bit integer number.
	 */
	readUint16(buffer: ArrayBuffer | Uint8Array, byteOffset, littleEndian: boolean = false): number {
		return read(buffer).getUint16(byteOffset, littleEndian);
	}

	/**
	 * Gets an unsigned 32-bit integer (unsigned long).
	 * @param buffer
	 * @param byteOffset        The offset, in byte, from the start of the view where to read the data.
	 * @param littleEndian      Indicates whether the 32-bit int is stored in little- or big-endian format.
	 * @returns {number}        An unsigned 32-bit integer number.
	 */
	readUint32(buffer: ArrayBuffer | Uint8Array, byteOffset: number, littleEndian: boolean = false): number {
		return read(buffer).getUint32(byteOffset, littleEndian);
	}
}

export default DataViewReader;
