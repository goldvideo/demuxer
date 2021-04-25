/**
 * @file: psi.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * PSI(Program Specific Information)
 */
// import { HevcPPSProps, HevcSPSProps, HevcVPSProps } from '../codec/avc';
import { PATSection } from './structs/patSection';
import { PMTSection } from './structs/pmtSection';
// import { SDTSection } from './structs/sdtSection';
import { PAT_PID, CAT_PID, TSDT_PID, SDT_PID } from '../enum/m2t-pid';
// import { Context } from '../types/globals';
import { Packet } from './structs/packet';
// import StreamTypes from '../enum/stream-types';
import { StreamTypes } from '../enum/stream-types';
import { GOPVector, AACFrameVector } from './types/pipeline';

// const MAX_PIDS_PER_PROGRAM = 64;

type TrackType = 'video' | 'audio' | 'caption';

export interface Track {
    id: number;
    type: TrackType;
    stream_type: StreamTypes;
    duration: number;
    width?: number;
    height?: number;
    codec: string;
    realCodec?: string;
    firstDTS: number;
    firstPTS: number;

    // Video
    gops: GOPVector;
    profileIdc?: number;
    profileCompatibility?: number;
    levelIdc?: number;
    pixelRatio?: [number, number];
    timescale: number; // (in TS timescale = 90kHz)
    inputTimeScale?: number;
    sps: Array<Uint8Array>;
    pps: Array<Uint8Array>;
    vps: Array<Uint8Array>;
    // hevc_vps: HevcVPSProps;
    // hevc_sps: HevcSPSProps;
    // hevc_pps: HevcPPSProps;

    // Audio
    isAAC?: boolean;
    frames: AACFrameVector;
    sampleRate?: number;
    channelCount?: number;
    config?: any;
}

// class Metadata {
//     service_name: string;
//     service_provider: string;
// }

export class PSI {
    constructor() {
        // this.metadata = new Metadata();
        this.pat_table = [];
        this.pes_streams = [];
    }

    // private context: AVFormatContext;
    // private metadata: Metadata; // Specify by SDT Packet
    private pat_table: Array<M2TS.PATTableItem>; // Specify by PMT Packet
    private pes_streams: Array<M2TS.PSI_PES_Stream>; // Specify by PES stream

    /**
     * program PID
     */
    get currentProgramPID(): number {
        let _pmtIds = [];

        for (let i = 0; i < this.pat_table.length; i++) {
            _pmtIds.push(this.pat_table[i].pid);
        }

        return _pmtIds.length > 0 ? _pmtIds[0] : -1;
    }

    get tracks() {
        return this.pes_streams;
    }

    // get pmtTable() {
    //     return this.pat_table;
    // }

    /**
     * 目前对于PSI的信息，持久化保留在内存中
     * 对于同一个片子，HLS规范会规定只能有一个 PMT/PAT 表
     * 所以一部片子的PSI信息应该是保持不变的，换片子后PSI信息的销毁通过 mux 重新实例化产生新的信息，不需要调用reset
     * 有些 TS 文件在HLS切片器切割的时候，没有带上PAT/PMT等表，需要相邻 TS 给定的表信息
     */
    reset(): void {
        // this.metadata = new Metadata();
        this.pat_table.splice(0, this.pat_table.length);
        this.pes_streams.splice(0, this.pes_streams.length);
    }

    /**
     * @param packet
     */
    parse(packet: Packet): void {
        const self = this;

        // ISO13818-1: Table 2-3 – PID table
        if (PAT_PID === packet.PID) {
            /* PAT PID */
            this._parsePat(packet);
        } else if (CAT_PID === packet.PID) {
            /* CAT PID */
        } else if (TSDT_PID === packet.PID) {
            /* Transport Stream Description Table */
        } else if (0x0003 <= packet.PID && packet.PID <= 0x000f) {
            /* Reserved */
        } else if (SDT_PID === packet.PID) {
            /* Service Description Table */
            // this._parseSdt(packet);
        } else if (packet.PID === self.currentProgramPID) {
            /* PMT PID */
            this._parsePmt(packet);
        }
        // else if (this.findTrack(packet.PID)) {
        // 	/* Reserved */
        // } else {
        // 	logger.warn(`psi unknown packet PID ${packet.PID}`);
        // }
    }

