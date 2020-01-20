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
import {isNumber} from '../../util/is';
import logger from '../../util/logger';
import Stream from '../../util/stream';
import StreamType from '../../enum/stream-types';
import ADTSStream from './adts';
import AVCStream from './avc';

class ElementaryStream extends Stream {
	constructor(ctx, psi, options = {}) {
		super();

		/** @private */
		this.context = ctx;

		/** @private {PSI} */
		this.PSI = psi;

		/** @private {Object} */
		this.options = options;

		/** @private {Array} */
		this.tracks = [];

		/** @private {ADTSStream} */
		this.adtsStream = new ADTSStream(psi);

		/** @private {AVCStream} */
		this.avcStream = new AVCStream(psi);

		/** @private {Array} */
		this.streams = [this.adtsStream, this.avcStream];

		this.avcStream.on('data', (data) => {
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

	/**
	 * Push a complete pes
	 * @param data
	 */
	push(data) {
		const {options, adtsStream, avcStream} = this;
		let {stream_type} = data;

		if (options.complex) {
			switch (stream_type) {
				case StreamType.H264:
				case StreamType.HEVC:
					avcStream.push(data);
					break;
				case StreamType.ADTS:
					adtsStream.push(data);
					break;
				default:
					logger.warn(`ts elementary encounter unknown stream type ${stream_type}`);
			}
		} else {
			this.emit('data', data);
		}
	}

	flush() {
		for (let i = 0; i < this.streams.length; i++) {
			let stream = this.streams[i];

			stream.flush();
		}

		this.emit('data', this.tracks);
		this.emit('done');

		this.tracks = [];
	}

	reset() {
		this.tracks = [];

		for (let i = 0; i < this.streams.length; i++) {
			let stream = this.streams[i];

			stream.reset();
		}

		this.emit('reset');
	}
}

export default ElementaryStream;
