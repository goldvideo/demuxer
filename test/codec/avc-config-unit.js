/**
 * @file: avc-config-unit.js, created at Monday, 23rd December 2019 11:22:43 am
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/* eslint-env jasmine */
import getAVCConfig from '../../src/codec/avc/avc-config';

describe('avc-config', function() {
	it('should generate the correct avc codec', function() {
		const profile_idc = 0x64; // 100
		const profile_compatibility = 0;
		const level_idc = 0x28; // 40

		let config = getAVCConfig({
			profile_idc,
			profile_compatibility,
			level_idc
		});

		expect(config.codec).toBe('avc1.640028');
	});
});
