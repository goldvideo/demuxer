/**
 * @file: demuxer-unit.js, created at Thursday, 26th September 2019 3:55:44 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
/* eslint-env jasmine */

import { TSDemux, MP4Demux, FLVDemux } from '../src/index';

describe('Demuxer Entry', () => {
    let demux_ts, demux_flv, demux_mp4;

    beforeEach(() => {
        demux_ts = new TSDemux();
        demux_mp4 = new MP4Demux();
        demux_flv = new FLVDemux();
    });

    // afterEach(async () => {});

    // afterAll(() => {});

    describe('push', () => {
        it('should instanceOf its class', async () => {
            expect(demux_ts).toBeInstanceOf(TSDemux);
            expect(demux_mp4).toBeInstanceOf(MP4Demux);
            expect(demux_flv).toBeInstanceOf(FLVDemux);
        });
    });
});
