/**
 * @file: stream.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * simple stream implementation.
 */

import { PushConf } from '../types/globals';
import EventEmitter from './event-emitter';

class Stream extends EventEmitter {
    constructor() {
        super();
    }

    /**
     * connect to the next pipeline stream.
     * @param destination
     */
    pipe(destination: Stream): Stream {
        this.on('reset', function () {
            destination.reset();
        });

        this.on('data', function (data) {
            destination.push(data);
        });

        this.on('done', function (flushSource) {
            destination.flush(flushSource);
        });

        return destination;
    }

    /**
     * detaches the next pipeline stream previously attached.
     */
    unpipe(): Stream {
        this.removeAllListeners('reset');
        this.removeAllListeners('data');
        this.removeAllListeners('done');

        return this;
    }

    /**
     * push data to current pipeline.
     * @param data
     */
    push(data: any, conf?: PushConf): void {
        this.emit('data', data);
    }

    /**
     * flush current pipeline.
     * @param flushSource
     */
    flush(flushSource: Stream): void {
        this.emit('done', flushSource);
    }

    reset(): void {
        this.emit('reset');
    }
}

export default Stream;
