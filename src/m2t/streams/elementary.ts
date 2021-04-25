/**
 * @file: elementary.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * Elementary Stream.
 * @summary An elementary stream (ES) as defined by the MPEG communication protocol is usually the output of an audio or video encoder.
 *      ES contains only one kind of data, e.g. audio, video or closed caption.
 * @description  https://en.wikipedia.org/wiki/Elementary_stream
 */
import { StreamTypes } from '../../enum/stream-types';
import { Context, GlobalOptions } from '../../types/globals';
import { isNumber } from '../../util/is';
import logger from '../../util/logger';
import Stream from '../../util/stream';
import { PSI } from '../psi';
import { PESStreamEmitData, GOPVector } from '../types/pipeline';
import ADTSStream from './adts';
import AVCStream from './avc';

class ElementaryStream extends Stream {
    private context: Context;
    private PSI: PSI;
    private options: GlobalOptions;
    private tracks: Array<GOPVector>;
    private adtsStream: ADTSStream;
    private avcStream: AVCStream;
    private streams: [ADTSStream, AVCStream];

    constructor(ctx: Context, psi: PSI, options: GlobalOptions = {}) {
        super();

        this.context = ctx;
        this.PSI = psi;
        this.options = options;
        this.tracks = [];
        this.adtsStream = new ADTSStream(psi);
        this.avcStream = new AVCStream(psi);
        this.streams = [this.adtsStream, this.avcStream];

        if (options.decodeCodec) {
            this.avcStream.on('data', (data: GOPVector) => {
                let stubTime = options.config.stubTime;

                if (isNumber(stubTime)) {
                    let end = (data.firstPTS + data.duration) / 90000;
                    if (end < stubTime) {
                        logger.warn(`drop avc gop, start/end/stubTime(${data.firstPTS}/${end}/${stubTime})`);
                        return;
                    }
                }

                this.tracks.push(data);
                this.emit('data', this.tracks);
                this.tracks = [];
                this.adtsStream.flush();
            });

            this.adtsStream.on('data', (data) => {
                let stubTime = options.config.stubTime;

                if (isNumber(stubTime)) {
                    let end = (data.firstPTS + data.duration) / 90000;
                    if (end < stubTime) {
                        logger.warn(`drop adts, start/end/stubTime(${data.firstPTS}/${end}/${stubTime})`);
                        return;
                    }
                }

                this.tracks.push(data);
                this.emit('data', this.tracks);
                this.tracks = [];
            });
        }
    }

    /**
     * Push a complete pes
     * @param data
     */
    push(data: PESStreamEmitData): void {
        const { options, adtsStream, avcStream } = this;
        let { stream_type } = data;

        if (options.decodeCodec) {
            switch (stream_type) {
                case StreamTypes.H264:
                case StreamTypes.HEVC:
                    avcStream.push(data);
                    break;
                case StreamTypes.ADTS:
                    adtsStream.push(data);
                    break;
                default:
                    logger.warn(`ts elementary encounter unknown stream type ${stream_type}`);
            }
        } else {
            this.emit('data', data);
        }
    }

    flush(): void {
        let { streams, tracks } = this;
        for (let i = 0; i < this.streams.length; i++) {
            let stream = streams[i];

            stream.flush();
        }

        if (tracks.length > 0) {
            this.emit('data', tracks);
        }

        this.emit('done');

        tracks.splice(0, tracks.length);
    }

    reset(): void {
        this.tracks = [];

        for (let i = 0; i < this.streams.length; i++) {
            let stream = this.streams[i];

            stream.reset();
        }

        this.emit('reset');
    }
}

export default ElementaryStream;
