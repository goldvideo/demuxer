/**
 * @file: avc-config.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

import { SPSProps } from './sps';
import { PPSProps } from './pps';

/**
 * AVC Config Helper
 * Accord sps/pps, generate mimeType info.
 */
export default (sps: SPSProps, pps?: PPSProps) => {
    let profile_idc = sps.profile_idc;
    let profile_compatibility = sps.profile_compatibility;
    let level_idc = sps.level_idc;
    let codecString = 'avc1.';

    let arr = [profile_idc, profile_compatibility, level_idc];
    for (let j = 0; j < arr.length; j++) {
        let h = arr[j].toString(16);
        if (h.length < 2) {
            h = '0' + h;
        }
        codecString += h;
    }

    return {
        codec: codecString
    };
};
