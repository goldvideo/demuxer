/**
 * @file: created at Saturday, 9th May 2020 11:13:19 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

// The AudioSpecificConfig is explained in ISO 14496-3.
export interface AudioSpecificConfig {
    audioObjectType: number;
    sampleCount: number;
    channelConfiguration: number;
    sampleRate: number;
    samplingFrequencyIndex: number;
    // assume ISO/IEC 14496-12 AudioSampleEntry default of 16
}

export interface AACFrame extends Omit<AudioSpecificConfig, 'channelConfiguration'> {
    pts: number;
    dts: number;
    data: Uint8Array;
    channelCount: number; // equal to channelConfiguration
    sampleSize: number;
}

export const AAC_SAMPLING_FREQUENCIES = [
    96000,
    88200,
    64000,
    48000,
    44100,
    32000,
    24000,
    22050,
    16000,
    12000,
    11025,
    8000,
    7350
];
