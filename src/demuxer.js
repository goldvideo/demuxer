/**
 * @file: demuxer.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

import logger from './util/logger';
import Stream from './util/stream';
import EventManager from './util/event-manager';
import {isArrayBuffer, isUint8Array} from './util/is';
import Events from './enum/events';
import m2tDemux from './m2t/demux';
import mp4Demux from './mp4/demux';

const muxers = {
	m2ts: m2tDemux,
	mp4: mp4Demux
};

class Demuxer extends Stream {
	/**
	 * Mux Constructor
	 * @param {String} from - the source to demux
	 * @param {Object} [options] - mux configure
	 */
	constructor(from, options = {}) {
		super();

		if (options.debug) {
			logger.enable = true;
		}
		/**
		 * @type {Demux}
		 * @private
		 */
		this._demuxer = new muxers[from](this, options);

		/**
		 * @type {EventManager}
		 * @private
		 */
		this._eventManager = new EventManager();

		this._eventManager
			.on(this._demuxer.endStream, 'data', (data) => {
				this.emit(Events.DEMUX_DATA, data);
			})
			.on(this._demuxer.endStream, 'done', (data) => {
				this.emit(Events.DONE, data);
			});
	}

	/**
	 * Pipe the arrayBuffer to the demuxer.
	 * @param {(ArrayBuffer|Uint8Array)} buf
	 * @param {Object} conf
	 */
	push(buf, conf = {}) {
		if (!isArrayBuffer(buf) && !isUint8Array(buf)) {
			return null;
		}

		if (isArrayBuffer(buf)) {
			buf = new Uint8Array(buf);
		}

		this._demuxer.push(buf, conf);
	}

	reset() {
		this._demuxer.reset();
	}

	destroy() {
		this._demuxer.unpipe();
		this._demuxer.endStream.unpipe();

		this._eventManager.removeAll();
	}
}

Demuxer.Events = Events;

export default Demuxer;
