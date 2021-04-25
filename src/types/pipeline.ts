import { AACFrame } from '../codec/aac/aac';
import NALU from '../codec/avc/nalu';

// export interface PESStreamEmitData {
// 	pid: number;
// 	stream_type: StreamTypes;
// 	pcr_pid: number;
// 	pes: Pes;
// }

export interface AVCFrame extends Array<NALU> {
    keyframe?: boolean;
    duration?: number;
    dts?: number;
    pts?: number;
    byteLength?: number;
    naluCount?: number;
}

export interface GOP extends Array<AVCFrame> {
    trackId?: number;
    duration?: number;
    byteLength?: number;
    naluCount?: number;
}

export interface GOPVector extends Array<GOP> {
    type?: string;
    trackId?: number;
    duration?: number;
    byteLength?: number;
    naluCount?: number;
    frameLength?: number;
    firstDTS?: number;
    firstPTS?: number;
}

export interface AACFrameVector extends Array<AACFrame> {
    type?: string;
    trackId?: number;
    byteLength?: number;
    firstDTS?: number;
    firstPTS?: number;
    duration?: number;
}
