/**
 * @file: demux.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

import DemuxFacade from '../demux-facade';
import { GlobalOptions } from '../types/globals';
import logger from '../util/logger';
import { MP4Inspect } from './mp4-inspector';

/**
 * mp4.
 */
export class MP4Demux extends DemuxFacade {
    constructor(options: GlobalOptions = {}) {
        super(options);

        super.listenEndStream_();
    }

    /**
     * This is end pipeline stream
     */
    get endStream() {
        return this;
    }

    /**
     * The MP4 data pushed into stream should be complete data.
     * @param buffer
     */
    push(buffer: ArrayBuffer | Uint8Array) {
        let newBuf: Uint8Array = super.constraintPushData_(buffer);

        logger.log(`mp4 demux received ${newBuf.byteLength} bytes`);

        let result = MP4Inspect.mp4toJSON(newBuf);

        this.emit('data', result);
    }
}
