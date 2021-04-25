declare namespace M2TS {
    interface PATTableItem {
        id: number;
        pid: number;
    }

    interface PMTTableItem {
        programNum: number;
        program_map_PID: number;
    }

    interface PESTableItem {
        streamType: number;
        PID: number;
    }

    interface PSI_PES_Stream {
        id: number;
        stream_type: number;
        duration: number;
        sps: Array<Uint8Array>;
        pps: Array<Uint8Array>;
        pixelRatio: [number, number];
        timescale: number; // (in TS timescale = 90kHz)
        width: number;
        height: number;
    }

    interface SDTServiceItem {
        service_id: number;
        // EIT_schedule_flag: number;
        // EIT_present_following_flag: number;
        // running_status: number;
        // free_CA_mode: number;
        descriptors_loop_length: number;
        provider_name: string;
        name: string;
    }
}
