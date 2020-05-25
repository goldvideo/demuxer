import EventEmitter from '../util/event-emitter';

export class Context extends EventEmitter {}

export type PushConf = Partial<{
    done: boolean;
    stubTime: number;
    offsetPos: number; // Represents the start byte of the pushed data relative to the entire file
}>;

export type GlobalOptions = Partial<{
    debug: boolean;
    decodeCodec: boolean;
    config: PushConf;
}>;

export interface IDemux {
    /**
     * Pipe the arrayBuffer to the demuxer.
     * @param buf
     * @param conf
     */
    push(buf: ArrayBuffer | Uint8Array, conf: PushConf): void;

    reset(): void;

    destroy(): void;
}
