/**
 * @file: demuxer.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
import { PushConf } from './types/globals';

export default interface IDemux {
	// /**
	//  * Mux Constructor
	//  * @param {String} from - the source to demux
	//  * @param {Object} [options] - mux configure
	//  */
	// constructor(from: String, options: GlobalOptions) {
	// 	super();

	// 	if (options.debug) {
	// 		logger.enable = true;
	// 	}
	// 	/**
	// 	 * @type {Demux}
	// 	 * @private
	// 	 */
	// 	this._demuxer = new muxers[from](this, options);
	// }

	/**
	 * Pipe the arrayBuffer to the demuxer.
	 * @param buf
	 * @param conf
	 */
	push(buf: ArrayBuffer | Uint8Array, conf: PushConf): void;

	reset(): void;

	destroy(): void;
}
