/**
 * @file: created at Sunday, 24th May 2020 8:29:10 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

import FlvTagTypes from '../../enum/flv-tag-types';
import { Context, GlobalOptions } from '../../types/globals';
import AACAudioData from '../structs/flv-tag-aac-audio-data';
import FlvTagAudioData from '../structs/flv-tag-audio-data';
import FlvTagVideoData from '../structs/flv-tag-video-data';
import AVContext from './av-context';

export * from '../../types/pipeline';

interface VideoData extends FlvTagVideoData {}

interface AudioData extends FlvTagAudioData {}

export type TagEmitData = {
	type: string;
	tagType: FlvTagTypes;
	timestamp: number;
} & Partial<VideoData | AudioData>;

export interface PipelineContext {
	ctx: Context;
	options: GlobalOptions;
	flv: AVContext;
}

export type AACPipelineData = Pick<AACAudioData, 'dts' | 'pts' | 'aacPacketType' | 'payload' | 'audioSpecificConfig'>;
