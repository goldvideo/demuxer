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
