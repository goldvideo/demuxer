/**
 * @file: demux-unit.js, created at Monday, 23rd December 2019 1:50:31 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
/* eslint-env jasmine */

import { Pes } from '../../../src/m2t/structs/pes';

describe('M2T Pes Struct', () => {
    let pes;

    beforeEach(() => {});

    describe('pts & dts', () => {
        it('should be parse correct if 33bit is 1', () => {
            pes = new Pes(
                // The 9th digit is 37, 37 is "00100101", and the 5th bit of 37 is 1, which is the starting bit of PTS
                new Uint8Array([0, 0, 1, 192, 0, 172, 128, 128, 5, 37, 75, 161, 100, 99, 255, 241, 76, 128, 20, 159])
            );

            expect(pes.PTS).toEqual(2464690737);
            expect(pes.DTS).toEqual(2464690737);
        });
    });
});
