/**
 * @file: demux.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * MPEG-2 transport stream demuxer.
 */
import stream from '../util/stream';
import M2TSComplexStream from './streams/complex';
import logger from '../util/logger';
import CacheBuffer from '../util/cache-buffer';
import ElementaryStream from './streams/elementary';
import PesStream from './streams/pes';
import PSI from './psi';
import Packet from './structs/packet';
import muxErrorCode from '../mux-error-code';

const CHUNK_BYTE_LENGTH = 188; // Transport Stream chunks shall be 188 bytes long.

class Demux extends stream {
	constructor(ctx, options = {}) {
		super();

		/**
		 * @type {MuxInline}
		 * @private
		 */
		this.context = ctx;

		/**
		 * @type {Object}
		 * @private
		 */
		this.options = options;

		/**
		 * @type {CacheBuffer}
		 * @private
		 */
		this.cache_buffer = new CacheBuffer();

		/**
		 * @type {PSI}
		 * @private
		 */
		this.psi = new PSI(ctx);

		/**
		 * @type {PesStream}
		 * @private
		 */
		this.pesStream = new PesStream(ctx, this.psi);

		/**
		 * @type {ElementaryStream}
		 * @private
		 */
		this.elementaryStream = new ElementaryStream(ctx, this.psi, options);

		/**
		 * @type {M2TSComplexStream}
		 * @private
		 */
		this.complexStream = new M2TSComplexStream(ctx, this.psi);

		// concat stream.
		this.pipe(this.pesStream);
		this.pesStream.pipe(this.elementaryStream);
		this.elementaryStream.pipe(this.complexStream);
	}

	/**
	 * This is end pipeline stream
	 */
	get endStream() {
		let stream = this.elementaryStream;

		if (this.options.complex) {
			stream = this.complexStream;
		}

		return stream;
	}

	/**
	 * TS push support streaming incomplete data push.
	 * @param {Uint8Array} buffer
	 * @param {Object} conf
	 * @param {boolean} conf.done - If you need the done event, this boolean needs to be set
	 */
	push(buffer, conf = {}) {
		const {done} = conf;
		let cacheByteLength = this.cache_buffer.byteLength;
		let byteOffset = null;

		this.options.config = conf;

		logger.log(
			`hls demux received ${buffer.byteLength} bytes, cache ${cacheByteLength} bytes. ${done ? 'chunk done' : ''}`
		);

		this.cache_buffer.append(buffer);

		while (this.cache_buffer.byteLength >= CHUNK_BYTE_LENGTH) {
			let chunk = this.cache_buffer.cut(CHUNK_BYTE_LENGTH);

			// The pushed buffer may be so small that can't cut a ts chunk.
			if (chunk) {
				let packet = new Packet(chunk);

				if (packet.valid()) {
					this.psi.parse(packet);

					this.emit('data', packet);
				} else {
					let errMsg = `Encounter invalid ts packet, packet_length(${chunk.length}), cache_length(${this.cache_buffer.byteLength}), has_payload(${packet.has_payload}), data(${chunk})`;

					logger.error(errMsg);

					this.reset();

					this.context.emit('error', muxErrorCode.TS_SYNC_BYTE, errMsg, {
						startByte: byteOffset,
						endByte: byteOffset + chunk.byteLength
					});
					break;
				}

				byteOffset += chunk.byteLength;
			}
		}

		if (this.cache_buffer.empty && done) {
			// logger.log('mux packet done!');
			this.emit('done');
		}
	}

	reset() {
		this.cache_buffer.clear();

		this.emit('reset');
	}
}

export default Demux;
