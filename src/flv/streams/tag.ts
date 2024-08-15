/**
 * @file: created at Saturday, 9th May 2020 3:49:22 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * FLV Tags Stream.
 */
import FlvTagTypes from '../../enum/flv-tag-types';
import { Context, GlobalOptions } from '../../types/globals';
import logger from '../../util/logger';
import Stream from '../../util/stream';
import { AMFdeSerialize } from '../structs/flv-amf';
import FlvTag from '../structs/flv-tag';
import AACAudioData from '../structs/flv-tag-aac-audio-data';
import FlvTagAudioData from '../structs/flv-tag-audio-data';
import FlvTagVideoData from '../structs/flv-tag-video-data';
import AVContext from '../types/av-context';
import { PipelineContext, TagEmitData } from '../types/flv-pipeline';

class TagsStream extends Stream {
    private flv_: AVContext;
    private options_: GlobalOptions;
    private pipeCtx: PipelineContext;

    constructor(ctx: Context, flv: AVContext, options: GlobalOptions = {}) {
        super();

        this.flv_ = flv;
        this.options_ = options;

        this.pipeCtx = {
            ctx,
            flv,
            options
        };
    }

    push(tag: FlvTag) {
        switch (tag.tagType) {
            case FlvTagTypes.SCRIPT_DATA:
                this.parseScriptData_(tag.payload);
                break;
            case FlvTagTypes.VIDEO:
                this.parseVideoData_(tag);
                break;
            case FlvTagTypes.AUDIO:
                this.parseAudioData_(tag);
                break;
            default:
                logger.error(`still not supported flv tag type ${tag.tagType}`);
        }
    }

    flush() {
        const self = this;

        self.emit('done');
    }

    reset() {
        this.emit('reset');
    }

    private parseScriptData_(buffer: Uint8Array) {
        const { flv_ } = this;
        let result = AMFdeSerialize(buffer);

        flv_.emit('data', {
            type: 'tag',
            tagType: FlvTagTypes.SCRIPT_DATA,
            ...result
        });
    }

    private parseVideoData_(tag: FlvTag) {
        const { flv_ } = this;
        const data = new FlvTagVideoData(this.pipeCtx, tag.payload, tag.timestamp);

        let ret: TagEmitData = {
            type: 'tag',
            tagType: FlvTagTypes.VIDEO,
            timestamp: tag.timestamp,
            ...data
        };

        flv_.emit('data', ret);
    }

    private parseAudioData_(tag: FlvTag) {
        const { /*options_,*/ flv_ } = this;

        const data = new FlvTagAudioData(tag.payload, tag.timestamp);
        const { /*sampleSize,*/ soundData } = data;

        if ((soundData as AACAudioData)?.audioSpecificConfig) {
            flv_.audioSpecificConfig = (soundData as AACAudioData).audioSpecificConfig;
        } else {
            // let stubTime = options_.config.stubTime;
            // if (isNumber(stubTime)) {
            // 	let start = soundData.pts;
            // 	let duration =
            // 		soundData.pts +
            // 		soundData.payload.byteLength / (sampleSize / 8) / flv_.audioSpecificConfig.sampleCount;
            // 	let end = start + duration;
            // 	if (end < stubTime) {
            // 		logger.warn(`drop aac tag, start/end/stubTime(${start}/${end}/${stubTime})`);
            // 		return;
            // 	}
            // }
        }

        let ret: TagEmitData = {
            type: 'tag',
            tagType: FlvTagTypes.AUDIO,
            timestamp: tag.timestamp,
            ...data
        };

        flv_.emit('data', ret);
    }
}

export default TagsStream;
