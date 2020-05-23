/**
 * @file: mux-error-code.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * @readonly
 * @enum {Number}
 */
enum codes {
	WORKER_EXCEPTION = 0,
	WORKER_MSG_EXCEPTION,
	TS_SYNC_BYTE,
	FLV_HEAD_SIGNATURE,
	FLV_NOT_EXPECTED_ADJACENT_DATA
}

export default codes;
