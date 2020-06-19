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
    private MSG_NAME: string;
    private _enable: boolean;

    get enable() {
        return this._enable;
    }

    set enable(value: boolean) {
        this._enable = value;

        this.MSG_NAME = '__log__';
    }

    constructor() {
        super();
        this._enable = false;
    }

    log(...restArgs: any) {
        if (isWorker) {
            logger.emit(this.MSG_NAME, 'log', [...restArgs].join(''));
        } else {
            if (this._enable) {
                console.log.call(console, prefix, ...restArgs);
            }
        }
    }

    debug(...restArgs: any) {
        if (isWorker) {
            logger.emit(this.MSG_NAME, 'debug', [...restArgs].join(''));
        } else {
            if (this._enable && console.debug) {
                console.debug.call(console, prefix, ...restArgs);
            }
        }
    }

    assert(...restArgs: any) {
        if (this._enable && console.assert) {
            let condition = restArgs[0];
            let sliceArgs = Array.prototype.slice.call(restArgs, 1);
            sliceArgs.unshift(prefix);

            console.assert.call(console, condition, ...sliceArgs);
        }
    }

    warn(...restArgs: any) {
        if (isWorker) {
            logger.emit(this.MSG_NAME, 'warn', [...restArgs].join(''));
        } else {
            if (this._enable) {
                console.warn.call(console, prefix, ...restArgs);
            }
        }
    }

    error(...restArgs: any) {
        if (isWorker) {
            logger.emit(this.MSG_NAME, 'error', [...restArgs].join(''));
        } else {
            if (this._enable) {
                console.error.call(console, prefix, ...restArgs);
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
