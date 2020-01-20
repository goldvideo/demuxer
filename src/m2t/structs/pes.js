/**
 * @file: pes.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

import DataViewReader from '../../util/dv';

/**
 * @extends DataViewReader
 */
class Pes extends DataViewReader {
	constructor(buffer) {
		super();

		// The packet_start_code_prefix is a 24-bit code.
		this.start_code_prefix = (this.readUint16(buffer, 0) << 8) | buffer[2];

		// In Transport Streams,
		// the stream_id may be set to any valid value which correctly describes the elementary stream type.
		// the elementary stream type is specified in the PSI(Program Specific Information).
		this.stream_id = buffer[3];

		// A 16-bit field specifying the number of bytes in the PES packet.
		this.packet_length = this.readUint16(buffer, 4);

		this.data_alignment_indicator = buffer[6] & 0x04;

		this.copyright = buffer[6] & 0x02;

		// PTS (presentation time stamp)
		// DTS (decoding time stamp)
		this.PTS_DTS_flags = buffer[7] >> 6;

		// ESCR (Elementary Stream Clock Reference system):
		// A time stamp in the PES Stream from which decoders of PES streams may derive timing.
		this.ESCR_flag = buffer[7] & 0x20;

		this.ES_rate_flag = buffer[7] & 0x10;

		this.trick_mode_flag = buffer[7] & 0x08;

		this.additional_copy_info_flag = buffer[7] & 0x04;

		this.CRC_flag = buffer[7] & 0x02;

		this.extension_flag = buffer[7] & 0x01;

		this.header_data_length = buffer[8];

		this.PTS = 0;
		if ((this.PTS_DTS_flags & 0x02) == 0x02) {
			this.PTS = this._calcTimestamp(buffer, 9);
		}

		// if there is no dts, let DTS=PTS
		// See Annex D - D.0.2 Audio and Video Presentation Synchronization
		this.DTS = this.PTS;

		if ((this.PTS_DTS_flags & 0x01) == 0x01) {
			this.DTS = this._calcTimestamp(buffer, 14);
		}

		// if (this.ESCR_flag === 1) {
		// }
		//
		// if (this.ES_rate_flag === 1) {
		// }
		//
		//
		// if (this.trick_mode_flag === 1) {
		//
		// }
		//
		// if (this.ESCR_flag === 1) {
		// }

		this.data_byte = buffer.subarray(9 + this.header_data_length);

		// this.isStartPes = (buffer[0] << 16 | buffer[1] << 8 | buffer[2]) & 0xffffff === 0x000001;
	}

	/**
	 * @param {Uint8Array} buffer
	 * @param {Number} start
	 * @private
	 */
	_calcTimestamp(buffer, start) {
		// PTS / DTS is 33 bit
		return (
			// JS Bitwise operators treat their operands as a sequence of 32 bits,
			// We cannot use bitwise operator in JS beyond 32bits
			(buffer[start] & 0x0e) * 536870912 + // Math.pow(2, 29) === 536870912
			(buffer[start + 1] << 22) +
			((buffer[start + 2] >> 1) << 15) +
			(buffer[start + 3] << 7) +
			(buffer[start + 4] >> 1)
		);
	}

	valid() {
		let start_code_prefix = this.start_code_prefix;

		return start_code_prefix[0] === 0x00 && start_code_prefix[1] === 0x00 && start_code_prefix[2] === 0x01;
	}
}

export default Pes;
