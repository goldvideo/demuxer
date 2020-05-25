/**
 * @file: pps.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

import ExpGolomb from '../../util/exp-golumb';

export type PPSProps = {
    sliceGroupNum: number;
};

/**
 * decode (PPS)Picture parameter set
 * @param payload
 */
export function decodePPS(payload: Uint8Array): PPSProps {
    let bitOffset = 0;

    let golombBuffer = payload;
    let slice_group_change_direction_flag = 0,
        sliceGroupIds = [];
    let sgcdfUEV, picSizeUEV;
    let i = 0;

    // pic_parameter_set_id
    let ppsUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
    bitOffset += ppsUEV.bitLength;

    // seq_parameter_set_id
    let spsUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
    bitOffset += spsUEV.bitLength;

    // entropy_coding_mode_flag
    // 0: Exp-Golomb coded, see subclause 9.1 or CAVLC, see subclause 9.2
    // 1: CABAC, see subclause 9.3
    let entropy_coding_mode_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
    bitOffset += 1;

    // bottom_field_pic_order_in_frame_present_flag
    let bottom_field_pic_order_in_frame_present_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
    bitOffset += 1;

    // num_slice_groups_minus1,
    let sliceGroupUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
    bitOffset += sliceGroupUEV.bitLength;

    if (sliceGroupUEV.value > 0) {
        // slice_group_map_type
        let sgmtUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
        bitOffset += sgmtUEV.bitLength;

        let iGroup = 0,
            itemUev;

        switch (sgmtUEV.value) {
            case 0:
                for (iGroup = 0; iGroup <= sgmtUEV.value; iGroup++) {
                    // run_length_minus1
                    itemUev = ExpGolomb.readUEV(golombBuffer, bitOffset);
                    bitOffset += itemUev.bitLength;
                }
                break;
            case 2:
                for (iGroup = 0; iGroup <= sgmtUEV.value; iGroup++) {
                    // top_left
                    itemUev = ExpGolomb.readUEV(golombBuffer, bitOffset);
                    bitOffset += itemUev.bitLength;
                    // bottom_right
                    itemUev = ExpGolomb.readUEV(golombBuffer, bitOffset);
                    bitOffset += itemUev.bitLength;
                }
                break;
            case 3:
            case 4:
            case 5:
                // slice_group_change_direction_flag
                slice_group_change_direction_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
                bitOffset += 1;
                // slice_group_change_rate_minus1
                sgcdfUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
                bitOffset += sgcdfUEV.bitLength;
                break;
            case 6:
                {
                    // pic_size_in_map_units_minus1
                    picSizeUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
                    bitOffset += picSizeUEV.bitLength;

                    let length = Math.ceil(Math.log2(sliceGroupUEV.value + 1));
                    for (i = 0; i <= picSizeUEV.value; i++) {
                        // pic_size_in_map_units_minus1
                        sliceGroupIds.push(ExpGolomb.readBit(golombBuffer, bitOffset, length));
                        bitOffset += length;
                    }
                }
                break;
        }
    }

    // num_ref_idx_l0_default_active_minus1
    let nril0dcmUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
    bitOffset += nril0dcmUEV.bitLength;

    // num_ref_idx_l1_default_active_minus1
    let nril1dcmUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
    bitOffset += nril1dcmUEV.bitLength;

    // weighted_pred_flag
    let weighted_pred_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
    bitOffset += 1;

    // weighted_bipred_idc
    let weighted_bipred_idc = ExpGolomb.readBit(golombBuffer, bitOffset, 2);
    bitOffset += 1;

    // pic_init_qp_minus26
    let piqpSEV = ExpGolomb.readSEV(golombBuffer, bitOffset);
    bitOffset += piqpSEV.bitLength;
    // pic_init_qs_minus26
    let piqsSEV = ExpGolomb.readSEV(golombBuffer, bitOffset);
    bitOffset += piqsSEV.bitLength;
    // chroma_qp_index_offset
    let cqioSEV = ExpGolomb.readSEV(golombBuffer, bitOffset);
    bitOffset += cqioSEV.bitLength;

    let deblocking_filter_control_present_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
    bitOffset += 1;
    let constrained_intra_pred_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
    bitOffset += 1;
    let redundant_pic_cnt_present_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
    bitOffset += 1;

    // if( more_rbsp_data( ) ) {
    //     // Unused data...
    // }

    return {
        sliceGroupNum: sliceGroupUEV.value + 1
    };
}
