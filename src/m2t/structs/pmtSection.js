/**
 * @file: pmtSection.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * Structure for pat.
 */
import DataViewReader from '../../util/dv';
import logger from '../../util/logger';

/**
 * @extends DataViewReader
 */
class PMTSection extends DataViewReader {
	constructor(buffer) {
		super();

		// program_map_section  0x02
		this.table_id = buffer[0];

		this.section_syntax_indicator = buffer[1] >> 7;

		// this.zero = (buffer[1] >> 6) & 0x1;

		// this.reserved_0 = (buffer[1] >> 4) & 0x3;

		// the number of bytes of the section
		// starting immediately following the section_length field, and including the CRC.
		this.section_length = ((buffer[1] & 0x0f) << 8) | buffer[2];

		// It specifies the program to which the program_map_PID is applicable.
		this.program_number = this.readUint16(buffer, 3);

		// this.reserved_1 = buffer[5] >> 6;

		this.version_number = (buffer[5] >> 1) & 0x1f;

		this.current_next_indicator = buffer[5] && 0x01;

		// The section_number of the first section in the Program Association Table shall be 0x00.
		// It shall be incremented by 1 with each additional section in the PAT.
		this.section_number = buffer[6];

		// The number of the last section (that is, the section with the highest section_number) of the complete PAT.
		this.last_section_number = buffer[7];

		// contain the PCR fields valid for the program specified by program_number.
		this.PCR_PID = ((buffer[8] & 0x1f) << 8) | buffer[9];

		// this.reserved_2 = buffer[10] >> 4;

		// The number of bytes of the descriptors immediately following the program_info_length field.
		this.program_info_length = ((buffer[10] & 0x0f) << 8) | buffer[11];

		if (this.program_info_length < 0) {
			return;
		} else if (this.program_info_length > 2) {
			let i = 0;

			while (i < this.program_info_length) {
				// let descriptor_tag = buffer[12 + i];
				let descriptor_length = buffer[13 + i];

				// 	logger.log('descriptor_tag', descriptor_tag, descriptor_length);
				i += descriptor_length;
			}
		}

		var es_section_pos = 12 + this.program_info_length;
		var es_section_len = this.section_length - this.program_info_length - 9 - 4; // 9: bytes followed by section_length, 4: crc32
		var es_section_end = es_section_pos + es_section_len;

		if (es_section_pos >= es_section_end) {
			return logger.warn(`es_section_pos < es_section_end ${es_section_pos}, ${es_section_end}`);
		}

		this.pes_table = [];

		let j = 0;
		while (j < es_section_len) {
			let stream_type = buffer[es_section_pos + j];
			let elementary_PID = this.readUint16(buffer, es_section_pos + j + 1) & 0x1fff;
			let ES_info_length = this.readUint16(buffer, es_section_pos + j + 3) & 0x0fff;

			this.pes_table.push({
				streamType: stream_type,
				PID: elementary_PID
			});

			if (ES_info_length > 2) {
				let k = 0;
				let es_pos = es_section_pos + j + 5;

				while (k < ES_info_length) {
					// let descriptor_tag = buffer[es_pos + k];
					let descriptor_length = buffer[es_pos + k];

					// if (descriptor_tag === )
					k += descriptor_length;
				}
			}

			j += ES_info_length + 5;
		}

		var crcLength = this.section_length + 3;
		this.CRC_32 =
			((buffer[crcLength - 4] & 0x000000ff) << 24) |
			((buffer[crcLength - 3] & 0x000000ff) << 16) |
			((buffer[crcLength - 2] & 0x000000ff) << 8) |
			(buffer[crcLength - 1] & 0x000000ff);
	}

	parse() {
		// let data = this.uint8;
	}

	valid() {
		let start_code_prefix = this.start_code_prefix;

		return start_code_prefix[0] === 0x00 && start_code_prefix[1] === 0x00 && start_code_prefix[2] === 0x01;
	}
}

export default PMTSection;
