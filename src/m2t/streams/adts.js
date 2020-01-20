/**
 * @file: adts.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * ADTS(Audio Data Transport Stream) Stream.
 */
import Stream from '../../util/stream';
import StreamType from '../../enum/stream-types';
import ADTSCodec from '../../codec/adts';
import getAudioConfig from '../../codec/aac/aac-config';

class ADTSStream extends Stream {
	constructor(psi) {
		super();

		/** @private {PSI} */
		this.PSI = psi;

		/** @private {?Object} */
		this.trackId = null;

		/** @private {ADTSCodec} */
		this.codec = new ADTSCodec();

		this.codec.on('frame', (frame) => {
			this.frames.push(frame);
			this.frames.byteLength += frame.data.byteLength;
			this.frames.trackId = this.trackId;
		});

		this._newFrames();
	}

	push(data) {
		if (data.stream_type === StreamType.ADTS) {
			this.trackId = data.pid;

			this.codec.push(data);
		}
	}

	flush() {
		if (this.frames.length > 0) {
			let count = this.frames.length;
			let firstFrame = this.frames[0];
			let lastFrame = this.frames[count - 1];
			let lastDuration = (lastFrame.sampleRate * lastFrame.sampleCount) / 90000;

			this.frames.firstDTS = firstFrame.dts;
			this.frames.firstPTS = firstFrame.pts;

			if (count === 1) {
				this.frames.duration = lastDuration;
			} else {
				this.frames.duration = lastDuration + (lastFrame.pts - firstFrame.pts);
			}

			// To prevent information mismatch leading to next pipeline decoding errors
			// Every audio frame list assembly needs to update track meta.
			this._updateTrackMeta(firstFrame);

			this.emit('data', this.frames);

			this.reset();
			this.emit('done');
		}
	}

	reset() {
		this.trackId = null;
		this._newFrames();
	}

	_newFrames() {
		this.frames = []; // aac frames
		this.frames.type = 'audio';
		this.frames.byteLength = 0;
		this.frames.duration = 0;
		this.frames.firstDTS = 0;
		this.frames.firstPTS = 0;
	}

	/**
	 * @param {Object} frame
	 */
	_updateTrackMeta(frame) {
		let track = this.PSI.findTrack(this.trackId);
		let config = getAudioConfig(frame.audioObjectType, frame.samplingFrequencyIndex, frame.channelCount);
		track.config = config.config;
		track.sampleRate = config.sampleRate;
		track.inputTimeScale = track.inputTimeScale || track.timescale;
		track.timescale = config.sampleRate;
		track.channelCount = config.channelCount;
		track.codec = config.codec;
		track.realCodec = config.realCodec;
		track.isAAC = true;
	}
}

export default ADTSStream;
