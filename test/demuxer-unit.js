/**
 * @file: demuxer-unit.js, created at Thursday, 26th September 2019 3:55:44 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
/* eslint-env jasmine */

import Demuxer from '../src/demuxer';

describe('Demuxer Entry', () => {
	/** @type {Demuxer} */
	let dei;

	beforeEach(() => {
		dei = new Demuxer('m2ts');
	});

	// afterEach(async () => {});

	// afterAll(() => {});

	describe('push', () => {
		it('should return null if push is not arraybuffer or uint8array', async () => {
			expect(dei.push('test')).toBeNull();
			expect(dei.push(undefined)).toBeNull();
			expect(dei.push(null)).toBeNull();
			expect(dei.push([])).toBeNull();
			// expect(dei.push(new Uint8Array([0]))).toBeNull();
		});
	});
});
