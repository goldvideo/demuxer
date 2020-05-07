/**
 * @file: nalu.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

import DataViewReader from '../../util/dv';
import NaluTypes from '../../enum/nalu-types';
import discardEP3B from './ep3b';
import { decodeSPS, SPSProps } from './sps';
import { decodePPS, PPSProps } from './pps';
import { decodeSEI, SEIProps } from './sei';

/**
 * decode (AUD)Access unit delimiter
 * @param payload
 * @private
 */
function _decodeAUD(payload: Uint8Array): number {
	// var primary_pic_type_table = {
	//     0x084, // 2, 7
	//     0x0a5, // 0, 2, 5, 7
	//     0x0e7, // 0, 1, 2, 5, 6, 7
	//     0x210, // 4, 9
	//     0x318, // 3, 4, 8, 9
	//     0x294, // 2, 4, 7, 9
	//     0x3bd, // 0, 2, 3, 4, 5, 7, 8, 9
	//     0x3ff, // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
	// }

	return payload[0] >> 5;
}

export default class NALU extends DataViewReader {
	forbidden_zero_bit: number;
	ref_idc: number;
	unit_type: number;
	data: Uint8Array;
	rawData: Uint8Array;
	sps: SPSProps;
	pps: PPSProps;
	sei: SEIProps;
	primary_pic_type: number;
	pts?: number;
	dts?: number;

	constructor(buffer: Uint8Array) {
		super();

		this.forbidden_zero_bit = buffer[0] >> 7;

		// nalu priority.
		this.ref_idc = (buffer[0] >> 5) & 0x03;

		// specifies the type of RBSP data structure. see in mux-nalu-types.js
		this.unit_type = buffer[0] & 0x1f;

		this.data = discardEP3B(buffer.subarray(1));
		this.rawData = buffer;

		switch (this.unit_type) {
			case NaluTypes.NON_IDR_SLICE:
				break;
			case NaluTypes.DPA_SLICE:
			case NaluTypes.DPB_SLICE:
			case NaluTypes.DPC_SLICE:
				// TODO decode A/B/C Partition Slice.
				break;
			case NaluTypes.IDR_SLICE:
				// this.data = decodeSlice(this.data).data;
				break;
			case NaluTypes.SPS:
				this.sps = decodeSPS(this.data);
				break;
			case NaluTypes.PPS:
				this.pps = decodePPS(this.data);
				break;
			case NaluTypes.SEI:
				this.sei = decodeSEI(this.data);
				break;
			case NaluTypes.AUD:
				this.primary_pic_type = _decodeAUD(this.data);
				break;
		}
	}
}
