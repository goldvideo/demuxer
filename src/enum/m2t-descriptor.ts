/**
 * @file= m2t-descriptor.js, created at Monday, 23rd December 2019 3=47=23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * @overview Program and program element descriptors.
 * @see ISO/IEC 13818-1, Table 2-39 – Program and program element descriptors
 * @see DVB/SI, Table 12= Possible locations of descriptors
 */
const enum Descriptors {
	VIDEO_STREAM = 0x02,
	AUDIO_STREAM = 0x03,
	CA = 0x09,
	IOD = 0x1d,
	MPEG4_VIDEO = 0x1b,
	MPEG4_AUDIO = 0x1c,
	SERVICE = 0x48
}

export default Descriptors;
