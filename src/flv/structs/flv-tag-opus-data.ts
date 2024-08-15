/**
 * @file: created at Monday, 25th May 2020 12:36:52 am
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * Packet structure.
 */
import DataViewReader from '../../util/dv';

export enum OpusPacketType {
  SEQUENCE_HEAD = 0, // 0 : AVCDecoderConfigurationRecord（AVC sequence header）
  RAW = 1 // 1 : One or more NALUs (Full frames are required)
}

/**
 * @extends DataViewReader
 */
export default class OpusAudioData extends DataViewReader {
  dts: number;
  pts: number;
  packetType: OpusPacketType;
  payload: Uint8Array;

  /**
   * @param buffer
   */
  constructor(buffer: Uint8Array, timestamp: number) {
    super();

    this.dts = timestamp;
    this.pts = timestamp;

    this.packetType = buffer[0];
    this.payload = buffer.subarray(1);

    // if (this.aacPacketType === 0) {
    //     this.audioSpecificConfig = parseAudioSpecificConfig(this.payload);
    // }
  }
}
