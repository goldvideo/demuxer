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
	/**
	 * Pipe the arrayBuffer to the demuxer.
	 * @param buf
	 * @param conf
	 */
	push(buf: ArrayBuffer | Uint8Array, conf: PushConf): void;

	reset(): void;

	destroy(): void;
}
