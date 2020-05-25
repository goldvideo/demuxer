/**
 * @file: created at Monday, 25th May 2020 12:36:52 am
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * AVCVideoPacket structure.
 */
import { AudioSpecificConfig, AAC_SAMPLING_FREQUENCIES } from '../../codec/aac/aac';
import DataViewReader from '../../util/dv';
import logger from '../../util/logger';

// 0: AAC sequence header
// 1: AAC raw
export enum AACPacketType {
    SEQUENCE_HEAD = 0, // 0 : AVCDecoderConfigurationRecord（AVC sequence header）
    AAC_RAW = 1 // 1 : One or more NALUs (Full frames are required)
}

/**
 * ISO/IEC 14496-3 1.6.2.1 AudioSpecificConfig
 * @param buffer
 */
export function parseAudioSpecificConfig(buffer: Uint8Array): AudioSpecificConfig {
    let LOG = 'AudioSpecificConfig';

    // ISO/IEC 14496-3 Table 1.16 – Syntax of GetAudioObjectType()
    let audioObjectType = buffer[0] >> 3;
    if (audioObjectType == 31) {
        logger.error(`${LOG} unsupported audioObjectType`);
        // audioObjectType = 32 + audioObjectTypeExt;
    }

    let samplingFrequencyIndex = ((buffer[0] & 0x7) << 1) | (buffer[1] >> 7);
    if (samplingFrequencyIndex === 0xf) {
        logger.error(`${LOG} unsupported samplingFrequencyIndex`);
    }
    let channelConfiguration = (buffer[1] >> 3) & 0x0f;
    if (channelConfiguration < 0 || channelConfiguration >= 8) {
        logger.error('${LOG} unsupported channel configuration');
    }

    let sampleCount = ((buffer[1] >> 2) & 0x01) == 0 ? 1024 : 1024;
    let sampleRate = AAC_SAMPLING_FREQUENCIES[samplingFrequencyIndex];

    return {
        audioObjectType,
        samplingFrequencyIndex,
        channelConfiguration,
        sampleCount,
        sampleRate
    };
}

/**
 * @extends DataViewReader
 */
export default class AACAudioData extends DataViewReader {
    dts: number;
    pts: number;
    aacPacketType: AACPacketType;
    payload: Uint8Array;
    audioSpecificConfig?: AudioSpecificConfig;

    /**
     * @param buffer
     */
    constructor(buffer: Uint8Array, timestamp: number) {
        super();

        this.dts = timestamp;
        this.pts = timestamp;

        this.aacPacketType = buffer[0];
        this.payload = buffer.subarray(1);

        if (this.aacPacketType === 0) {
            this.audioSpecificConfig = parseAudioSpecificConfig(this.payload);
        }
    }
}
