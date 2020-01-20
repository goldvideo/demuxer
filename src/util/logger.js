/**
 * @file: logger.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * utils - logger
 */
/* global WorkerGlobalScope */
import global from './global';
import EventEmitter from './event-emitter';

let console = global.console;
const isWorker =
	typeof WorkerGlobalScope !== 'undefined' &&
	self instanceof WorkerGlobalScope &&
	typeof importScripts != 'undefined';
const prefix = '>>>';

class Logger extends EventEmitter {
	get enable() {
		return this._enable;
	}

	set enable(value) {
		this._enable = value;

		this.MSG_NAME = '__log__';
	}

	constructor() {
		super();
		this._enable = false;
	}

	log() {
		if (isWorker) {
			logger.emit(this.MSG_NAME, 'log', [...arguments].join(''));
		} else {
			if (this._enable) {
				console.log.call(console, prefix, ...arguments);
			}
		}
	}

	debug() {
		if (isWorker) {
			logger.emit(this.MSG_NAME, 'debug', [...arguments].join(''));
		} else {
			if (this._enable && console.debug) {
				console.debug.call(console, prefix, ...arguments);
			}
		}
	}

	assert() {
		if (this._enable && console.assert) {
			let condition = arguments[0];
			let sliceArgs = Array.prototype.slice.call(arguments, 1);
			sliceArgs.unshift(prefix);

			console.assert.call(console, condition, ...sliceArgs);
		}
	}

	warn() {
		if (isWorker) {
			logger.emit(this.MSG_NAME, 'warn', [...arguments].join(''));
		} else {
			if (this._enable) {
				console.warn.call(console, prefix, ...arguments);
			}
		}
	}

	error() {
		if (isWorker) {
			logger.emit(this.MSG_NAME, 'error', [...arguments].join(''));
		} else {
			if (this._enable) {
				console.error.call(console, prefix, ...arguments);
			}
		}
	}
}

let logger = new Logger();

/**
 * @param {Object} obj - custom logger
 */
export function setLogger(obj) {
	console = obj;
}

export function getLogger() {
	return logger;
}

export default logger;
