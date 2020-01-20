/**
 * @file: event-manager-unit.js, created at Monday, 23rd December 2019 9:50:50 am
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
/* eslint-env jasmine */

import EventManager from '../../src/util/event-manager';

describe('EventManager', () => {
	let eventManager;
	let event1;
	let event2;
	let target1;
	let target2;

	beforeEach(() => {
		eventManager = new EventManager();
		target1 = document.createElement('div');
		target2 = document.createElement('div');

		event1 = document.createEvent('Event');
		event1.initEvent('eventtype1', false, false);
		event2 = document.createEvent('Event');
		event2.initEvent('eventtype2', false, false);
	});

	afterEach(() => {
		eventManager.removeAll();
	});

	describe('listen', () => {
		it('listens for an event', () => {
			const listener = jasmine.createSpy('listener');

			eventManager.on(target1, 'eventtype1', listener);
			target1.dispatchEvent(event1);

			expect(listener).toHaveBeenCalled();
		});

		it('listens for an event from mutiple targets', () => {
			const listener1 = jasmine.createSpy('listener1');
			const listener2 = jasmine.createSpy('listener2');

			eventManager.on(target1, 'eventtype1', listener1);
			eventManager.on(target2, 'eventtype1', listener2);

			target1.dispatchEvent(event1);
			target2.dispatchEvent(event1);

			expect(listener1).toHaveBeenCalled();
			expect(listener2).toHaveBeenCalled();
		});

		it('listens for multiple events', () => {
			const listener1 = jasmine.createSpy('listener1');
			const listener2 = jasmine.createSpy('listener2');

			eventManager.on(target1, 'eventtype1', listener1);
			eventManager.on(target1, 'eventtype2', listener2);

			target1.dispatchEvent(event1);
			target1.dispatchEvent(event2);

			expect(listener1).toHaveBeenCalled();
			expect(listener2).toHaveBeenCalled();
		});

		it('listens for multiple events from mutiple targets', () => {
			const listener1 = jasmine.createSpy('listener1');
			const listener2 = jasmine.createSpy('listener2');

			eventManager.on(target1, 'eventtype1', listener1);
			eventManager.on(target2, 'eventtype2', listener2);

			target1.dispatchEvent(event1);
			target2.dispatchEvent(event2);

			expect(listener1).toHaveBeenCalled();
			expect(listener2).toHaveBeenCalled();
		});

		it('listens for an event with multiple listeners', () => {
			const listener1 = jasmine.createSpy('listener1');
			const listener2 = jasmine.createSpy('listener2');

			eventManager.on(target1, 'eventtype1', listener1);
			eventManager.on(target1, 'eventtype1', listener2);

			target1.dispatchEvent(event1);

			expect(listener1).toHaveBeenCalled();
			expect(listener2).toHaveBeenCalled();
		});
	});

	describe('listenOnce', () => {
		it('listens to an event only once', () => {
			const listener1 = jasmine.createSpy('listener1');

			eventManager.once(target1, 'eventtype1', listener1);

			target1.dispatchEvent(event1);
			expect(listener1).toHaveBeenCalled();
			listener1.calls.reset();

			target1.dispatchEvent(event1);
			expect(listener1).not.toHaveBeenCalled();
		});

		// TOFIX:
		// it('listens to an event with multiple listeners', () => {
		// 	const listener1 = jasmine.createSpy('listener1');
		// 	const listener2 = jasmine.createSpy('listener2');

		// 	eventManager.once(target1, 'eventtype1', listener1);
		// 	eventManager.once(target1, 'eventtype1', listener2);

		// 	target1.dispatchEvent(event1);

		// 	expect(listener1).toHaveBeenCalled();
		// 	expect(listener2).toHaveBeenCalled();
		// });
	});

	describe('off', () => {
		it('stops listening to an event', () => {
			const listener = jasmine.createSpy('listener');

			eventManager.on(target1, 'eventtype1', listener);
			eventManager.off(target1, 'eventtype1');

			target1.dispatchEvent(event1);

			expect(listener).not.toHaveBeenCalled();
		});

		it('ignores other targets when removing listeners', () => {
			const listener1 = jasmine.createSpy('listener1');
			const listener2 = jasmine.createSpy('listener2');

			eventManager.on(target1, 'eventtype1', listener1);
			eventManager.on(target2, 'eventtype1', listener2);
			eventManager.off(target2, 'eventtype1');

			target1.dispatchEvent(event1);

			expect(listener1).toHaveBeenCalled();
		});
	});

	describe('removeAll', () => {
		it('stops listening to multiple events', () => {
			const listener1 = jasmine.createSpy('listener1');
			const listener2 = jasmine.createSpy('listener2');

			eventManager.on(target1, 'eventtype1', listener1);
			eventManager.on(target1, 'eventtype2', listener2);

			eventManager.removeAll();

			target1.dispatchEvent(event1);
			target1.dispatchEvent(event2);

			expect(listener1).not.toHaveBeenCalled();
			expect(listener2).not.toHaveBeenCalled();
		});

		it('stops listening for an event with multiple listeners', () => {
			const listener1 = jasmine.createSpy('listener1');
			const listener2 = jasmine.createSpy('listener2');

			eventManager.on(target1, 'eventtype1', listener1);
			eventManager.on(target1, 'eventtype1', listener2);

			eventManager.removeAll();

			target1.dispatchEvent(event1);

			expect(listener1).not.toHaveBeenCalled();
			expect(listener2).not.toHaveBeenCalled();
		});
	});
});
