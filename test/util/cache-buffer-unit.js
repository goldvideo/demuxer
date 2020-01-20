/**
 * @file: cache-buffer-unit.js, created at Monday, 23rd December 2019 11:44:50 am
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
/* eslint-env jasmine */

import CacheBuffer from '../../src/util/cache-buffer';

describe('CacheBuffer', () => {
	let cacheBuffer;

	beforeEach(() => {
		cacheBuffer = new CacheBuffer();
		cacheBuffer.append(new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05]));
	});

	describe('clear', () => {
		it('should be empty after run clear', () => {
			cacheBuffer.append(new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05]));

			cacheBuffer.clear();

			expect(cacheBuffer.empty).toBe(true);
		});
	});

	describe('cut', () => {
		it('should return cut part if needCutResult is set true', () => {
			let chunk = cacheBuffer.cut(2);

			expect(chunk.length).toBe(2);
			expect(chunk[0]).toBe(0x01);
			expect(chunk[1]).toBe(0x02);
		});

		it('should return null if needCutResult is set false', () => {
			let chunk = cacheBuffer.cut(2, false);

			expect(chunk).toBe(null);
		});
	});
});
