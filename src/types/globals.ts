import EventEmitter from '../util/event-emitter';

export class Context extends EventEmitter {}

export interface PushConf {
	done?: boolean;
	stubTime?: number;
}

export interface GlobalOptions {
	debug?: boolean;
	complex?: boolean;
	config?: PushConf;
}

export interface IDemux {
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
