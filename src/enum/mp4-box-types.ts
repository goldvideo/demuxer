/**
 * @file: mp4-box-types.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * @overview Box Types for Mp4.
 */

/**
 * @enum {array}
 */
const BoxType = {
	avc1: [],
	avcC: [],
	btrt: [],
	dinf: [],
	dref: [],
	esds: [],
	ftyp: [],
	hdlr: [],
	mdat: [],
	mdhd: [],
	mdia: [],
	mfhd: [],
	minf: [],
	moof: [],
	moov: [],
	mp4a: [],
	'.mp3': [],
	mvex: [],
	mvhd: [],
	pasp: [],
	sdtp: [],
	stbl: [],
	stco: [],
	stsc: [],
	stsd: [],
	stsz: [],
	stts: [],
	tfdt: [],
	tfhd: [],
	traf: [],
	trak: [],
	trun: [],
	trex: [],
	tkhd: [],
	vmhd: [],
	smhd: []
};

let i;
for (i in BoxType) {
	if (BoxType.hasOwnProperty(i)) {
		BoxType[i] = [i.charCodeAt(0), i.charCodeAt(1), i.charCodeAt(2), i.charCodeAt(3)];
	}
}

export default BoxType;
