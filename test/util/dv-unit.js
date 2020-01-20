/**
 * @file: dv-unit.js, created at Monday, 23rd December 2019 9:52:25 am
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
/* eslint-env jasmine */

import DataViewReader from '../../src/util/dv';

describe('DataViewReader', () => {
	// |data| as interpreted as a 64 bit integer must not be larger than 2^53-1.
	// decimal digits.
	const data = new Uint8Array([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07]);

	// |data2| is small enough in little-endian to be read as a 64-bit number,
	// and has the sign bit set on the first 6 bytes to prove that we don't
	// return negative values.
	const data2 = new Uint8Array([0xde, 0xad, 0xbe, 0xef, 0xff, 0xff, 0x01, 0x00]);

	let reader = new DataViewReader();

	beforeEach(() => {});

	it('reads a uint8', () => {
		const value1 = reader.readUint8(data, 0);

		expect(value1).toBe(0x00);

		const value2 = reader.readUint8(data, 1);
		expect(value2).toBe(0x01);

		const value3 = reader.readUint8(data2, 0);
		expect(value3).toBe(0xde);

		const value4 = reader.readUint8(data2, 1);
		expect(value4).toBe(0xad);
	});

	it('reads a uint16 in big endian', () => {
		const value1 = reader.readUint16(data, 0, false);
		expect(value1).toBe(0x0001);

		const value2 = reader.readUint16(data, 2, false);
		expect(value2).toBe(0x0203);

		const value3 = reader.readUint16(data2, 0, false);
		expect(value3).toBe(0xdead);

		const value4 = reader.readUint16(data2, 2, false);
		expect(value4).toBe(0xbeef);
	});

	it('reads a uint16 in little endian', () => {
		const value1 = reader.readUint16(data, 0, true);
		expect(value1).toBe(0x0100);

		const value2 = reader.readUint16(data, 2, true);
		expect(value2).toBe(0x0302);

		const value3 = reader.readUint16(data2, 0, true);
		expect(value3).toBe(0xadde);

		const value4 = reader.readUint16(data2, 2, true);
		expect(value4).toBe(0xefbe);
	});

	it('reads a uint32 in big endian', () => {
		const value1 = reader.readUint32(data, 0, false);
		expect(value1).toBe(0x00010203);

		const value2 = reader.readUint32(data, 4, false);
		expect(value2).toBe(0x04050607);

		const value3 = reader.readUint32(data2, 0, false);
		expect(value3).toBe(0xdeadbeef);

		const value4 = reader.readUint32(data2, 4, false);
		expect(value4).toBe(0xffff0100);
	});

	it('reads a uint32 in little endian', () => {
		const value1 = reader.readUint32(data, 0, true);
		expect(value1).toBe(0x03020100);

		const value2 = reader.readUint32(data, 4, true);
		expect(value2).toBe(0x07060504);

		const value3 = reader.readUint32(data2, 0, true);
		expect(value3).toBe(0xefbeadde);

		const value4 = reader.readUint32(data2, 4, true);
		expect(value4).toBe(0x0001ffff);
	});
});
