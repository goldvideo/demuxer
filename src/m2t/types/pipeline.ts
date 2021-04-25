import { Pes } from '../structs/pes';
import { StreamTypes } from '../../enum/stream-types';

export * from '../../types/pipeline';

export interface PESStreamEmitData {
    pid: number;
    stream_type: StreamTypes;
    // pcr_pid: number;
    pes: Pes;
}
