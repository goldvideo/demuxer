/**
 * @file: packet.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

const SYNC_BYTE = 0x47; // The sync_byte is a fixed 8-bit field whose value is '0100 0111' (0x47).

/**
 * packet structure.
 */
export class Packet {
    sync_byte: number;
    // transport_error_indicator: number;
    payload_unit_start_indicator: number;
    // transport_priority: number;
    PID: number;
    // tsc: number;
    afc: number;
    // continuity_counter: number;
    has_payload: number;
    has_adaptation: number;
    // is_discontinuity: boolean;
    payload: Uint8Array;

    /**
     * @param buffer
     */
    constructor(buffer: Uint8Array) {
        this.sync_byte = buffer[0];

        // this.transport_error_indicator = buffer[1] >> 7;

        // Indicating transport stream packets carry PES packets or PSI data
        // PES: 1 -> commence with the first byte of a PES packet,  0 -> no PES packet shall start in this packet.
        // PSI: 1 -> carries the first byte of a PSI section, 0 -> no pointer_field in the payload.
        this.payload_unit_start_indicator = (buffer[1] >> 6) & 1;

        // this.transport_priority = (buffer[1] >>> 5) & 1;

        // The PID(Packet ID) is a 13-bit field, indicating the type of the data stored in the packet payload.
        // NOTE – The transport packets with PID values 0x0000, 0x0001, and 0x0010-0x1FFE are allowed to carry a PCR.
        // ISO/IEC 13818-1 : 2000 (E)
        // Value                  Description
        // 0x0000                 Program Association Table
        // 0x0001                 Conditional Access Table
        // 0x0002                 Transport Stream Description Table
        // 0x0003-0x000F          Reserved
        // 0x0010 ... 0x1FFE      May be assigned as network_PID, Program_map_PID, elementary_PID, or for other purposes
        // https://www.dvb.org/resources/public/standards/a38_dvb-si_specification.pdf
        // 0x0040                 Network_information_section-actual_network
        // 0x0041                 Network_information_section-other_network
        // 0x0042                 Service_description_section-actual_transport_stream
        // 0x0043                 TO 0x45 Reserved for future use
        // 0x0046                 Service_description_section-other_transport_stream
        // 0x0047                 TO 0x49 Reserved for future use
        // 0x004A                 Bouquet_association_section
        // 0x004B                 TO 0x4D Reserved for future use
        // 0x004E                 Event_information_section-actual_transport_stream,P/F
        // 0x004F                 Event_information_section-other_transport_stream,P/F
        // 0x0050                 TO 0x5F Event_information_section-actual_transport_stream,schedule
        // 0x0060                 TO 0x6F Event_information_section-other_transport_stream,schedule
        // 0x0070                 Time_data_section
        // 0x0071                 Running_status_section
        // 0x0072                 Stuffing_section
        // 0x0073                 Time_offset_section
        // 0x0074                 TO 0x007D Reserved for future use
        // 0x007E                 Discontinuity_information_section
        // 0x007F                 Selection_information_section
        // 0x0080                 TO 0x00FE User defined
        // 0x00FF                 Reserved
        // 0x1FFF                 Null packet
        this.PID = ((buffer[1] << 8) | buffer[2]) & 0x1fff;

        // transport_scrambling_control
        // this.tsc = buffer[3] >> 6;

        // adaptation_field_control
        // Value  Description
        // 00     Reserved for future use by ISO/IEC
        // 01     No adaptation_field, payload only
        // 10     Adaptation_field only, no payload
        // 11     Adaptation_field followed by payload
        this.afc = (buffer[3] >> 4) & 3;

        // '1' indicates that the discontinuity state is true for the current Transport Stream packet.
        // this.continuity_counter = buffer[3] & 0xf;

        // self defines.
        this.has_payload = this.afc & 1;
        this.has_adaptation = this.afc & 2;
        // this.is_discontinuity = this.has_adaptation && buffer[4] != 0 /* with length > 0 */ && buffer[5] & 0x80;
        /* and discontinuity indicated */

        if (this.has_payload) {
            if (this.has_adaptation) {
                let adaptation_field_length = buffer[4];
                this.payload = buffer.subarray(5 + adaptation_field_length);
            } else {
                this.payload = buffer.subarray(4);
            }
        }
    }

    valid() {
        return this.sync_byte === SYNC_BYTE && this.has_payload === 1;
    }
}
