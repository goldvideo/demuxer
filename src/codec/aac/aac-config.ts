/**
 * @file: aac-config.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * Audio Config Helper
 * Accord audioObjectType/samplingFrequencyIndex/channelCount, generate mimeType info.
 */
import platform from '../../util/platform';
import logger from '../../util/logger';

/*
    sampling freq,
    0: 96000 Hz
    1: 88200 Hz
    2: 64000 Hz
    3: 48000 Hz
    4: 44100 Hz
    5: 32000 Hz
    6: 24000 Hz
    7: 22050 Hz
    8: 16000 Hz
    9: 12000 Hz
    10: 11025 Hz
    11: 8000 Hz
    12: 7350 Hz
    13: Reserved
    14: Reserved
    15: frequency is written explictly
 */
const samplingRates = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];

export default (audioObjectType: number, samplingFrequencyIndex: number, channelCount: number) => {
	let adtsExtensionSamplingIndex;
	let realAudioObjectType = audioObjectType;
	let config;

	if (samplingFrequencyIndex > samplingRates.length - 1) {
		logger.error(`invalid sampling index:${samplingFrequencyIndex}`);
		return;
	}

	// firefox: freq less than 24kHz = AAC SBR (HE-AAC)
	if (platform.browser.FIREFOX) {
		if (samplingFrequencyIndex >= 6) {
			audioObjectType = 5;
			config = new Array(4);
			// HE-AAC uses SBR (Spectral Band Replication) , high frequencies are constructed from low frequencies
			// there is a factor 2 between frame sample rate and output sample rate
			// multiply frequency by 2 (see table below, equivalent to substract 3)
			adtsExtensionSamplingIndex = samplingFrequencyIndex - 3;
		} else {
			audioObjectType = 2;
			config = new Array(2);
			adtsExtensionSamplingIndex = samplingFrequencyIndex;
		}
		// Android : always use AAC
	} else if (platform.os.android) {
		audioObjectType = 2;
		config = new Array(2);
		adtsExtensionSamplingIndex = samplingFrequencyIndex;
	} else {
		/*  for other browsers (Chrome/Vivaldi/Opera ...)
				always force audio type to be HE-AAC SBR, as some browsers do not support audio codec switch properly (like Chrome ...)
			*/
		audioObjectType = 5;
		config = new Array(4);
		// if (manifest codec is HE-AAC or HE-AACv2) OR (manifest codec not specified AND frequency less than 24kHz)
		if (samplingFrequencyIndex >= 6) {
			// HE-AAC uses SBR (Spectral Band Replication) , high frequencies are constructed from low frequencies
			// there is a factor 2 between frame sample rate and output sample rate
			// multiply frequency by 2 (see table below, equivalent to substract 3)
			adtsExtensionSamplingIndex = samplingFrequencyIndex - 3;
		} else {
			// if (manifest codec is AAC) AND (frequency less than 24kHz AND nb channel is 1) OR (manifest codec not specified and mono audio)
			// Chrome fails to play back with low frequency AAC LC mono when initialized with HE-AAC.  This is not a problem with stereo.
			if (channelCount === 1) {
				audioObjectType = 2;
				config = new Array(2);
			}
			adtsExtensionSamplingIndex = samplingFrequencyIndex;
		}
	}
	/* 
        refer to http://wiki.multimedia.cx/index.php?title=MPEG-4_Audio#Audio_Specific_Config ISO 14496-3 (AAC).pdf 
            - Table 1.13 — Syntax of AudioSpecificConfig()
		  Audio Profile / Audio Object Type
		  0: Null
		  1: AAC Main
		  2: AAC LC (Low Complexity)
		  3: AAC SSR (Scalable Sample Rate)
		  4: AAC LTP (Long Term Prediction)
		  5: SBR (Spectral Band Replication)
		  6: AAC Scalable

		  Channel Configurations
		  These are the channel configurations:
		  0: Defined in AOT Specifc Config
		  1: 1 channel: front-center
		  2: 2 channels: front-left, front-right
		*/
	// audioObjectType = profile => profile, the MPEG-4 Audio Object Type minus 1
	config[0] = audioObjectType << 3;
	// samplingFrequencyIndex
	config[0] |= (samplingFrequencyIndex & 0x0e) >> 1;
	config[1] |= (samplingFrequencyIndex & 0x01) << 7;
	// channelConfiguration
	config[1] |= channelCount << 3;
	if (audioObjectType === 5) {
		// adtsExtensionSamplingIndex
		config[1] |= (adtsExtensionSamplingIndex & 0x0e) >> 1;
		config[2] = (adtsExtensionSamplingIndex & 0x01) << 7;
		// audioObjectType (force to 2, chrome is checking that object type is less than 5 ???
		//    https://chromium.googlesource.com/chromium/src.git/+/master/media/formats/mp4/aac.cc
		config[2] |= 2 << 2;
		config[3] = 0;
	}

	return {
		config: config,
		sampleRate: samplingRates[samplingFrequencyIndex],
		channelCount: channelCount,
		codec: 'mp4a.40.' + audioObjectType,
		realCodec: 'mp4a.40.' + realAudioObjectType
	};
};
