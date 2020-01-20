/**
 * @file: elementary.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

import DataViewReader from "../../util/dv";

/**
 * @extends DataViewReader
 */
class Elementary extends DataViewReader {
	constructor(buffer) {
		super();

		// The packet_start_code_prefix is a 24-bit code.
		this.start_code_prefix = this.readUint16(buffer, 0) << 8 | buffer[2];

		// In Transport Streams,
		// the stream_id may be set to any valid value which correctly describes the elementary stream type.
		// the elementary stream type is specified in the PSI(Program Specific Information).
		this.stream_id = buffer[3];

		// A 16-bit field specifying the number of bytes in the PES packet.
		this.packet_length = this.readUint16(buffer, 4);

	}

	valid() {
		let start_code_prefix = this.start_code_prefix;

		return start_code_prefix[0] === 0x00 && start_code_prefix[1] === 0x00 && start_code_prefix[2] === 0x01;
	}
}

export default Elementary;