/**
 * @file: exp-golumb.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * exp golumb algorithm.
 * codeNum = 2leadingZeroBits – 1 + read_bits( leadingZeroBits )
 * @see https://en.wikipedia.org/wiki/Exponential-Golomb_coding
 */

/**
 * read n bit.
 * @param buffer
 * @param bitOffset
 * @param length
 * @private
 */
export function readBit(buffer: Uint8Array, bitOffset: number = 0, length: number = 1): number {
	let startByte = 0;
	let startByteBitPos = 0;
	let val = 0;
	let bitStr = '',
		bitVal = 0;

	for (let j = bitOffset; j < bitOffset + length; j++) {
		startByte = Math.floor(j / 8);
		startByteBitPos = 7 - (j % 8);
		bitVal = (buffer[startByte] >> startByteBitPos) & 0x01;

		bitStr += bitVal;
	}

	val = parseInt(bitStr, 2);

	return val;
}

/**
 * read 1 byte.
 * @param buffer
 * @param bitOffset
 */
export function readByte(buffer: Uint8Array, bitOffset: number = 0) {
	return readBit(buffer, bitOffset, 8);
}

/**
 * Unsigned Integer Exp-Golomb Coded.
 * @param buffer
 * @param bitOffset
 */
export function readUEV(buffer: Uint8Array, bitOffset: number = 0) {
	let leadingZeros = [];
	let bitLength = buffer.byteLength * 8;
	let readBit1 = false;
	let startByte = 0;
	let startByteBitPos = 0;
	let bitVal = 0;
	let value = '';

	// 1. 计算 leadingZeros
	for (let i = bitOffset; i < bitLength; i++) {
		startByte = Math.floor(i / 8);
		startByteBitPos = 7 - (i % 8);

		bitVal = (buffer[startByte] >> startByteBitPos) & 0x01;

		if (!readBit1) {
			if (bitVal === 0) {
				leadingZeros.push(0);
			} else {
				readBit1 = true;
				bitOffset = i;
				break;
			}
		}
	}

	let codeNumLength = leadingZeros.length + 1;

	// 2. 计算有效位数值
	for (let j = bitOffset; j < bitOffset + codeNumLength; j++) {
		startByte = Math.floor(j / 8);
		startByteBitPos = 7 - (j % 8);
		bitVal = (buffer[startByte] >> startByteBitPos) & 0x01;

		value += bitVal;
	}

	return {
		bitLength: leadingZeros.length + codeNumLength,
		value: parseInt(value, 2) - 1
	};
}

/**
 * Signed Integer Exp-Golomb Coded.
 * @param buffer
 * @param bitOffset
 */
export function readSEV(buffer: Uint8Array, bitOffset: number = 0) {
	let uev = readUEV(buffer, bitOffset);
	let codeNum = uev.value;

	let signedValue = Math.pow(-1, codeNum + 1) * Math.ceil(codeNum / 2);

	return {
		bitLength: uev.bitLength,
		value: signedValue
	};
}

export default {
	readUEV,
	readSEV,
	readBit,
	readByte
};
