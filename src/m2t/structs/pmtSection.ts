/**
 * @file: pmtSection.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * Structure for pat.
 */
import logger from '../../util/logger';

/**
 * Structure for PMT.
 */
export class PMTSection {
    // table_id: number;
    // section_syntax_indicator: number;
    // section_length: number;
    // program_number: number;
    // version_number: number;
    // current_next_indicator: number;
    // section_number: number;
    // last_section_number: number;
    // PCR_PID: number;
    pes_table: Array<M2TS.PESTableItem>;
    // CRC_32: number;

    constructor(buffer: Uint8Array) {
        // program_map_section  0x02
        // this.table_id = buffer[0];

        // this.section_syntax_indicator = buffer[1] >> 7;

        // this.zero = (buffer[1] >> 6) & 0x1;

        // this.reserved_0 = (buffer[1] >> 4) & 0x3;

        // the number of bytes of the section
        // starting immediately following the section_length field, and including the CRC.
        let section_length = ((buffer[1] & 0x0f) << 8) | buffer[2];

        // It specifies the program to which the program_map_PID is applicable.
        // this.program_number = (buffer[3] << 8) | buffer[4];

        // this.reserved_1 = buffer[5] >> 6;

        // this.version_number = (buffer[5] >> 1) & 0x1f;

        // this.current_next_indicator = buffer[5] && 0x01;

        // The section_number of the first section in the Program Association Table shall be 0x00.
        // It shall be incremented by 1 with each additional section in the PAT.
        // this.section_number = buffer[6];

        // The number of the last section (that is, the section with the highest section_number) of the complete PAT.
        // this.last_section_number = buffer[7];

        // contain the PCR fields valid for the program specified by program_number.
        // this.PCR_PID = ((buffer[8] & 0x1f) << 8) | buffer[9];

        // this.reserved_2 = buffer[10] >> 4;

        // The number of bytes of the descriptors immediately following the program_info_length field.
        const program_info_length = ((buffer[10] & 0x0f) << 8) | buffer[11];

        if (program_info_length < 0) {
            return;
        } else if (program_info_length > 2) {
            let i = 0;

            while (i < program_info_length) {
                // let descriptor_tag = buffer[12 + i];
                let descriptor_length = buffer[13 + i];

                // 	logger.log('descriptor_tag', descriptor_tag, descriptor_length);
                i += descriptor_length;
            }
        }

        var es_section_pos = 12 + program_info_length;
        var es_section_len = section_length - program_info_length - 9 - 4; // 9: bytes followed by section_length, 4: crc32
        var es_section_end = es_section_pos + es_section_len;

        if (es_section_pos >= es_section_end) {
            logger.warn(`es_section_pos < es_section_end ${es_section_pos}, ${es_section_end}`);
            return;
        }

        this.pes_table = [];

        let j = 0;
        while (j < es_section_len) {
            let basePos = es_section_pos + j;
            let stream_type = buffer[basePos];
            let elementary_PID = ((buffer[basePos + 1] << 8) | buffer[basePos + 2]) & 0x1fff;
            let ES_info_length = ((buffer[basePos + 3] << 8) | buffer[basePos + 4]) & 0x0fff;

            this.pes_table.push({
                streamType: stream_type,
                PID: elementary_PID
            });

            // if (ES_info_length > 2) {
            //     let k = 0;
            //     let es_pos = basePos + 5;

            //     while (k < ES_info_length) {
            //         // let descriptor_tag = buffer[es_pos + k];
            //         let descriptor_length = buffer[es_pos + k];

            //         // if (descriptor_tag === )
            //         k += descriptor_length;
            //     }
            // }

            j += ES_info_length + 5;
        }

        // var crcLength = this.section_length + 3;
        // this.CRC_32 =
        //     ((buffer[crcLength - 4] & 0x000000ff) << 24) |
        //     ((buffer[crcLength - 3] & 0x000000ff) << 16) |
        //     ((buffer[crcLength - 2] & 0x000000ff) << 8) |
        //     (buffer[crcLength - 1] & 0x000000ff);
    }
}
