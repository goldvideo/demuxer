/**
 * @file: demuxer.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
import { Events } from './enum/events';
import { Context, GlobalOptions, IDemux, PushConf } from './types/globals';
import CacheBuffer from './util/cache-buffer';
import EventManager from './util/event-manager';
import { isArrayBuffer, isUint8Array } from './util/is';
import logger from './util/logger';
import Stream from './util/stream';

export default abstract class DemuxFacade extends Stream implements IDemux {
	readonly endStream?: Stream;
	protected eventManager_: EventManager;
	protected ctx_: Context;
	protected options_: GlobalOptions;
	protected cache_buffer_: CacheBuffer;

	protected listenEndStream_(): void {
		this.eventManager_ = new EventManager();

		this.eventManager_
			.on(this.endStream, 'data', (data) => {
				this.emit(Events.DEMUX_DATA, data);
			})
			.on(this.endStream, 'done', (data) => {
				this.emit(Events.DONE, data);
			});
	}

	constructor(options: GlobalOptions = {}) {
		super();

		if (options.debug) {
			logger.enable = true;
		}

		this.ctx_ = new Context();
		this.options_ = options;
		this.cache_buffer_ = new CacheBuffer();
	}

	/**
	 * Pipe the arrayBuffer to the demuxer.
	 * @param buf
	 * @param conf
	 */
	abstract push(buf: ArrayBuffer | Uint8Array, conf: PushConf): void;

	/**
	 * transfer data to Uint8Array
	 * @param buf
	 */
	protected constraintPushData_(buf: ArrayBuffer | Uint8Array): Uint8Array | null {
		let newBuf = null;
		if (!isArrayBuffer(buf) && !isUint8Array(buf)) {
			return newBuf;
		}

		if (isArrayBuffer(buf)) {
			newBuf = new Uint8Array(buf);
		}

		return newBuf;
	}

	reset(): void {}

	destroy(): void {
		this.unpipe();
		this.endStream.unpipe();

		this.eventManager_.removeAll();
	}
}
