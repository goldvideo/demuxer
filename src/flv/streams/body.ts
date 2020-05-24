/**
 * @file: elementary.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

import muxErrorCode from '../../mux-error-code';
import { Context, GlobalOptions } from '../../types/globals';
import CacheBuffer from '../../util/cache-buffer';
import logger from '../../util/logger';
import Stream from '../../util/stream';
import { HEAD_LEN, MIN_TAG_LEN, PREVIOUS_TAG_SIZE } from '../flv-const';
import FlvTag from '../structs/flv-tag';
import AVContext from '../types/av-context';

class BodyStream extends Stream {
	private ctx_: Context;
	private flv_: AVContext;
	private options_: GlobalOptions;
	private cache_buffer_: CacheBuffer;

	constructor(ctx: Context, flvCtx: AVContext, options: GlobalOptions = {}) {
		super();

		this.ctx_ = ctx;
		this.flv_ = flvCtx;
		this.options_ = options;
		this.cache_buffer_ = new CacheBuffer();
	}

	/**
	 * Push a body buffer
	 */
	push(bodyBuffer: Uint8Array): void {
		const { ctx_, flv_, cache_buffer_ } = this;
		let buffer: Uint8Array | null;

		cache_buffer_.append(bodyBuffer);

		if (flv_.pos === HEAD_LEN) {
			if (cache_buffer_.byteLength > PREVIOUS_TAG_SIZE + MIN_TAG_LEN) {
				// drop PreviousTagSize0
				cache_buffer_.cut(PREVIOUS_TAG_SIZE);

				flv_.pos += PREVIOUS_TAG_SIZE;
			}
		}

		while (cache_buffer_.byteLength > 0) {
			// buffer start with tag
			buffer = cache_buffer_.bytes;

			if (buffer.length >= MIN_TAG_LEN) {
				let tagHeadSize = 11; // 10 is tag header
				let tagPayloadSize = (buffer[1] << 16) + (buffer[2] << 8) + buffer[3];
				let previousTagSize = 4;
				let tagSize = tagHeadSize + tagPayloadSize + previousTagSize;

				if (buffer.length >= tagSize) {
					let tagBuffer = cache_buffer_.cut(tagSize);
					let tag = new FlvTag(tagBuffer);

					if (tag.valid()) {
						this.emit('data', tag);
						flv_.pos += tag.totalSize;
					} else {
						let errMsg = `Encounter invalid flv tag, tag_length(${tag.previousTagSize}), cache_length(${cache_buffer_.byteLength}), data(${tagBuffer})`;

						logger.error(errMsg);

						this.reset();

						ctx_.emit('error', muxErrorCode.TS_SYNC_BYTE, errMsg);
					}
				} else {
					break;
				}
			} else {
				break;
			}
		}
	}

	reset(): void {
		const { cache_buffer_ } = this;

		cache_buffer_.clear();
		this.emit('reset');
	}
}

export default BodyStream;
