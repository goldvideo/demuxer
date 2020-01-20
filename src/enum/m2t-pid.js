/**
 * @file: m2t-pid.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * @overview Program and program element descriptors.
 * @see ISO/IEC 13818-1: Table 2-3 – PID table
 * @see DVB SI: 5.1.3 Coding of PID and table_id fields
 */

/**
 * @readonly
 * @enum {number}
 * @export
 */
export const PAT_PID = 0x0000;
export const CAT_PID = 0x0001;
export const TSDT_PID = 0x0002;
/* reserved 0x0003 to 0x000F */
export const SDT_PID = 0x0011;
