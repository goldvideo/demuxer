/**
 * @file: complex.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * Complex Stream.
 *
 * Combine Video, Audio, Caption c and other data.
 */
import Stream from '../../util/stream';
import logger from '../../util/logger';

class M2TSComplexStream extends Stream {
    constructor(ctx, psi) {
        super();

        /** @private */
        this.context = ctx;

        /** @private {PSI} */
        this.PSI = psi;

        /** @private {Object} */
        this.videoTrack = null;

        /** @private {Object} */
        this.audioTrack = null;

        /** @private {Object} */
        this.captionTrack = null;

        // pipe specified by outside.
    }

    push(data) {
        let tracks = data;

        for (let i = 0, track; i < tracks.length; i++) {
            track = tracks[i];

            switch (track.type) {
                case 'video':
                    // data -> GOPs
                    this._complexVideo(track);
                    break;
                case 'audio':
                    this._complexAudio(track);
                    break;
                case 'caption':
                    this._complexCaption(track);
                    break;
            }
        }
    }

    flush() {
        this.emit('done');

        this._clearStream();
    }

    reset() {
        this._clearStream();

        // This is demux end stream, so don't emit reset.
        // this.emit('reset');
    }

    _clearStream() {
        this.videoTrack = null;
        this.audioTrack = null;
        this.captionTrack = null;
    }

    _complexVideo(gops) {
        let track = this.PSI.findTrack(gops.trackId);

        if (track) {
            track.type = 'video';
            track.gops = gops;
            track.firstDTS = gops[0][0].dts;
            track.firstPTS = gops[0][0].pts;
            // set duration to Infinity(POSITIVE_INFINITY) can be useful for live.
            // If Infinity it will loose the ability to seek.
            track.duration = Number.POSITIVE_INFINITY;

            this.videoTrack = track;

            this.emit('data', {
                videoTrack: this.videoTrack
            });
        }
    }

    _complexAudio(frames) {
        let track = this.PSI.findTrack(frames.trackId);

        if (track) {
            track.type = 'audio';
            track.frames = frames;
            track.firstPTS = track.firstDTS = frames[0].dts;

            // set duration to Infinity(POSITIVE_INFINITY) can be useful for live.
            // If Infinity it will loose the ability to seek.
            track.duration = Number.POSITIVE_INFINITY;

            this.audioTrack = track;

            this.emit('data', {
                audioTrack: this.audioTrack
            });
        }
    }

    _complexCaption() {}
}

export default M2TSComplexStream;
