/**
 * @file: stream.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * simple stream implementation.
 */

import EventEmitter from './event-emitter';

class Stream extends EventEmitter {
	constructor() {
		super();
	}

	/**
	 * connect to the next pipeline stream.
	 * @param destination
	 * @returns {*}
	 */
	pipe(destination) {
		this.on('reset', function() {
			destination.reset();
		});

		this.on('data', function(data) {
			destination.push(data);
		});

		this.on('done', function(flushSource) {
			destination.flush(flushSource);
		});

		return destination;
	}

	/**
	 * detaches the next pipeline stream previously attached.
	 */
	unpipe() {
		this.removeAllListeners('reset');
		this.removeAllListeners('data');
		this.removeAllListeners('done');

		return this;
	}

	/**
	 * push data to current pipeline.
	 * @param data
	 */
	push(data) {
		this.emit('data', data);
	}

	/**
	 * flush current pipeline.
	 * @param flushSource
	 */
	flush(flushSource) {
		this.emit('done', flushSource);
	}

	reset() {
		this.emit('reset');
	}
}

export default Stream;
