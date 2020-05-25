/**
 * @file= nalu-types.js, created at Monday, 23rd December 2019 3=47=23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 * @overview nal_unit_type, defined in ISO/IEC 14496-10=Table 7-1 – NAL unit type codes
 */

/*
// nal_unit_type    Content of NAL unit and RBSP syntax structure                                   C
// 0                Unspecified
// 1                Coded slice of a non-IDR picture slice_layer_without_partitioning_rbsp( )       2, 3, 4
// 2                Coded slice data partition A slice_data_partition_a_layer_rbsp( )               2
// 3                Coded slice data partition B slice_data_partition_b_layer_rbsp( )               3
// 4                Coded slice data partition C slice_data_partition_c_layer_rbsp( )               4
// 5                Coded slice of an IDR picture slice_layer_without_partitioning_rbsp( )          2, 3
// 6                (SEI)Supplemental enhancement information sei_rbsp( )                           5
// 7                (SPS)Sequence parameter set seq_parameter_set_rbsp( )                           0
// 8                (PPS)Picture parameter set pic_parameter_set_rbsp( )                            1
// 9                (AUD)Access unit delimiter access_unit_delimiter_rbsp( )                        6
// 10               End of sequence end_of_seq_rbsp( )                                              7
// 11               End of stream end_of_stream_rbsp( )                                             8
// 12               Filler data filler_data_rbsp( )                                                 9
// 13..23           Reserved
// 24..31           Unspecified
*/

const enum NaluTypes {
    NON_IDR_SLICE = 0x01,
    DPA_SLICE = 0x02,
    DPB_SLICE = 0x03,
    DPC_SLICE = 0x04,
    IDR_SLICE = 0x05,
    SEI = 0x06,
    SPS = 0x07,
    PPS = 0x08,
    AUD = 0x09,
    END_SEQUENCE = 0x0a,
    END_STREAM = 0x0b
}

export default NaluTypes;
