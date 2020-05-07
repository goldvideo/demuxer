/**
 * @file: mux-error-code.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * @readonly
 * @enum {Number}
 * @export
 */
let counter = 0;

export default {
	WORKER_EXCEPTION: counter++,
	WORKER_MSG_EXCEPTION: counter++,
	TS_SYNC_BYTE: counter++
};
