/**
 * @file: created at Thursday, 14th May 2020 10:18:11 am
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * FLV Head Structure.
 */
import DataViewReader from '../../util/dv';

/**
 * @extends DataViewReader
 */
class FlvHead extends DataViewReader {
    signature: string;
    version: number;
    hasAudio: boolean;
    hasVideo: boolean;
    offset: number;

    /**
     * @param buffer
     */
    constructor(buffer: Uint8Array) {
        super();

        this.signature =
            String.fromCharCode(buffer[0]) + // F
            String.fromCharCode(buffer[1]) + // L
            String.fromCharCode(buffer[2]); //V

        this.version = buffer[3];
        this.hasAudio = (buffer[4] & 4) >>> 2 == 1;
        this.hasVideo = (buffer[4] & 1) == 1;
        this.offset = this.readUint32(buffer, 5);
    }

    valid(): boolean {
        return this.signature === 'FLV';
    }
}

export default FlvHead;
