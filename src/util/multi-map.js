/**
 * A simple multimap template.
 * @template T
 */
export default class MultiMap {
	constructor() {
		/** @private {!Object.<string, !Array.<T>>} */
		this.map_ = {};
	}

	/**
	 * Add a key, value pair to the map.
	 * @param {string} key
	 * @param {T} value
	 */
	push(key, value) {
		if (this.map_.hasOwnProperty(key)) {
			this.map_[key].push(value);
		} else {
			this.map_[key] = [value];
		}
	}

	/**
	 * Get a list of values by key.
	 * @param {string} key
	 * @return {Array.<T>} or null if no such key exists.
	 */
	get(key) {
		let list = this.map_[key];
		// slice() clones the list so that it and the map can each be modified
		// without affecting the other.
		return list ? list.slice() : null;
	}

	/**
	 * Get a list of all values.
	 * @return {!Array.<T>}
	 */
	getAll() {
		let list = [];
		for (let key in this.map_) {
			list.push.apply(list, this.map_[key]);
		}
		return list;
	}

	/**
	 * Remove a specific value, if it exists.
	 * @param {string} key
	 * @param {T} value
	 */
	remove(key, value) {
		let list = this.map_[key];
		if (!list) return;
		for (let i = 0; i < list.length; ++i) {
			if (list[i] == value) {
				list.splice(i, 1);
				--i;
			}
		}
	}

	/**
	 * Clear all keys and values from the multimap.
	 */
	clear() {
		this.map_ = {};
	}

	/**
	 * @param {function(string, !Array.<T>)} callback
	 */
	forEach(callback) {
		for (let key in this.map_) {
			callback(key, this.map_[key]);
		}
	}
}
