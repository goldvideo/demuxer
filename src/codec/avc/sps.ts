/**
 * @file: sps.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

import ExpGolomb from '../../util/exp-golumb';

let bitOffset = 0;

export type SPSProps = {
    profile_idc: number;
    profile_compatibility: number;
    level_idc: number;
    sps_id: number;
    log2_max_frame_num_minus4: number;
    pic_order_cnt_type: number;
    log2_max_pic_order_cnt_lsb_minus4: number;

    width: number;
    height: number;

    pixelRatio: [number, number];
    payload: Uint8Array;

    video_format: number;

    fps: number;
    fixedFPS: boolean;
};

/**
 * 7.3.2.1.1.1 Scaling list syntax
 * @param scalingList
 * @param size
 */
function scaling_list(scalingList, size) {
    let lastScale = 8;
    let nextScale = 8;
    let delta_scale;

    for (var j = 0; j < size; j++) {
        if (nextScale != 0) {
            delta_scale = ExpGolomb.readUEV(scalingList, bitOffset);
            bitOffset += delta_scale.bitLength;

            nextScale = (lastScale + delta_scale.value + 256) % 256;
        }

        lastScale = scalingList[j];
    }
}

/**
 * decode (SPS)Sequence parameter set
 * @param payload
 */
export function decodeSPS(payload: Uint8Array): SPSProps {
    bitOffset = 0;

    let profile_idc = payload[0];
    let profile_compatibility = payload[1];
    let level_idc = payload[2];
    let golombBuffer = payload.subarray(3);
    let //separate_colour_plane_flag = 0,
        // qpprime_y_zero_transform_bypass_flag = 0,
        seq_scaling_matrix_present_flag = 0;
    let lmpoclmUEV;
    let //delta_pic_order_always_zero_flag = 0,
        ofnrpSEV,
        ofttbfSEV,
        nrfipoccUEV;
    let pixelRatio: [number, number] = [1, 1],
        pixelScale = 1;
    let video_format: number;
    let fps = 0,
        num_units_in_tick: number,
        time_scale: number,
        fixed_frame_rate_flag: boolean = true;

    // seq_parameter_set_id
    let spsUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
    bitOffset += spsUEV.bitLength;

    if (
        profile_idc == 100 ||
        profile_idc == 110 ||
        profile_idc == 122 ||
        profile_idc == 244 ||
        profile_idc == 44 ||
        profile_idc == 83 ||
        profile_idc == 86 ||
        profile_idc == 118 ||
        profile_idc == 128
    ) {
        // chroma_format_idc
        let chromaFIUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
        bitOffset += chromaFIUEV.bitLength;

        if (chromaFIUEV.value == 3) {
            // separate_colour_plane_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
            bitOffset += 1;
        }

        // bit_depth_luma_minus8
        let bitdlmUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
        bitOffset += bitdlmUEV.bitLength;

        // bit_depth_chroma_minus8
        let bitdcmUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
        bitOffset += bitdcmUEV.bitLength;

        // qpprime_y_zero_transform_bypass_flag
        // qpprime_y_zero_transform_bypass_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
        bitOffset += 1;

        // seq_scaling_matrix_present_flag
        seq_scaling_matrix_present_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
        bitOffset += 1;

        if (seq_scaling_matrix_present_flag) {
            for (let i = 0; i < (chromaFIUEV.value != 3 ? 8 : 12); i++) {
                let seq_scaling_list_present_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
                bitOffset += 1;

                if (seq_scaling_list_present_flag) {
                    if (i < 6) {
                        scaling_list(golombBuffer, 16);
                    } else {
                        scaling_list(golombBuffer, 64);
                    }
                }
            }
        }
    }

    // log2_max_frame_num_minus4
    let lmfnmUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
    bitOffset += lmfnmUEV.bitLength;

    // pic_order_cnt_type
    let poctUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
    let pic_order_cnt_type = poctUEV.value;
    bitOffset += poctUEV.bitLength;

    if (pic_order_cnt_type === 0) {
        // log2_max_pic_order_cnt_lsb_minus4
        lmpoclmUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
        bitOffset += lmpoclmUEV.bitLength;
    } else if (pic_order_cnt_type === 1) {
        // delta_pic_order_always_zero_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
        bitOffset += 1;

        // offset_for_non_ref_pic
        ofnrpSEV = ExpGolomb.readSEV(golombBuffer, bitOffset);
        bitOffset += ofnrpSEV.bitLength;

        // offset_for_top_to_bottom_field
        ofttbfSEV = ExpGolomb.readSEV(golombBuffer, bitOffset);
        bitOffset += ofttbfSEV.bitLength;

        // num_ref_frames_in_pic_order_cnt_cycle
        nrfipoccUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
        bitOffset += nrfipoccUEV.bitLength;

        // let offset_for_ref_frames = [];
        for (let i = 0, item; i < nrfipoccUEV.value; i++) {
            item = ExpGolomb.readSEV(golombBuffer, bitOffset);
            bitOffset += item.bitLength;

            // offset_for_ref_frames.push(item);
        }
    }

    // max_num_ref_frames
    // 指定参考帧队列可能达到的最大长度，解码器依照这个句法元素的值开辟存储区，这个存储区用于存放已解码的参考帧，
    // H.264 规定最多可用 16 个参考帧，本句法元素的值最大为 16。值得注意的是这个长度以帧为单位，如果在场模式下，应该相应地扩展一倍
    let mnrfUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
    bitOffset += mnrfUEV.bitLength;

    // gaps_in_frame_num_value_allowed_flag
    // let gaps_in_frame_num_value_allowed_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
    bitOffset += 1;

    // pic_width_in_mbs_minus1
    let picWidthUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
    bitOffset += picWidthUEV.bitLength;

    // pic_height_in_map_units_minus1
    let picHeightUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
    bitOffset += picHeightUEV.bitLength;

    // frame_mbs_only_flag
    // 本句法元素等于 1 时, 表示本序列中所有图像的编码模式都是帧编码；
    // 本句法元素等于 0 时, 表示本序列中图像的编码模式可能是帧，也可能是场或帧场自适应，某个图像具体是哪一种要由其他句法元素决定。
    let frame_mbs_only_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
    bitOffset += 1;

    if (!frame_mbs_only_flag) {
        // mb_adaptive_frame_field_flag (Unused, Unnecessary to read it.)
        // ExpGolomb.readBit(golombBuffer, bitOffset);
        bitOffset += 1;
    }

    // direct_8x8_inference_flag,  用于指明 B 片的直接 和 skip 模式下运动矢量的预测方法
    // let direct_8x8_inference_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
    bitOffset += 1;

    // frame_cropping_flag, 用于指明解码器是否要将图像裁剪后输出，如果是的话，后面紧跟着的四个句法元素分别指出左右、上下裁剪的宽度
    let frame_cropping_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
    bitOffset += 1;

    let cropLeft = 0,
        cropRight = 0,
        cropTop = 0,
        cropBottom = 0;
    if (frame_cropping_flag) {
        let fcloUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
        bitOffset += fcloUEV.bitLength;
        cropLeft = fcloUEV.value;

        let fcroUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
        bitOffset += fcroUEV.bitLength;
        cropRight = fcroUEV.value;

        let fctoUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
        bitOffset += fctoUEV.bitLength;
        cropTop = fctoUEV.value;

        let fcboUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
        bitOffset += fcboUEV.bitLength;
        cropBottom = fcboUEV.value;
    }

    // vui_parameters_present_flag
    let vui_parameters_present_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
    bitOffset += 1;

    if (vui_parameters_present_flag) {
        // Annex E, E.1.1 VUI parameters syntax
        // VUI 用以表征视频格式等额外信息
        // aspect_ratio, video_format

        let aspect_ratio_info_present_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
        bitOffset += 1;

        if (aspect_ratio_info_present_flag) {
            const aspectRatioIdc = ExpGolomb.readByte(golombBuffer, bitOffset);
            bitOffset += 8;

            switch (aspectRatioIdc) {
                case 1:
                    pixelRatio = [1, 1];
                    break;
                case 2:
                    pixelRatio = [12, 11];
                    break;
                case 3:
                    pixelRatio = [10, 11];
                    break;
                case 4:
                    pixelRatio = [16, 11];
                    break;
                case 5:
                    pixelRatio = [40, 33];
                    break;
                case 6:
                    pixelRatio = [24, 11];
                    break;
                case 7:
                    pixelRatio = [20, 11];
                    break;
                case 8:
                    pixelRatio = [32, 11];
                    break;
                case 9:
                    pixelRatio = [80, 33];
                    break;
                case 10:
                    pixelRatio = [18, 11];
                    break;
                case 11:
                    pixelRatio = [15, 11];
                    break;
                case 12:
                    pixelRatio = [64, 33];
                    break;
                case 13:
                    pixelRatio = [160, 99];
                    break;
                case 14:
                    pixelRatio = [4, 3];
                    break;
                case 15:
                    pixelRatio = [3, 2];
                    break;
                case 16:
                    pixelRatio = [2, 1];
                    break;
                case 255: {
                    let width0 = ExpGolomb.readByte(golombBuffer, bitOffset);
                    bitOffset += 8;
                    let width1 = ExpGolomb.readByte(golombBuffer, bitOffset);
                    bitOffset += 8;
                    let height0 = ExpGolomb.readByte(golombBuffer, bitOffset);
                    bitOffset += 8;
                    let height1 = ExpGolomb.readByte(golombBuffer, bitOffset);
                    bitOffset += 8;
                    pixelRatio = [(width0 << 8) | width1, (height0 << 8) | height1];
                    break;
                }
            }

            if (pixelRatio) {
                pixelScale = pixelRatio[0] / pixelRatio[1];
            }

            if (aspectRatioIdc === 255) {
                // sar_width
                bitOffset += 16;
                // sar_height
                bitOffset += 16;
            }
        }

        let overscan_info_present_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
        bitOffset += 1;

        if (overscan_info_present_flag) {
            bitOffset += 1;
            // overscan_appropriate_flag;
        }

        let video_signal_type_present_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
        bitOffset += 1;

        if (video_signal_type_present_flag) {
            /*
                Table E-2 – Meaning of video_format
                video_format    Meaning
                0               Component
                1               PAL
                2               NTSC
                3               SECAM
                4               MAC
                5               Unspecified video format
                6               Reserved
                7               Reserved
             */
            video_format = ExpGolomb.readBit(golombBuffer, bitOffset, 3);
            bitOffset += 3;

            // switch (video_format) {
            // }

            // let video_full_range_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
            bitOffset += 1;

            let colour_description_present_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
            bitOffset += 1;

            if (colour_description_present_flag) {
                // colour_primaries            u(8)
                // transfer_characteristics    u(8)
                // matrix_coefficients         u(8)
                bitOffset += 24;
            }
        }

        let chroma_loc_info_present_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
        bitOffset += 1;

        if (chroma_loc_info_present_flag) {
            let chroma_sample_loc_type_top_field = ExpGolomb.readUEV(golombBuffer, bitOffset);
            bitOffset += chroma_sample_loc_type_top_field.bitLength;

            let chroma_sample_loc_type_bottom_field = ExpGolomb.readUEV(golombBuffer, bitOffset);
            bitOffset += chroma_sample_loc_type_bottom_field.bitLength;
        }

        let timing_info_present_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
        bitOffset += 1;

        if (timing_info_present_flag) {
            num_units_in_tick = ExpGolomb.readBit(golombBuffer, bitOffset, 32);
            bitOffset += 32;

            time_scale = ExpGolomb.readBit(golombBuffer, bitOffset, 32);
            bitOffset += 32;

            fixed_frame_rate_flag = !!ExpGolomb.readBit(golombBuffer, bitOffset);
            bitOffset += 1;

            fps = time_scale / (num_units_in_tick * 2);
        }

        // There is left VUI other's parameters to be decoded ...
        // For now, it is useless, so don't pass them.
    }

    // let FrameHeightInMbs = (2 - frame_mbs_only_flag) * (picHeightUEV.value + 1);
    // PicSizeInMapUnits = PicWidthInMbs * PicHeightInMapUnits

    return {
        payload: golombBuffer,

        profile_idc,
        profile_compatibility,
        level_idc,
        sps_id: spsUEV.value, // ue(v)
        log2_max_frame_num_minus4: poctUEV.value, // ue(v)
        pic_order_cnt_type, // ue(v)
        log2_max_pic_order_cnt_lsb_minus4: lmpoclmUEV ? lmpoclmUEV.value : 0, // ue(v)

        width: Math.ceil(((picWidthUEV.value + 1) * 16 - cropLeft * 2 - cropRight * 2) * pixelScale), // PicWidthInSamplesL = PicWidthInMbs * 16
        height: (2 - frame_mbs_only_flag) * (picHeightUEV.value + 1) * 16 - cropTop * 2 - cropBottom * 2,

        pixelRatio,
        video_format,

        fps,
        fixedFPS: fixed_frame_rate_flag
    };
}
