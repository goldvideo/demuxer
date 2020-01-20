import MultiMap from './multi-map';

/**
 * Creates a new EventManager.
 * An EventManager maintains a collection of "event bindings" between event targets and event listeners.
 */
export default class EventManager {
	constructor() {
		/**
		 * Maps an event type to an array of event bindings.
		 * @private {MultiMap}
		 */
		this._bindingMap = new MultiMap();
	}

	/**
	 * Detaches all event listeners.
	 * @override
	 */
	destroy() {
		this.removeAll();
		this._bindingMap = null;
	}

	/**
	 * Attaches an event listener to an event target.
	 * @param {EventTarget|Dispatcher} target The event target.
	 * @param {string} type The event type.
	 * @param {function} listener The event listener.
	 */
	on(target, type, listener) {
		if (!this._bindingMap) return;

		let binding = new EventManager._Binding(target, type, listener);
		this._bindingMap.push(type, binding);

		return this;
	}

	/**
	 * Attaches an event listener to an event target.
	 * The listener will be removed when the first instance of the event is fired.
	 * @param {EventTarget} target The event target.
	 * @param {string} type The event type.
	 * @param {function} listener The event listener.
	 */
	once(target, type, listener) {
		// Install a shim listener that will stop listening after the first event.
		this.on(
			target,
			type,
			function(event) {
				// Stop listening to this event.
				this.off(target, type);
				// Call the original listener.
				listener(event);
			}.bind(this)
		);
	}

	/**
	 * Detaches an event listener from an event target.
	 * @param {EventTarget} target The event target.
	 * @param {string} type The event type.
	 */
	off(target, type) {
		if (!this._bindingMap) return;

		let list = this._bindingMap.get(type) || [];

		for (let i = 0; i < list.length; ++i) {
			let binding = list[i];

			if (binding.target == target) {
				binding.off();
				this._bindingMap.remove(type, binding);
			}
		}
	}

	/**
	 * Detaches all event listeners from all targets.
	 */
	removeAll() {
		if (!this._bindingMap) return;

		let list = this._bindingMap.getAll();

		for (let i = 0; i < list.length; ++i) {
			list[i].off();
		}

		this._bindingMap.clear();
	}
}

/**
 * Creates a new _Binding and attaches the event listener to the event target.
 * @param {EventTarget} target The event target.
 * @param {string} type The event type.
 * @param {function} listener The event listener.
 * @constructor
 * @private
 */
EventManager._Binding = function(target, type, listener) {
	/** @type {EventTarget} */
	this.target = target;

	/** @type {string} */
	this.type = type;

	/** @type {function} */
	this.listener = listener;

	if (this.target.addEventListener) {
		this.target.addEventListener(type, listener, false);
	} else if (this.target.on) {
		this.target.on(type, listener, false);
	}
};

/**
 * Detaches the event listener from the event target.
 * This does nothing if the event listener is already detached.
 */
EventManager._Binding.prototype.off = function() {
	if (this.target.removeEventListener) {
		this.target.removeEventListener(this.type, this.listener, false);
	} else if (this.target.off) {
		this.target.off(this.type, this.listener, false);
	}

	this.target = null;
	this.listener = null;
};
