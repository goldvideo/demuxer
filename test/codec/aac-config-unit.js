/**
 * @file: aac-config-unit.js, created at Monday, 23rd December 2019 11:06:25 am
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/* eslint-env jasmine */
import getAACConfig from '../../src/codec/aac/aac-config';

describe('aac-config', function() {
	it('should has the correct sampleRate with samplingRates index', function() {
		const audioObjectType = 5;
		const samplingFrequencyIndex = 0;
		const channelCount = 2;

		let config = getAACConfig(audioObjectType, samplingFrequencyIndex, channelCount);

		expect(config.sampleRate).toBe(96000);
	});
});
