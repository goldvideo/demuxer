/**
 * @file: avc.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * H.264/AVC/HEVC Stream.
 */
import AVCCodec from '../../codec/avc';
import getAVCConfig from '../../codec/avc/avc-config';
import NALU from '../../codec/avc/nalu';
import NaluTypes from '../../enum/nalu-types';
import StreamType from '../../enum/stream-types';
import logger from '../../util/logger';
import Stream from '../../util/stream';
import PSI from '../psi';
import { AVCFrame, GOP, GOPVector, PESStreamEmitData } from '../types/pipeline';

class H264Stream extends Stream {
	private PSI: PSI;
	private trackId?: number;
	private currentFrame: AVCFrame;
	private prevFrame: AVCFrame;
	private codec: AVCCodec;
	private gop: GOP;
	private gops: GOPVector;

	constructor(psi: PSI) {
		super();

		this.PSI = psi;
		this.trackId = null;

		/** @private {Array} */
		this.currentFrame = []; // a group of nalu

		/** @private {AVCCodec} */
		this.codec = new AVCCodec();

		this._newGop();
		this._newGops();

		this.codec.on('nalu', (nalu: NALU) => {
			if (nalu.unit_type === NaluTypes.SPS) {
				let track = this.PSI.findTrack(this.trackId);
				let config = getAVCConfig(nalu.sps);

				// write sps info to video track.
				track.codec = config.codec;
				track.width = nalu.sps.width;
				track.height = nalu.sps.height;
				track.profileIdc = nalu.sps.profile_idc;
				track.profileCompatibility = nalu.sps.profile_compatibility;
				track.levelIdc = nalu.sps.level_idc;
				track.pixelRatio = nalu.sps.pixelRatio;
				track.sps = [nalu.rawData];
			} else if (nalu.unit_type === NaluTypes.PPS) {
				let track = this.PSI.findTrack(this.trackId);
				track.pps = [nalu.rawData];
			}

			this._grouping(nalu);
		});
	}

	/**
	 * Push a complete pes
	 * @param data
	 */
	push(data: PESStreamEmitData) {
		if (data.stream_type === StreamType.H264 || data.stream_type === StreamType.HEVC) {
			this.trackId = data.pid;

			this.codec.push(data);
		}
	}

	flush() {
		// Push last frame into gop.
		if (this.currentFrame.length > 0) {
			// If the last frame has valid duration, use the duration of the previous frame
			if (!this.currentFrame.duration || this.currentFrame.duration <= 0) {
				this.currentFrame.duration = this.prevFrame.duration || 0;
			}

			this._pushFrameIntoGop();
			this.currentFrame = [];
		}

		// Push last gop.
		if (this.gop.length > 0) {
			this._pushGopIntoGroup();
		}
	}

	reset() {
		this.codec.reset();

		this.currentFrame = [];
		this._newGop();
		this._newGops();
	}

	/**
	 * Group nalu into frame & gop.
	 * @param currentNal
	 * @private
	 */
	_grouping(currentNal) {
		if (currentNal.unit_type === NaluTypes.AUD) {
			if (this.currentFrame.length > 0) {
				this.currentFrame.duration = currentNal.dts - this.currentFrame.dts;

				if (this.gop.length > 0 && this.currentFrame.keyframe) {
					this.gop.trackId = this.trackId;

					this._pushGopIntoGroup();
				}

				// the gop should commence with a key frame,
				// or the frame will be dropped until finding one that contains a key frame.
				if (this.currentFrame.keyframe || this.gop.length > 0) {
					this._pushFrameIntoGop();
				} else {
					logger.warn(`h264 codec drop frame`);
				}
			}

			this.prevFrame = this.currentFrame;

			// end a frame.
			this.currentFrame = [];
			this.currentFrame.keyframe = false;
			this.currentFrame.byteLength = 0;
			this.currentFrame.naluCount = 0;
			this.currentFrame.pts = currentNal.pts;
			this.currentFrame.dts = currentNal.dts;
		} else {
			if (currentNal.unit_type === NaluTypes.IDR_SLICE) {
				this.currentFrame.keyframe = true;
			}

			this.currentFrame.byteLength += currentNal.rawData.byteLength;
			this.currentFrame.naluCount++;
			this.currentFrame.push(currentNal);
		}

		this.currentFrame.duration = currentNal.dts - this.currentFrame.dts;
	}

	_newGop() {
		this.gop = []; // a group of idr-start-frame sequence

		this.gop.duration = 0;
		this.gop.naluCount = 0;
		this.gop.byteLength = 0;
	}

	_pushFrameIntoGop() {
		// Gop
		this.gop.push(this.currentFrame);
		this.gop.duration += this.currentFrame.duration;
		this.gop.byteLength += this.currentFrame.byteLength;
		this.gop.naluCount += this.currentFrame.naluCount;
	}

	_newGops() {
		this.gops = []; // a group of gop
		this.gops.type = 'video';
		this.gops.duration = 0;
		this.gops.naluCount = 0;
		this.gops.byteLength = 0;
		this.gops.frameLength = 0;
		this.gops.firstDTS = 0;
	}

	_pushGopIntoGroup() {
		let firstFrame = this.gop[0];
		// GOPs
		this.gops.trackId = this.trackId;
		this.gops.duration += this.gop.duration;
		this.gops.byteLength += this.gop.byteLength;
		this.gops.naluCount += this.gop.naluCount;
		this.gops.frameLength += this.gop.length;
		this.gops.firstDTS = firstFrame.dts;
		this.gops.firstPTS = firstFrame.pts;

		this.gops.push(this.gop);

		this.emit('data', this.gops);

		this._newGop();
		this._newGops();

		this.emit('done');
	}
}

export default H264Stream;
