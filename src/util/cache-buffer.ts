/**
 * @file: cache-buffer.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

import { isNumber } from './is';

/**
 * Cache Buffer util.
 * It's applicable for streaming data cutting and retaining the data,
 * the algorithm minimizes memory application as much as possible.
 */

export default class CacheBuffer {
	get byteLength(): number {
		if (!isNumber(this.byteLength_)) {
			let len = 0;

			for (let i = 0, item: Uint8Array; i < this.list_.length; i++) {
				item = this.list_[i];
				len += item.byteLength;
			}
			this.byteLength_ = len;
		}

		return this.byteLength_;
	}

	/**
	 * maybe return new allocated memory or original memory
	 */
	get bytes(): Uint8Array | null {
		const { bufferList } = this;
		let bytes = null;

		if (bufferList.length > 0) {
			if (bufferList.length === 0) {
				bytes = bufferList[0];
			} else {
				bytes = this.toNewBytes();
			}
		}

		return bytes;
	}

	get empty() {
		return this.list_.length === 0;
	}

	get bufferList() {
		return this.list_;
	}

	/**
	 * Used to cache calculations, reduce the number of CPU calculations.
	 * When internal data changes, the value needs to be cleared and recalculated.
	 */
	private byteLength_: number | null;

	private list_: Array<Uint8Array> = [];

	clear() {
		let len = this.list_.length;
		if (len > 0) {
			this.list_.splice(0, len);
		}
		this.byteLength_ = null;
	}

	toNewBytes(): Uint8Array | null {
		let bytes = null;
		let tryCount: number = 0;
		let maxTryCount: number = 50;

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

		for (let i = 0, offset = 0; i < this.list_.length; i++) {
			let payload = this.list_[i];

			bytes.set(payload, offset);
			offset += payload.byteLength;
		}

		return bytes;
	}

	append(newBuffer: Uint8Array | CacheBuffer): void {
		if (newBuffer instanceof CacheBuffer) {
			this.list_ = this.list_.concat(newBuffer.bufferList);
		} else {
			this.list_.push(newBuffer);
		}

		this.byteLength_ = null;
	}

	/**
	 * This function cuts a complete TypedArray from CacheBuffer and retains the remainder of CacheBuffer.
	 * The following points should be noted when using this function:
	 * 1. If the cut needs to return the cut-out part, the cut length should be as small as possible to reduce the errors in memory application.
	 * 2. If the cutting is only to preserve the remaining parts, the cutting size is within the total number of bytes, without considering memory applications.
	 * @param {number} fixedLength
	 * @param {boolean} [needCutResult] - If not, just retain the remaining parts after cutting.
	 */
	cut(fixedLength: number, needCutResult: boolean = true): Uint8Array {
		let chunk = null;

		if (fixedLength > 0 && !this.empty) {
			let list = this.list_;

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

			this.byteLength_ = null;
		}

		return chunk;
	}
}
