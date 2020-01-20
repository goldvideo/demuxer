/**
 * @file: sdtSection.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * Structure for sdt.
 */
import DataViewReader from '../../util/dv';
import logger from '../../util/logger';

/**
 * @extends DataViewReader
 */
class SDTSection extends DataViewReader {
	constructor(buffer) {
		super();

		// program_map_section  0x02
		this.table_id = buffer[0];

		this.section_syntax_indicator = buffer[1] >> 7;

		// this.reserved_0 = (buffer[1] >> 4) & 0x3;

		// the number of bytes of the section
		// starting immediately following the section_length field, and including the CRC.
		this.section_length = ((buffer[1] & 0x0f) << 8) | buffer[2];

		// This is a 16-bit field which serves as a label for identification of the TS,
		// about which the SDT informs, from any other multiplex within the delivery system
		this.transport_stream_id = this.readUint16(buffer, 3);

		// this.reserved_1 = buffer[5] >> 6;

		this.version_number = (buffer[5] >> 1) & 0x1f;

		this.current_next_indicator = buffer[5] & 0x01;

		// The section_number of the first section in the sub_table shall be "0x00".
		// The section_number shall be incremented by 1 with each additional section
		// with the same table_id, transport_stream_id, and original_network_id.
		this.section_number = buffer[6];

		// This 8-bit field specifies the number of the last section
		// (that is, the section with the highest section_number) of the sub_table of which this section is part
		this.last_section_number = buffer[7];

		// This field gives the label identifying the network_id of the originating delivery system.
		this.original_network_id = this.readUint16(buffer, 8);

		// this.reserved_2 = buffer[10];

		// section_length - (following the section_length field length) - crc32Length
		let sv_len = this.section_length - 8 - 4; // 8: bytes followed by section_length, 4: crc32

		this.service_table = [];
		let i = 0;
		while (i < sv_len) {
			let j = 0,
				service = {};

			service.service_id = this.readUint16(buffer, 11);
			service.EIT_schedule_flag = buffer[13] & 0x02;
			service.EIT_present_following_flag = buffer[13] & 0x01;
			service.running_status = buffer[14] >> 5;
			service.free_CA_mode = (buffer[14] >> 4) & 0x01;
			service.descriptors_loop_length = ((buffer[14] & 0x0f) << 8) | buffer[15];

			while (j < service.descriptors_loop_length) {
				let start = 16 + j;
				let descriptor_tag = buffer[start];
				let descriptor_length = buffer[start + 1];

				switch (descriptor_tag) {
					case 0x48: // service_descriptor
						{
							let service_type = buffer[start + 2];
							let service_provider_name = [];
							let service_provider_name_length = buffer[start + 3];
							let k = 0,
								l = 0,
								nextPos = start + 4;

							for (k = 0; k < service_provider_name_length; k++) {
								service_provider_name.push(String.fromCharCode(buffer[nextPos]));
								nextPos += 1;
							}

							service.provider_name = service_provider_name.join('');

							let service_name = [];
							let service_name_length = buffer[nextPos];
							nextPos += 1;

							for (l = 0; l < service_name_length; l++) {
								service_name.push(String.fromCharCode(buffer[nextPos]));
								nextPos += 1;
							}

							service.name = service_name.join('');
						}
						break;
					default:
						logger.warn(`sdt section unhandled descriptor_tag ${descriptor_tag}`);
				}

				j += 2 + descriptor_length;
			}

			this.service_table.push(service);

			i += 5 + service.descriptors_loop_length;
		}
	}
}

export default SDTSection;
