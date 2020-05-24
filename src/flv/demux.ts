/**
 * flv demuxer.
 */
import DemuxFacade from '../demux-facade';
import muxErrorCode from '../mux-error-code';
import { GlobalOptions, PushConf } from '../types/globals';
import { isNumber } from '../util/is';
import logger from '../util/logger';
import { FLVParseStage, HEAD_LEN, MIN_BODY_LEN } from './flv-const';
import BodyStream from './streams/body';
import TagsStream from './streams/tag';
import FlvHead from './structs/flv-head';
import AVContext from './types/av-context';

/**
 * flv
 */
export class FLVDemux extends DemuxFacade {
	// private complex_: FlvComplex;
	private flv_: AVContext;
	private tags_: TagsStream;
	private body_: BodyStream;

	constructor(options: GlobalOptions = {}) {
		super(options);

		this.flv_ = new AVContext();
		this.flv_.stage = FLVParseStage.HEAD;

		// this. = 0;

		this.body_ = new BodyStream(this.ctx_, this.flv_, options);
		this.tags_ = new TagsStream(this.ctx_, this.flv_, options);

		// Compose pipeline
		this.pipe(this.body_);
		this.body_.pipe(this.tags_);

		super.listenEndStream_();
	}

	get endStream() {
		return this.flv_;
	}

	/**
	 * @param buffer
	 * @param conf
	 * @param conf.offsetByte
	 */
	push(buffer: ArrayBuffer | Uint8Array, conf: PushConf = {}) {
		const { options_, ctx_, flv_, cache_buffer_ } = this;
		const data: Uint8Array = super.constraintPushData_(buffer);
		let cacheByteLength = this.cache_buffer_.byteLength;

		logger.log(`flv demux received ${data.byteLength} bytes, cache ${cacheByteLength} bytes.`);

		options_.config = conf;
		if (isNumber(conf.offsetPos)) {
			if (cacheByteLength === 0) {
				if (flv_.pos !== conf.offsetPos) {
					ctx_.emit('error', muxErrorCode.FLV_NOT_EXPECTED_ADJACENT_DATA);
				}

				flv_.pos = conf.offsetPos;
			}
		}

		cache_buffer_.append(data);

		// if file byteOffset is provided, then specify the stage of parser.
		if (flv_.pos < HEAD_LEN) {
			flv_.stage === FLVParseStage.HEAD;
		} else {
			flv_.stage === FLVParseStage.BODY;
		}

		while (true) {
			if (flv_.stage === FLVParseStage.HEAD) {
				if (cache_buffer_.byteLength >= HEAD_LEN) {
					// has enough header
					let chunk = cache_buffer_.cut(HEAD_LEN);

					let head = new FlvHead(chunk);

					if (head.valid()) {
						flv_.emit('data', {
							type: 'head',
							signature: head.signature,
							version: head.version,
							hasAudio: head.hasAudio,
							hasVideo: head.hasVideo,
							offset: head.offset
						});

						// Change parse state -> body
						flv_.stage = FLVParseStage.BODY;
						flv_.pos = HEAD_LEN;
					} else {
						ctx_.emit('error', muxErrorCode.FLV_HEAD_SIGNATURE);
						break;
					}
				} else {
					break;
				}
			} else if (flv_.stage === FLVParseStage.BODY) {
				// At least has 4 body byte to parse
				if (cache_buffer_.byteLength >= MIN_BODY_LEN) {
					let cbLen = cache_buffer_.byteLength;
					let nextBytes = cache_buffer_.bytes;

					cache_buffer_.clear();

					if (nextBytes) {
						this.emit('data', nextBytes);
					}

					flv_.pos += cbLen;
				}

				break;
			}
		}
	}
}
