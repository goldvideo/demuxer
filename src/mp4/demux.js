/**
 * @file: demux.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

import stream from '../util/stream';
import logger from '../util/logger';
import mp4 from './mp4-inspector';

/**
 * mp4.
 */
class Demux extends stream {
	constructor() {
		super();
	}

	/**
	 * This is end pipeline stream
	 */
	get endStream() {
		return this;
	}

	/**
	 * @param {Uint8Array} buffer
	 */
	push(buffer) {
		logger.log(`mp4 demux received ${buffer.byteLength} bytes`);

		this.emit('data', mp4.mp4toJSON(buffer));
	}
}

export default Demux;
