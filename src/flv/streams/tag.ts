/**
 * @file: created at Saturday, 9th May 2020 3:49:22 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * FLV Tags Stream.
 */
import { Context } from '../../types/globals';
import Stream from '../../util/stream';
import AVContext from '../types/av-context';
import ADTSStream from './adts';
import AVCStream from './avc';
import FlvTagTypes from 'src/enum/flv-tag-types';
import logger from 'src/util/logger';
import FlvTag from '../structs/flv-tag';
import { AMFdeSerialize } from '../structs/flv-amf';
// import { PESStreamEmitData, GOPVector } from '../types/pipeline';

class TagsStream extends Stream {
	private ctx_: Context;
	private flv_: AVContext;

	// private tracks: Array<GOPVector>;
	private adtsStream: ADTSStream;
	private avcStream: AVCStream;
	private streams: [ADTSStream, AVCStream];

	constructor(ctx: Context, flv: AVContext) {
		super();

		this.ctx_ = ctx;
		this.flv_ = flv;
	}

	push(tag: FlvTag) {
		switch (tag.tagType) {
			case FlvTagTypes.SCRIPT_DATA:
				this.parseScriptData_(tag.payload);
				break;
			case FlvTagTypes.VIDEO:
				break;
			case FlvTagTypes.AUDIO:
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
}

export default TagsStream;