    // findPmtProgram(PID) {
    // 	let program = null;
    //
    // 	for (let i = 0; i < this.pat_table.length; i++) {
    // 		if (this.pat_table[i].pid === PID) {
    // 			program = this.pat_table[i].id;
    // 			break;
    // 		}
    // 	}
    //
    // 	return program;
    // }

    /**
     * @param PID
     */
    findTrack(PID: number): Track {
        let program = null;
        let streams = this.pes_streams;

        for (let i = 0; i < streams.length; i++) {
            if (streams[i].id === PID) {
                program = streams[i];
                break;
            }
        }

        return program;
    }

    /**
     * Parse PAT Packet
     * @param pack
     */
    private _parsePat(pack: Packet): PATSection {
        let data: Uint8Array;

        if (pack.payload_unit_start_indicator) {
            // psi has pointer_field
            let pointer = pack.payload[0];

            data = pack.payload.subarray(pointer + 1);
        } else {
            data = pack.payload;
        }

        let pat = new PATSection(data);

        // https://tools.ietf.org/html/rfc8216#section-3.2
        // Transport Stream Segments MUST contain a single MPEG-2 Program;
        for (var i = 0; i < pat.pmtTable.length; i++) {
            this._add_pid_to_pmt(pat.pmtTable[i].programNum, pat.pmtTable[i].program_map_PID);
        }

        return pat;
    }

    /**
     * Associates Program Number and Program Map Table(PMT) PID
     * @param programId
     * @param pid
     */
    private _add_pid_to_pmt(programId: number, pid: number): void {
        let table = this.pat_table;

        function get_pmt(id: number) {
            for (let i = 0, item: M2TS.PATTableItem; i < table.length; i++) {
                item = table[i];
                if (item.id === id) {
                    return {
                        idx: i,
                        item
                    };
                }
            }
            return null;
        }

        let p = get_pmt(programId);
        if (!p) {
            table.push({
                id: programId,
                pid: pid
            });
        }
    }

    /**
     * Parse PMT Packet
     * @param pack
     */
    private _parsePmt(pack: Packet): PMTSection {
        let data: Uint8Array;

        if (pack.payload_unit_start_indicator) {
            // psi has pointer_field
            let pointer = pack.payload[0];

            data = pack.payload.subarray(pointer + 1);
        } else {
            data = pack.payload;
        }

        let pmt = new PMTSection(data);

        for (var i = 0; i < pmt.pes_table.length; i++) {
            this._add_pes_stream(pmt.pes_table[i]);
        }

        return pmt;
    }

    /**
     * @param stream
     * @param pmt
     */
    private _add_pes_stream(stream: M2TS.PESTableItem /*, pmt?: PMTSection*/): void {
        let streams = this.pes_streams;

        function get_program(id: number) {
            for (let i = 0, item: M2TS.PSI_PES_Stream; i < streams.length; i++) {
                item = streams[i];
                if (item.id === id) {
                    return {
                        idx: i,
                        item
                    };
                }
            }
            return null;
        }

        let p = get_program(stream.PID);
        if (!p) {
            streams.push({
                id: stream.PID,
                stream_type: stream.streamType,
                duration: 0,
                sps: [],
                pps: [],
                pixelRatio: [1, 1],
                timescale: 90000, // (in TS timescale = 90kHz)
                width: 0,
                height: 0
            });
        }
    }

    /**
     * Parse SDT Packet
     * @param pack
     */
    // private _parseSdt(pack: Packet): SDTSection {
    //     let data: Uint8Array;

    //     if (pack.payload_unit_start_indicator) {
    //         // psi has pointer_field
    //         let pointer = pack.payload[0];

    //         data = pack.payload.subarray(pointer + 1);
    //     } else {
    //         data = pack.payload;
    //     }

    //     let sdt = new SDTSection(data);

    //     if (sdt.service_table.length > 0) {
    //         this.metadata.service_name = sdt.service_table[0].name;
    //         this.metadata.service_provider = sdt.service_table[0].provider_name;
    //     }

    //     return sdt;
    // }
}
