/**
 * @file: created at Monday, 25th May 2020 2:51:52 am
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * audio data structure.
 */
import DataViewReader from '../../util/dv';
import logger from '../../util/logger';
import { AudioSoundFormat, AudioSoundType } from '../types/av-context';
import AACAudioData from './flv-tag-aac-audio-data';

// 0 = Linear PCM, platform endian
// 1 = ADPCM
// 2 = MP3
// 3 = Linear PCM, little endian
// 4 = Nellymoser 16-kHz mono
// 5 = Nellymoser 8-kHz mono
// 6 = Nellymoser
// 7 = G.711 A-law logarithmic PCM 8 = G.711 mu-law logarithmic PCM 9 = reserved
// 10 = AAC
// 11 = Speex
// 14 = MP3 8-Khz
// 15 = Device-specific sound

/**
 * @extends DataViewReader
 */
export default class FlvTagAudioData extends DataViewReader {
    soundFormat: AudioSoundFormat;
    soundRate: number;
    sampleSize: number; // Size of each sample
    soundType: AudioSoundType;
    soundData: AACAudioData;

    /**
     * @param buffer
     */
    constructor(buffer: Uint8Array, timestamp: number) {
        super();

        this.soundFormat = (buffer[0] & 0xf0) >> 4;
        this.soundRate = (buffer[0] & 0x0c) >> 2;

        let soundSize = (buffer[0] & 0x02) >> 1;

        switch (soundSize) {
            case 0:
                this.sampleSize = 8; // bit
                break;
            case 1:
                this.sampleSize = 16; // bit
                break;
        }
        this.soundType = buffer[0] & 1;

        switch (this.soundFormat) {
            case AudioSoundFormat.AAC:
                this.soundData = new AACAudioData(buffer.subarray(1), timestamp);
                break;
            default:
                logger.error(`flv tag audioData encounter unknown soundFormat ${this.soundFormat}`);
        }
    }
}
