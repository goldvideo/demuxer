/**
 * @file: created at Saturday, 9th May 2020 4:38:35 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

import Stream from '../../util/stream';
import { FLVParseStage } from '../flv-const';

export default class AVContext extends Stream {
	stage: FLVParseStage;
	pos: number = 0; // parse byte position relative to flv first byte;

	version: number;
	hasAudio: boolean;
	hasVideo: boolean;

	keyframeTimes: number[];
	keyframeFilePositions: number[];

	// const AVClass *class; ///< Class for private options.
	// int trust_metadata;   ///< configure streams according onMetaData
	// int trust_datasize;   ///< trust data size of FLVTag
	// int dump_full_metadata;   ///< Dump full metadata of the onMetadata
	// int wrong_dts;        ///< wrong dts due to negative cts
	// uint8_t *new_extradata[FLV_STREAM_TYPE_NB];
	// int new_extradata_size[FLV_STREAM_TYPE_NB];
	// int last_sample_rate;
	// int last_channels;
	// struct {
	//     int64_t dts;
	//     int64_t pos;
	// } validate_index[2];
	// int validate_next;
	// int validate_count;
	// int searched_for_end;
	// uint8_t resync_buffer[2*RESYNC_BUFFER_SIZE];
	// int broken_sizes;
	// int sum_flv_tag_size;
	// int last_keyframe_stream_index;
	// int keyframe_count;
	// int64_t video_bit_rate;
	// int64_t audio_bit_rate;
	// int64_t *keyframe_times;
	// int64_t *keyframe_filepositions;
	// int missing_streams;
	// AVRational framerate;
	// int64_t last_ts;
	// int64_t time_offset;
	// int64_t time_pos;

	// videoScriptData
}
