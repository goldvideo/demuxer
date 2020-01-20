/**
 * @file: mixin.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * @description mixin utility.
 */
export default mixin;

/**
 * mixin(target, source)
 * @param target
 * @param source
 * @param force
 * @param deepStringMixin
 * @return {*}
 */
function mixin(target, source, force, deepStringMixin) {
	function hasProp(obj, prop) {
		return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	function eachProp(obj, func) {
		var prop;
		for (prop in obj) {
			if (hasProp(obj, prop)) {
				if (func(obj[prop], prop)) {
					break;
				}
			}
		}
	}

	if (source) {
		eachProp(source, (value, prop) => {
			if (force || !hasProp(target, prop)) {
				if (deepStringMixin && typeof value !== 'string' && typeof value !== 'boolean') {
					if (!target[prop]) {
						target[prop] = {};
					}
					mixin(target[prop], value, force, deepStringMixin);
				} else {
					target[prop] = value;
				}
			}
		});
	}

	return target;
}
