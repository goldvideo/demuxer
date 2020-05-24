/**
 * @file: tag.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * video data structure.
 */
import DataViewReader from '../../util/dv';
import logger from '../../util/logger';
import { PipelineContext } from '../types/flv-pipeline';
import AVCVideoPacket from './flv-tag-avc-video-packet';

// If CodecID == 2 H263VIDEOPACKET
// If CodecID == 3 SCREENVIDEOPACKET
// If CodecID == 4 VP6FLVVIDEOPACKET
// If CodecID == 5 VP6FLVALPHAVIDEOPACKET
// If CodecID == 6 SCREENV2VIDEOPACKET
// if CodecID == 7 AVCVIDEOPACKET
// Video frame payload or UI8 (see note following table)

export enum VideoCodecIDs {
	AVC = 7 // AVC_VIDEO_PACKET
}

/**
 * @extends DataViewReader
 */
export default class FlvTagVideoData extends DataViewReader {
	frameType: number;
	isKeyframe: boolean;
	codecId: VideoCodecIDs;
	videoData: AVCVideoPacket;

	/**
	 * @param buffer
	 */
	constructor(pipeCtx: PipelineContext, buffer: Uint8Array, timestamp: number) {
		super();

		this.frameType = (buffer[0] >> 4) & 0x0f;
		this.isKeyframe = this.frameType === 1;
		this.codecId = buffer[0] & 0x0f;

		switch (this.codecId) {
			case VideoCodecIDs.AVC:
				this.videoData = new AVCVideoPacket(pipeCtx, buffer.subarray(1), timestamp);
				break;
			default:
				logger.error(`flv tag videoData encounter unknown codecId ${this.codecId}`);
		}
	}
}
