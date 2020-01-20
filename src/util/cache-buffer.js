/**
 * @file: cache-buffer.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * Cache Buffer util.
 * It's applicable for streaming data cutting and retaining the data,
 * the algorithm minimizes memory application as much as possible.
 */
class CacheBuffer {
	get byteLength() {
		if (this._byteLength === null) {
			let len = 0;

			for (let i = 0, item; i < this._list.length; i++) {
				item = this._list[i];
				len += item.byteLength;
			}
			this._byteLength = len;
		}

		return this._byteLength;
	}

	get empty() {
		return this._list.length === 0;
	}

	get bufferList() {
		return this._list;
	}

	constructor() {
		/**
		 * @type {Array.<Uint8Array>}
		 */
		this._list = [];

		/**
		 * Used to cache calculations, reduce the number of CPU calculations.
		 * When internal data changes, the value needs to be cleared and recalculated.
		 * @type {?number}
		 */
		this._byteLength = null;
	}

	clear() {
		let len = this._list.length;
		if (len > 0) {
			this._list.splice(0, len);
		}
		this._byteLength = null;
	}

	/**
	 * @returns {Uint8Array}
	 */
	toNewBytes() {
		let bytes = null;
		let tryCount = 0;
		let maxTryCount = 50;

		// The following retry strategies are provided for failed memory applications
		// In terms of a better strategy, a failed memory application retry should be
		// an asynchronous process, which does not return until the application succeeds.
		// But the original design of the library is synchronous.
		while (bytes === null) {
			try {
				tryCount++;
				bytes = new Uint8Array(this.byteLength);
			} catch (e) {
				if (tryCount > maxTryCount) {
					throw e;
				}
			}
		}

		for (let i = 0, offset = 0; i < this._list.length; i++) {
			let payload = this._list[i];

			bytes.set(payload, offset);
			offset += payload.byteLength;
		}

		return bytes;
	}

	/**
	 * @param {Uint8Array|CacheBuffer} newBuffer
	 */
	append(newBuffer) {
		if (newBuffer instanceof CacheBuffer) {
			this._list = this._list.concat(newBuffer.bufferList);
		} else {
			this._list.push(newBuffer);
		}

		this._byteLength = null;
	}

	/**
	 * This function cuts a complete TypedArray from CacheBuffer and retains the remainder of CacheBuffer.
	 * The following points should be noted when using this function:
	 * 1. If the cut needs to return the cut-out part, the cut length should be as small as possible to reduce the errors in memory application.
	 * 2. If the cutting is only to preserve the remaining parts, the cutting size is within the total number of bytes, without considering memory applications.
	 * @param {number} fixedLength
	 * @param {boolean} [needCutResult] - If not, just retain the remaining parts after cutting.
	 * @returns {?Uint8Array}
	 */
	cut(fixedLength, needCutResult = true) {
		let chunk = null;

		if (fixedLength > 0 && !this.empty) {
			let list = this._list;

			let offset = 0;
			let loopIndex = 0;

			while (list.length > 0) {
				let cur = list.shift();

				if (loopIndex === 0) {
					if (cur.byteLength >= fixedLength) {
						if (needCutResult) {
							// Here is the key point for optimize memory alloc
							chunk = cur.subarray(0, fixedLength);
						}

						if (cur.byteLength > fixedLength) {
							cur = cur.subarray(fixedLength);
							list.unshift(cur);
						}
						break;
					} else {
						if (needCutResult) {
							try {
								chunk = new Uint8Array(fixedLength);
							} catch (e) {
								throw `alloc_memory_error@ cache buffer: ${fixedLength} ${e.message}`;
							}

							chunk.set(cur, 0);
						}
						offset += cur.byteLength;
					}
				} else {
					let subLen = fixedLength - offset;

					if (cur.byteLength >= subLen) {
						if (needCutResult) {
							chunk.set(cur.subarray(0, subLen), offset);
						}

						cur = cur.subarray(subLen);

						if (cur.byteLength > 0) {
							list.unshift(cur);
						}

						break;
					} else {
						if (needCutResult) {
							chunk.set(cur, offset);
						}
						offset += cur.byteLength;
						break;
					}
				}

				loopIndex++;
			}

			this._byteLength = null;
		}

		return chunk;
	}

	// /**
	//  * Buffer selected from begin to end (end not included).
	//  * @param {number} offsetStart
	//  * @param {number} offsetEnd
	//  */
	// keep(offsetStart, offsetEnd = this.byteLength) {
	// 	if (offsetEnd > this.byteLength) {
	// 		offsetEnd = this.byteLength;
	// 	}

	// 	let keepLen = offsetEnd - offsetStart;

	// 	if (offsetStart > 0) {
	// 		this.cut(offsetStart);
	// 	}

	// 	if (!this.empty) {
	// 		if (keepLen > 0) {
	// 			let list = this._list;
	// 			let tmpLen = keepLen;

	// 			// loop from last -> first
	// 			for (let j = list.length - 1, item; j >= 0; ) {
	// 				item = list[j];

	// 				if (tmpLen < item.byteLength) {
	// 					list[j] = item.subarray(0, item.byteLength - tmpLen);
	// 					break;
	// 				} else {
	// 					tmpLen -= item.byteLength;
	// 					list.splice(j, 0);
	// 					j--;

	// 					if (tmpLen === 0) {
	// 						break;
	// 					}
	// 				}
	// 			}

	// 			this._byteLength = null;
	// 		} else {
	// 			this.clear();
	// 		}
	// 	}
	// }

	// readByte(offset) {
	// 	let val = 0;
	// 	let i = 0,
	// 		typedArray,
	// 		curByteOffset = 0,
	// 		curByteLength;

	// 	for (; i < this._list.length; i++) {
	// 		typedArray = this._list[i];
	// 		curByteLength = typedArray.byteLength;

	// 		if (offset < curByteOffset + curByteLength && offset >= curByteOffset) {
	// 			val = typedArray[offset - curByteOffset];
	// 			break;
	// 		}
	// 		curByteOffset += curByteLength;
	// 	}
	// 	return val;
	// }

	// readUint16(offset) {
	// 	return (this.readByte(offset) << 8) | this.readByte(offset + 1);
	// }
}

export default CacheBuffer;
