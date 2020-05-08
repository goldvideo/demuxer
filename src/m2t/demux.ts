/**
 * @file: demux.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * MPEG-2 transport stream demuxer.
 */
import DemuxFacade from '../demux-facade';
import muxErrorCode from '../mux-error-code';
import { GlobalOptions, PushConf } from '../types/globals';
import CacheBuffer from '../util/cache-buffer';
import logger from '../util/logger';
import PSI from './psi';
import M2TSComplexStream from './streams/complex';
import ElementaryStream from './streams/elementary';
import PesStream from './streams/pes';
import Packet from './structs/packet';

const CHUNK_BYTE_LENGTH = 188; // Transport Stream chunks shall be 188 bytes long.

type InterfaceStream = M2TSComplexStream | ElementaryStream;

export class TSDemux extends DemuxFacade {
	private cache_buffer_: CacheBuffer;
	private psi_: PSI;
	private pesStream_: PesStream;
	private elementaryStream_: ElementaryStream;
	private complexStream_: M2TSComplexStream;

	constructor(options: GlobalOptions = {}) {
		super(options);

		this.cache_buffer_ = new CacheBuffer();
		this.psi_ = new PSI(this.context_);
		this.pesStream_ = new PesStream(this.context_, this.psi_);
		this.elementaryStream_ = new ElementaryStream(this.context_, this.psi_, options);
		this.complexStream_ = new M2TSComplexStream(this.context_, this.psi_);

		// concat stream.
		this.pipe(this.pesStream_);
		this.pesStream_.pipe(this.elementaryStream_);
		this.elementaryStream_.pipe(this.complexStream_);

		super.listenEndStream_();
	}

	/**
	 * This is end pipeline stream
	 */
	get endStream(): InterfaceStream {
		let stream: InterfaceStream = this.elementaryStream_;

		if (this.options_.complex) {
			stream = this.complexStream_;
		}

		return stream;
	}

	/**
	 * TS push support streaming incomplete data push.
	 * @param buffer
	 * @param conf
	 * @param conf.done - If you need the done event, this boolean needs to be set
	 */
	push(buffer: ArrayBuffer | Uint8Array, conf: PushConf) {
		let newBuf: Uint8Array = super.constraintPushData_(buffer);

		const { done } = conf;
		let cacheByteLength = this.cache_buffer_.byteLength;
		let byteOffset = null;

		this.options_.config = conf;

		logger.log(
			`hls demux received ${newBuf.byteLength} bytes, cache ${cacheByteLength} bytes. ${done ? 'chunk done' : ''}`
		);

		this.cache_buffer_.append(newBuf);

		while (this.cache_buffer_.byteLength >= CHUNK_BYTE_LENGTH) {
			let chunk = this.cache_buffer_.cut(CHUNK_BYTE_LENGTH);

			// The pushed buffer may be so small that can't cut a ts chunk.
			if (chunk) {
				let packet = new Packet(chunk);

				if (packet.valid()) {
					this.psi_.parse(packet);

					this.emit('data', packet);
				} else {
					let errMsg = `Encounter invalid ts packet, packet_length(${chunk.length}), cache_length(${this.cache_buffer_.byteLength}), has_payload(${packet.has_payload}), data(${chunk})`;

					logger.error(errMsg);

					this.reset();

					this.context_.emit('error', muxErrorCode.TS_SYNC_BYTE, errMsg, {
						startByte: byteOffset,
						endByte: byteOffset + chunk.byteLength
					});
					break;
				}

				byteOffset += chunk.byteLength;
			}
		}

		if (this.cache_buffer_.empty && done) {
			// logger.log('mux packet done!');
			this.emit('done');
		}
	}

	reset() {
		this.cache_buffer_.clear();

		this.emit('reset');
	}
}
