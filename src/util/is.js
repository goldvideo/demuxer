/**
 * @file: is.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = Object.prototype.toString;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
export function isObjectLike(value) {
	return !!value && typeof value == 'object';
}

export function isEmptyObject(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			return false;
		}
	}
	return JSON.stringify(obj) === JSON.stringify({});
}

/**
 * @param {string} [url]
 */
export function isHttps(url) {
	return /^https/gi.test(url || window.location.protocol);
}

/**
 * @param {*} num
 */
export function isNumber(num) {
	return typeof num === 'number' && !isNaN(num);
}

/**
 * @param {*} value
 */
export function isArrayBuffer(value) {
	return isObjectLike(value) && objectToString.call(value).toLowerCase() === '[object arraybuffer]';
}

/**
 * @param {*} value
 */
export function isUint8Array(value) {
	return isObjectLike(value) && objectToString.call(value).toLowerCase() === '[object uint8array]';
}
