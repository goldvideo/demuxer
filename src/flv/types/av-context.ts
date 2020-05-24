/**
 * @file: created at Saturday, 9th May 2020 4:38:35 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

import { AudioSpecificConfig } from '../../codec/aac/aac';
import { AVCDecoderConfigurationRecord } from '../../codec/avc';
import Stream from '../../util/stream';
import { FLVParseStage } from '../flv-const';

export enum AudioSoundFormat {
	AAC = 10
}

export enum AudioSoundType {
	MONO = 0,
	STEREO = 1 // For AAC: always 1
}

export default class AVContext extends Stream {
	stage: FLVParseStage;
	pos: number = 0; // parse byte position relative to flv first byte;

	version: number;
	hasAudio: boolean;
	hasVideo: boolean;

	keyframeTimes: number[];
	keyframeFilePositions: number[];

	decoderConfigurationRecord: AVCDecoderConfigurationRecord;
	audioSpecificConfig: AudioSpecificConfig;
}
