/**
 * @file: patSection.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

import logger from '../../util/logger';

/**
 * Structure for pat.
 */
export class PATSection {
    // table_id: number;
    // section_syntax_indicator: number;
    // section_length: number;
    // transport_stream_id: number;
    // version_number: number;
    // current_next_indicator: number;
    // section_number: number;
    // last_section_number: number;
    // network_PID: number;
    pmtTable: Array<M2TS.PMTTableItem>;
    // CRC_32: number;

    constructor(buffer: Uint8Array) {
        // program_association_section 0x00
        // this.table_id = buffer[0];

        // this.section_syntax_indicator = buffer[1] >> 7;

        // this.zero = (buffer[1] >> 6) & 0x1;

        // this.reserved_0 = (buffer[1] >> 4) & 0x3;

        // the number of bytes of the section
        // starting immediately following the section_length field, and including the CRC.
        let section_length = ((buffer[1] & 0x0f) << 8) | buffer[2];

        // this.transport_stream_id = (buffer[3] << 8) | buffer[4];

        // this.reserved_1 = buffer[5] >> 6;

        // this.version_number = (buffer[5] >> 1) & 0x1f;

        // this.current_next_indicator = buffer[5] && 0x01;

        // The section_number of the first section in the Program Association Table shall be 0x00.
        // It shall be incremented by 1 with each additional section in the PAT.
        // this.section_number = buffer[6];

        // The number of the last section (that is, the section with the highest section_number) of the complete PAT.
        // this.last_section_number = buffer[7];

        // this.network_PID = 0x00;

        var n = 0,
            program_num;
        // reserved_3;
        var len = section_length - 4 - 5; // 4: crc32, 5: bytes followed by section_length

        this.pmtTable = [];
        /* loop by 4 bytes, during  */
        for (; n < len; n += 4) {
            program_num = (buffer[n + 8] << 8) | buffer[n + 9];
            // reserved_3 = buffer[10 + n] >> 5;

            if (program_num == 0x00) {
                let network_PID = ((buffer[10 + n] & 0x1f) << 8) | buffer[11 + n];

                // 记录该TS流的网络PID
                // TS_network_Pid = this.network_PID;

                logger.log('packet->network_PID %0x /n/n', network_PID);
            } else {
                this.pmtTable.push({
                    programNum: program_num,
                    program_map_PID: ((buffer[10 + n] & 0x1f) << 8) | buffer[11 + n]
                });

                // TS_PAT_Program
                // PAT_program;
                // PAT_program.program_map_PID = (buffer[10 + n] & 0x1F) << 8 | buffer[11 + n];
                // PAT_program.program_number = program_num;
                // this.program.push_back(PAT_program);
                // TS_program.push_back(PAT_program);//向全局PAT节目数组中添加PAT节目信息
            }
        }

        // var crcLength = this.section_length + 3;
        // this.CRC_32 =
        //     ((buffer[crcLength - 4] & 0x000000ff) << 24) |
        //     ((buffer[crcLength - 3] & 0x000000ff) << 16) |
        //     ((buffer[crcLength - 2] & 0x000000ff) << 8) |
        //     (buffer[crcLength - 1] & 0x000000ff);
    }
}
