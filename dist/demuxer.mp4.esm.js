/**
 * @file= events.js, created at Monday, 23rd December 2019 3=47=23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
var Events;
(function (Events) {
    Events["ERROR"] = "ERROR";
    Events["INFO"] = "INFO";
    Events["DATA"] = "DATA";
    Events["DEMUX_DATA"] = "DEMUX_DATA";
    Events["DONE"] = "DONE";
})(Events || (Events = {}));

/**
 * @copyright https://github.com/nodejs/node/blob/master/lib/events.js
 */
/* eslint-disable */
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var objectCreate = Object.create || objectCreatePolyfill;
var objectKeys = Object.keys || objectKeysPolyfill;
var bind = Function.prototype.bind || functionBindPolyfill;
// By default Dispatchers will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
let defaultMaxListeners = 10;
class EventEmitter {
    constructor() {
        if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {
            this._events = objectCreate(null);
            this._eventsCount = 0;
        }
        this._maxListeners = this._maxListeners || undefined;
    }
    static listenerCount(emitter, type) {
        if (typeof emitter.listenerCount === 'function') {
            return emitter.listenerCount(type);
        }
        else {
            return listenerCount.call(emitter, type);
        }
    }
    // // Obviously not all Emitters should be limited to 10. This function allows
    // // that to be increased. Set to zero for unlimited.
    // setMaxListeners(n) {
    //     if (typeof n !== 'number' || n < 0 || isNaN(n))
    //         throw new TypeError('"n" argument must be a positive number');
    //     this._maxListeners = n;
    //     return this;
    // }
    //
    // getMaxListeners() {
    //     return $getMaxListeners(this);
    // }
    emit(type, ...rest) {
        var er, handler, len, args, i, events;
        var doError = type === 'error';
        events = this._events;
        if (events)
            doError = doError && events.error == null;
        else if (!doError)
            return false;
        // If there is no 'error' event listener then throw.
        if (doError) {
            if (arguments.length > 1)
                er = arguments[1];
            if (er instanceof Error) {
                throw er; // Unhandled 'error' event
            }
            else {
                // At least give some kind of context to the user
                var err = new Error('Unhandled "error" event. (' + er + ')');
                err['context'] = er;
                throw err;
            }
        }
        handler = events[type];
        if (!handler)
            return false;
        var isFn = typeof handler === 'function';
        len = arguments.length;
        switch (len) {
            // fast cases
            case 1:
                emitNone(handler, isFn, this);
                break;
            case 2:
                emitOne(handler, isFn, this, arguments[1]);
                break;
            case 3:
                emitTwo(handler, isFn, this, arguments[1], arguments[2]);
                break;
            case 4:
                emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
                break;
            // slower
            default:
                args = new Array(len - 1);
                for (i = 1; i < len; i++)
                    args[i - 1] = arguments[i];
                emitMany(handler, isFn, this, args);
        }
        return true;
    }
    on(type, listener) {
        return _addListener(this, type, listener);
    }
    once(type, listener) {
        if (typeof listener !== 'function')
            throw new TypeError('"listener" argument must be a function');
        this.on(type, _onceWrap(this, type, listener));
        return this;
    }
    off(type, listener) {
        return _removeListener.call(this, type, listener);
    }
    removeAllListeners(type) {
        var listeners, events, i;
        events = this._events;
        if (!events)
            return this;
        // not listening for off, no need to emit
        if (!events.off) {
            if (arguments.length === 0) {
                this._events = objectCreate(null);
                this._eventsCount = 0;
            }
            else if (events[type]) {
                if (--this._eventsCount === 0)
                    this._events = objectCreate(null);
                else
                    delete events[type];
            }
            return this;
        }
        // emit off for all listeners on all events
        if (arguments.length === 0) {
            var keys = objectKeys(events);
            var key;
            for (i = 0; i < keys.length; ++i) {
                key = keys[i];
                if (key === 'off')
                    continue;
                this.removeAllListeners(key);
            }
            this.removeAllListeners('off');
            this._events = objectCreate(null);
            this._eventsCount = 0;
            return this;
        }
        listeners = events[type];
        if (typeof listeners === 'function') {
            this.off(type, listeners);
        }
        else if (listeners) {
            // LIFO order
            for (i = listeners.length - 1; i >= 0; i--) {
                this.off(type, listeners[i]);
            }
        }
        return this;
    }
    listeners(type) {
        return _listeners(this, type, true);
    }
    rawListeners(type) {
        return _listeners(this, type, false);
    }
    listenerCount() {
        return EventEmitter.listenerCount.apply(this, arguments);
    }
}
let hasDefineProperty;
try {
    var o = {};
    if (Object.defineProperty)
        Object.defineProperty(o, 'x', { value: 0 });
    hasDefineProperty = o['x'] === 0;
}
catch (err) {
    hasDefineProperty = false;
}
if (hasDefineProperty) {
    Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
        enumerable: true,
        get: function () {
            return defaultMaxListeners;
        },
        set: function (arg) {
            // check whether the input is a positive number (whose value is zero or
            // greater and not a NaN).
            if (typeof arg !== 'number' || arg < 0 || arg !== arg)
                throw new TypeError('"defaultMaxListeners" must be a positive number');
            defaultMaxListeners = arg;
        }
    });
}
else {
    EventEmitter.defaultMaxListeners = defaultMaxListeners;
}
function $getMaxListeners(that) {
    if (that._maxListeners === undefined)
        return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
}
// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
    if (isFn)
        handler.call(self);
    else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i) {
            try {
                listeners[i].call(self);
            }
            catch (e) {
                console.error(e);
            }
        }
    }
}
function emitOne(handler, isFn, self, arg1) {
    if (isFn)
        handler.call(self, arg1);
    else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i) {
            try {
                listeners[i].call(self, arg1);
            }
            catch (e) {
                console.error(e);
            }
        }
    }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
    if (isFn)
        handler.call(self, arg1, arg2);
    else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i) {
            try {
                listeners[i].call(self, arg1, arg2);
            }
            catch (e) {
                console.error(e);
            }
        }
    }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
    if (isFn)
        handler.call(self, arg1, arg2, arg3);
    else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i) {
            try {
                listeners[i].call(self, arg1, arg2, arg3);
            }
            catch (e) {
                console.error(e);
            }
        }
    }
}
function emitMany(handler, isFn, self, args) {
    if (isFn)
        handler.apply(self, args);
    else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i) {
            try {
                listeners[i].apply(self, args);
            }
            catch (e) {
                console.error(e);
            }
        }
    }
}
function _addListener(target, type, listener) {
    var m;
    var events;
    var existing;
    if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
    events = target._events;
    if (!events) {
        events = target._events = objectCreate(null);
        target._eventsCount = 0;
    }
    else {
        // To avoid recursion in the case that type === "newListener"! Before
        // adding it to the listeners, first emit "newListener".
        if (events.newListener) {
            target.emit('newListener', type, listener['listener'] ? listener['listener'] : listener);
            // Re-assign `events` because a newListener handler could have caused the
            // this._events to be assigned to a new object
            events = target._events;
        }
        existing = events[type];
    }
    if (!existing) {
        // Optimize the case of one listener. Don't need the extra array object.
        existing = events[type] = listener;
        ++target._eventsCount;
    }
    else {
        if (typeof existing === 'function') {
            // Adding the second element, need to change to array.
            existing = events[type] = [existing, listener];
        }
        else {
            existing.push(listener);
        }
        // Check for listener leak
        if (!existing.warned) {
            m = $getMaxListeners(target);
            if (m && m > 0 && existing.length > m) {
                existing.warned = true;
                class CustomError extends Error {
                }
                let w = new CustomError('Possible Dispatcher memory leak detected. ' +
                    existing.length +
                    ' "' +
                    String(type) +
                    '" listeners ' +
                    'added. Use emitter.setMaxListeners() to ' +
                    'increase limit.');
                w.name = 'MaxListenersExceededWarning';
                w.emitter = target;
                w.type = type;
                w.count = existing.length;
                if (typeof console === 'object' && console.warn) {
                    console.warn('%s: %s', w.name, w.message);
                }
            }
        }
    }
    return target;
}
function _removeListener(type, listener) {
    var list, events, position, i, originalListener;
    if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
    events = this._events;
    if (!events)
        return this;
    list = events[type];
    if (!list)
        return this;
    if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
            this._events = objectCreate(null);
        else {
            delete events[type];
            if (events.off)
                this.emit('off', type, list.listener || listener);
        }
    }
    else if (typeof list !== 'function') {
        position = -1;
        for (i = list.length - 1; i >= 0; i--) {
            if (list[i] === listener || list[i].listener === listener) {
                originalListener = list[i].listener;
                position = i;
                break;
            }
        }
        if (position < 0)
            return this;
        if (position === 0)
            list.shift();
        else
            spliceOne(list, position);
        if (list.length === 1)
            events[type] = list[0];
        if (events.off)
            this.emit('off', type, originalListener || listener);
    }
    return this;
}
function onceWrapper() {
    if (!this.fired) {
        this.target.off(this.type, this.wrapFn);
        this.fired = true;
        switch (arguments.length) {
            case 0:
                return this.listener.call(this.target);
            case 1:
                return this.listener.call(this.target, arguments[0]);
            case 2:
                return this.listener.call(this.target, arguments[0], arguments[1]);
            case 3:
                return this.listener.call(this.target, arguments[0], arguments[1], arguments[2]);
            default:
                var args = new Array(arguments.length);
                for (var i = 0; i < args.length; ++i)
                    args[i] = arguments[i];
                this.listener.apply(this.target, args);
        }
    }
}
function _onceWrap(target, type, listener) {
    var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
    var wrapped = bind.call(onceWrapper, state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
}
function _listeners(target, type, unwrap) {
    var events = target._events;
    if (!events)
        return [];
    var evlistener = events[type];
    if (!evlistener)
        return [];
    if (typeof evlistener === 'function')
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];
    return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}
function listenerCount(type) {
    var events = this._events;
    if (events) {
        var evlistener = events[type];
        if (typeof evlistener === 'function') {
            return 1;
        }
        else if (evlistener) {
            return evlistener.length;
        }
    }
    return 0;
}
// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
    for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
        list[i] = list[k];
    list.pop();
}
function arrayClone(arr, n) {
    var copy = new Array(n);
    for (var i = 0; i < n; ++i)
        copy[i] = arr[i];
    return copy;
}
function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
    }
    return ret;
}
function objectCreatePolyfill(proto) {
    var F = function () { };
    F.prototype = proto;
    return new F();
}
function objectKeysPolyfill(obj) {
    for (var k in obj)
        if (Object.prototype.hasOwnProperty.call(obj, k)) ;
    return k;
}
function functionBindPolyfill(context) {
    var fn = this;
    return function () {
        return fn.apply(context, arguments);
    };
}

class Context extends EventEmitter {
}

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
function isObjectLike(value) {
    return !!value && typeof value == 'object';
}
/**
 * @param num
 */
function isNumber(num) {
    return typeof num === 'number' && !isNaN(num);
}
/**
 * @param value
 */
function isArrayBuffer(value) {
    return isObjectLike(value) && objectToString.call(value).toLowerCase() === '[object arraybuffer]';
}
/**
 * @param value
 */
function isUint8Array(value) {
    return isObjectLike(value) && objectToString.call(value).toLowerCase() === '[object uint8array]';
}

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
    constructor() {
        this.list_ = [];
    }
    get byteLength() {
        if (!isNumber(this.byteLength_)) {
            let len = 0;
            for (let i = 0, item; i < this.list_.length; i++) {
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
    get bytes() {
        const { bufferList } = this;
        let bytes = null;
        if (bufferList.length > 0) {
            if (bufferList.length === 0) {
                bytes = bufferList[0];
            }
            else {
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
    clear() {
        let len = this.list_.length;
        if (len > 0) {
            this.list_.splice(0, len);
        }
        this.byteLength_ = null;
    }
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
            }
            catch (e) {
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
    append(newBuffer) {
        if (newBuffer instanceof CacheBuffer) {
            this.list_ = this.list_.concat(newBuffer.bufferList);
        }
        else {
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
    cut(fixedLength, needCutResult = true) {
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
                    }
                    else {
                        if (needCutResult) {
                            try {
                                chunk = new Uint8Array(fixedLength);
                            }
                            catch (e) {
                                throw `alloc_memory_error@ cache buffer: ${fixedLength} ${e.message}`;
                            }
                            chunk.set(cur, 0);
                        }
                        offset += cur.byteLength;
                    }
                }
                else {
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
                    }
                    else {
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

/**
 * @fileOverview A simple multimap template.
 */
class MultiMap {
    constructor() {
        this.map_ = {};
    }
    /**
     * Add a key, value pair to the map.
     * @param key
     * @param value
     */
    push(key, value) {
        if (Object.prototype.hasOwnProperty.call(this.map_, key)) {
            this.map_[key].push(value);
        }
        else {
            this.map_[key] = [value];
        }
    }
    /**
     * Get a list of values by key.
     * @param key
     */
    get(key) {
        let list = this.map_[key];
        // slice() clones the list so that it and the map can each be modified
        // without affecting the other.
        return list ? list.slice() : null;
    }
    /**
     * Get a list of all values.
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
     * @param key
     * @param value
     */
    remove(key, value) {
        let list = this.map_[key];
        if (list) {
            for (let i = 0; i < list.length; ++i) {
                if (list[i] == value) {
                    list.splice(i, 1);
                    --i;
                }
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
     * @param callback
     */
    forEach(callback) {
        for (let key in this.map_) {
            callback(key, this.map_[key]);
        }
    }
}

/**
 * Creates a new Binding_ and attaches the event listener to the event target.
 */
class Binding_ {
    /**
     * @param target - The event target.
     * @param type - The event type.
     * @param listener - The event listener.
     */
    constructor(target, type, listener) {
        this.target = target;
        this.type = type;
        this.listener = listener;
        if (this.target.addEventListener) {
            this.target.addEventListener(type, listener, false);
        }
        else if (this.target.on) {
            this.target.on(type, listener, false);
        }
    }
    /**
     * Detaches the event listener from the event target.
     * This does nothing if the event listener is already detached.
     */
    off() {
        if (this.target.removeEventListener) {
            this.target.removeEventListener(this.type, this.listener, false);
        }
        else if (this.target.off) {
            this.target.off(this.type, this.listener, false);
        }
        this.target = null;
        this.listener = null;
    }
}
/**
 * Creates a new EventManager.
 * An EventManager maintains a collection of "event bindings" between event targets and event listeners.
 */
class EventManager {
    // static Binding_: Binding;
    constructor() {
        /**
         * Maps an event type to an array of event bindings.
         */
        this.bindingMap_ = new MultiMap();
    }
    /**
     * Detaches all event listeners.
     * @override
     */
    destroy() {
        this.removeAll();
        this.bindingMap_ = null;
    }
    /**
     * Attaches an event listener to an event target.
     * @param target - The event target.
     * @param type  - The event type.
     * @param listener  - The event listener.
     */
    on(target, type, listener) {
        if (!this.bindingMap_)
            return;
        let binding = new Binding_(target, type, listener);
        this.bindingMap_.push(type, binding);
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
        this.on(target, type, function (event) {
            // Stop listening to this event.
            this.off(target, type);
            // Call the original listener.
            listener(event);
        }.bind(this));
    }
    /**
     * Detaches an event listener from an event target.
     * @param {EventTarget} target The event target.
     * @param {string} type The event type.
     */
    off(target, type) {
        if (!this.bindingMap_)
            return;
        let list = this.bindingMap_.get(type) || [];
        for (let i = 0; i < list.length; ++i) {
            let binding = list[i];
            if (binding.target == target) {
                binding.off();
                this.bindingMap_.remove(type, binding);
            }
        }
    }
    /**
     * Detaches all event listeners from all targets.
     */
    removeAll() {
        if (!this.bindingMap_)
            return;
        let list = this.bindingMap_.getAll();
        for (let i = 0; i < list.length; ++i) {
            list[i].off();
        }
        this.bindingMap_.clear();
    }
}
// EventManager.Binding_ = Binding;

/**
 * @file: global.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
/**
 * @description provide global scope.
 */
let global;
// see https://stackoverflow.com/a/11237259/589493
if (typeof window === 'undefined') {
    /* eslint-disable-next-line no-undef */
    global = self;
}
else {
    global = window;
}
var global$1 = global;

/**
 * @file: logger.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
let console$1 = global$1.console;
const isWorker = typeof WorkerGlobalScope !== 'undefined' &&
    self instanceof WorkerGlobalScope &&
    typeof importScripts != 'undefined';
const prefix = '>>>';
class Logger extends EventEmitter {
    constructor() {
        super();
        this._enable = false;
    }
    get enable() {
        return this._enable;
    }
    set enable(value) {
        this._enable = value;
        this.MSG_NAME = '__log__';
    }
    log(...restArgs) {
        if (isWorker) {
            logger.emit(this.MSG_NAME, 'log', [...restArgs].join(''));
        }
        else {
            if (this._enable) {
                console$1.log.call(console$1, prefix, ...restArgs);
            }
        }
    }
    debug(...restArgs) {
        if (isWorker) {
            logger.emit(this.MSG_NAME, 'debug', [...restArgs].join(''));
        }
        else {
            if (this._enable && console$1.debug) {
                console$1.debug.call(console$1, prefix, ...restArgs);
            }
        }
    }
    assert(...restArgs) {
        if (this._enable && console$1.assert) {
            let condition = restArgs[0];
            let sliceArgs = Array.prototype.slice.call(restArgs, 1);
            sliceArgs.unshift(prefix);
            console$1.assert.call(console$1, condition, ...sliceArgs);
        }
    }
    warn(...restArgs) {
        if (isWorker) {
            logger.emit(this.MSG_NAME, 'warn', [...restArgs].join(''));
        }
        else {
            if (this._enable) {
                console$1.warn.call(console$1, prefix, ...restArgs);
            }
        }
    }
    error(...restArgs) {
        if (isWorker) {
            logger.emit(this.MSG_NAME, 'error', [...restArgs].join(''));
        }
        else {
            if (this._enable) {
                console$1.error.call(console$1, prefix, ...restArgs);
            }
        }
    }
}
let logger = new Logger();

/**
 * @file: stream.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
class Stream extends EventEmitter {
    constructor() {
        super();
    }
    /**
     * connect to the next pipeline stream.
     * @param destination
     */
    pipe(destination) {
        this.on('reset', function () {
            destination.reset();
        });
        this.on('data', function (data) {
            destination.push(data);
        });
        this.on('done', function (flushSource) {
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
    push(data, conf) {
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

/**
 * @file: demuxer.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
class DemuxFacade extends Stream {
    constructor(options = {}) {
        super();
        if (options.debug) {
            logger.enable = true;
        }
        this.ctx_ = new Context();
        this.options_ = options;
        this.cache_buffer_ = new CacheBuffer();
    }
    listenEndStream_() {
        this.eventManager_ = new EventManager();
        this.eventManager_
            .on(this.endStream, 'data', (data) => {
            this.emit(Events.DEMUX_DATA, data);
        })
            .on(this.endStream, 'done', (data) => {
            this.emit(Events.DONE, data);
        })
            .on(this.ctx_, 'error', (data) => {
            this.emit(Events.ERROR, data);
        });
    }
    /**
     * transfer data to Uint8Array
     * @param buf
     */
    constraintPushData_(buf) {
        let newBuf = null;
        if (!isArrayBuffer(buf) && !isUint8Array(buf)) {
            logger.error(`Data pushed is not an ArrayBuffer or Uint8Array: ${buf}`);
            return newBuf;
        }
        if (isArrayBuffer(buf)) {
            newBuf = new Uint8Array(buf);
        }
        else {
            newBuf = buf;
        }
        return newBuf;
    }
    reset() { }
    destroy() {
        this.unpipe();
        this.endStream.unpipe();
        this.eventManager_.removeAll();
    }
}

/**
 * @file: mp4-inspector.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
/* eslint-disable */
let /**
     * Returns the string representation of an ASCII encoded four byte buffer.
     * @param buffer - a four-byte buffer to translate
     * @return the corresponding string
     */ parseType = function (buffer) {
    let result = '';
    result += String.fromCharCode(buffer[0]);
    result += String.fromCharCode(buffer[1]);
    result += String.fromCharCode(buffer[2]);
    result += String.fromCharCode(buffer[3]);
    return result;
}, parseMp4Date = function (seconds) {
    return new Date(seconds * 1000 - 2082844800000);
}, parseSampleFlags = function (flags) {
    return {
        isLeading: (flags[0] & 0x0c) >>> 2,
        dependsOn: flags[0] & 0x03,
        isDependedOn: (flags[1] & 0xc0) >>> 6,
        hasRedundancy: (flags[1] & 0x30) >>> 4,
        paddingValue: (flags[1] & 0x0e) >>> 1,
        isNonSyncSample: flags[1] & 0x01,
        degradationPriority: (flags[2] << 8) | flags[3]
    };
}, // registry of handlers for individual mp4 box types
parse = {
    // codingname, not a first-class box type. stsd entries share the
    // same format as real boxes so the parsing infrastructure can be
    // shared
    avc1: function (data) {
        let view = new DataView(data.buffer, data.byteOffset, data.byteLength);
        return {
            dataReferenceIndex: view.getUint16(6),
            width: view.getUint16(24),
            height: view.getUint16(26),
            horizresolution: view.getUint16(28) + view.getUint16(30) / 16,
            vertresolution: view.getUint16(32) + view.getUint16(34) / 16,
            frameCount: view.getUint16(40),
            depth: view.getUint16(74),
            config: mp4toJSON(data.subarray(78, data.byteLength))
        };
    },
    avcC: function (data) {
        let view = new DataView(data.buffer, data.byteOffset, data.byteLength), result = {
            configurationVersion: data[0],
            avcProfileIndication: data[1],
            profileCompatibility: data[2],
            avcLevelIndication: data[3],
            lengthSizeMinusOne: data[4] & 0x03,
            sps: [],
            pps: []
        }, numOfSequenceParameterSets = data[5] & 0x1f, numOfPictureParameterSets, nalSize, offset, i;
        // iterate past any SPSs
        offset = 6;
        for (i = 0; i < numOfSequenceParameterSets; i++) {
            nalSize = view.getUint16(offset);
            offset += 2;
            result.sps.push(new Uint8Array(data.subarray(offset, offset + nalSize)));
            offset += nalSize;
        }
        // iterate past any PPSs
        numOfPictureParameterSets = data[offset];
        offset++;
        for (i = 0; i < numOfPictureParameterSets; i++) {
            nalSize = view.getUint16(offset);
            offset += 2;
            result.pps.push(new Uint8Array(data.subarray(offset, offset + nalSize)));
            offset += nalSize;
        }
        return result;
    },
    btrt: function (data) {
        let view = new DataView(data.buffer, data.byteOffset, data.byteLength);
        return {
            bufferSizeDB: view.getUint32(0),
            maxBitrate: view.getUint32(4),
            avgBitrate: view.getUint32(8)
        };
    },
    esds: function (data) {
        let view = new DataView(data.buffer, data.byteOffset, data.byteLength);
        return {
            version: data[0],
            flags: new Uint8Array(data.subarray(1, 4)),
            esId: (data[6] << 8) | data[7],
            streamPriority: data[8] & 0x1f,
            decoderConfig: {
                objectProfileIndication: data[11],
                streamType: (data[12] >>> 2) & 0x3f,
                bufferSize: (data[13] << 16) | (data[14] << 8) | data[15],
                maxBitrate: (data[16] << 24) | (data[17] << 16) | (data[18] << 8) | data[19],
                avgBitrate: (data[20] << 24) | (data[21] << 16) | (data[22] << 8) | data[23],
                decoderConfigDescriptor: {
                    tag: data[24],
                    length: data[25],
                    // audioObjectType: (data[26] >>> 3) & 0x1f,
                    // samplingFrequencyIndex: ((data[26] & 0x07) << 1) |
                    //   ((data[27] >>> 7) & 0x01),
                    // channelConfiguration: (data[27] >>> 3) & 0x0f,
                    // FIXME
                    audioObjectType: (data[35] >>> 3) & 0x1f,
                    samplingFrequencyIndex: ((data[35] & 0x07) << (8 + (data[36] & 0x80))) >> 7,
                    channelConfiguration: (data[36] & 0x78) >> 3
                }
            }
        };
    },
    ftyp: function (data) {
        let view = new DataView(data.buffer, data.byteOffset, data.byteLength), result = {
            majorBrand: parseType(data.subarray(0, 4)),
            minorVersion: view.getUint32(4),
            compatibleBrands: []
        }, i = 8;
        while (i < data.byteLength) {
            result.compatibleBrands.push(parseType(data.subarray(i, i + 4)));
            i += 4;
        }
        return result;
    },
    dinf: function (data) {
        return {
            boxes: mp4toJSON(data)
        };
    },
    dref: function (data) {
        return {
            version: data[0],
            flags: new Uint8Array(data.subarray(1, 4)),
            dataReferences: mp4toJSON(data.subarray(8))
        };
    },
    hdlr: function (data) {
        let view = new DataView(data.buffer, data.byteOffset, data.byteLength), result = {
            version: view.getUint8(0),
            flags: new Uint8Array(data.subarray(1, 4)),
            handlerType: parseType(data.subarray(8, 12)),
            name: ''
        }, i = 8;
        // parse out the name field
        for (i = 24; i < data.byteLength; i++) {
            if (data[i] === 0x00) {
                // the name field is null-terminated
                i++;
                break;
            }
            result.name += String.fromCharCode(data[i]);
        }
        // decode UTF-8 to javascript's internal representation
        // see http://ecmanaut.blogspot.com/2006/07/encoding-decoding-utf8-in-javascript.html
        result.name = decodeURIComponent(decodeURIComponent(result.name));
        return result;
    },
    // mdat: function(data) {
    // 	return {
    // 		byteLength: data.byteLength,
    // 		nals: nalParse(data),
    // 		realData: data
    // 	};
    // },
    mdhd: function (data) {
        let view = new DataView(data.buffer, data.byteOffset, data.byteLength), i = 4, language, result = {
            version: view.getUint8(0),
            flags: new Uint8Array(data.subarray(1, 4)),
            language: '',
            creationTime: new Date(),
            modificationTime: new Date(),
            timescale: 0,
            duration: 0
        };
        if (result.version === 1) {
            i += 4;
            result.creationTime = parseMp4Date(view.getUint32(i)); // truncating top 4 bytes
            i += 8;
            result.modificationTime = parseMp4Date(view.getUint32(i)); // truncating top 4 bytes
            i += 4;
            result.timescale = view.getUint32(i);
            i += 8;
            result.duration = view.getUint32(i); // truncating top 4 bytes
        }
        else {
            result.creationTime = parseMp4Date(view.getUint32(i));
            i += 4;
            result.modificationTime = parseMp4Date(view.getUint32(i));
            i += 4;
            result.timescale = view.getUint32(i);
            i += 4;
            result.duration = view.getUint32(i);
        }
        i += 4;
        // language is stored as an ISO-639-2/T code in an array of three 5-bit fields
        // each field is the packed difference between its ASCII value and 0x60
        language = view.getUint16(i);
        result.language += String.fromCharCode((language >> 10) + 0x60);
        result.language += String.fromCharCode(((language & 0x03c0) >> 5) + 0x60);
        result.language += String.fromCharCode((language & 0x1f) + 0x60);
        return result;
    },
    mdia: function (data) {
        return {
            boxes: mp4toJSON(data)
        };
    },
    mfhd: function (data) {
        return {
            version: data[0],
            flags: new Uint8Array(data.subarray(1, 4)),
            sequenceNumber: (data[4] << 24) | (data[5] << 16) | (data[6] << 8) | data[7]
        };
    },
    minf: function (data) {
        return {
            boxes: mp4toJSON(data)
        };
    },
    // codingname, not a first-class box type. stsd entries share the
    // same format as real boxes so the parsing infrastructure can be
    // shared
    mp4a: function (data) {
        let view = new DataView(data.buffer, data.byteOffset, data.byteLength), result = {
            // 6 bytes reserved
            dataReferenceIndex: view.getUint16(6),
            // 4 + 4 bytes reserved
            channelcount: view.getUint16(16),
            samplesize: view.getUint16(18),
            // 2 bytes pre_defined
            // 2 bytes reserved
            samplerate: view.getUint16(24) + view.getUint16(26) / 65536,
            streamDescriptor: undefined
        };
        // if there are more bytes to process, assume this is an ISO/IEC
        // 14496-14 MP4AudioSampleEntry and parse the ESDBox
        if (data.byteLength > 28) {
            result.streamDescriptor = mp4toJSON(data.subarray(28))[0];
        }
        return result;
    },
    moof: function (data) {
        return {
            boxes: mp4toJSON(data)
        };
    },
    moov: function (data) {
        return {
            boxes: mp4toJSON(data)
        };
    },
    mvex: function (data) {
        return {
            boxes: mp4toJSON(data)
        };
    },
    mvhd: function (data) {
        let view = new DataView(data.buffer, data.byteOffset, data.byteLength), i = 4, result = {
            version: view.getUint8(0),
            flags: new Uint8Array(data.subarray(1, 4)),
            creationTime: new Date(),
            modificationTime: new Date(),
            timescale: 0,
            duration: 0,
            rate: 0,
            volume: 0,
            matrix: new Uint32Array(0),
            nextTrackId: 0
        };
        if (result.version === 1) {
            i += 4;
            result.creationTime = parseMp4Date(view.getUint32(i)); // truncating top 4 bytes
            i += 8;
            result.modificationTime = parseMp4Date(view.getUint32(i)); // truncating top 4 bytes
            i += 4;
            result.timescale = view.getUint32(i);
            i += 8;
            result.duration = view.getUint32(i); // truncating top 4 bytes
        }
        else {
            result.creationTime = parseMp4Date(view.getUint32(i));
            i += 4;
            result.modificationTime = parseMp4Date(view.getUint32(i));
            i += 4;
            result.timescale = view.getUint32(i);
            i += 4;
            result.duration = view.getUint32(i);
        }
        i += 4;
        // convert fixed-point, base 16 back to a number
        result.rate = view.getUint16(i) + view.getUint16(i + 2) / 16;
        i += 4;
        result.volume = view.getUint8(i) + view.getUint8(i + 1) / 8;
        i += 2;
        i += 2;
        i += 2 * 4;
        result.matrix = new Uint32Array(data.subarray(i, i + 9 * 4));
        i += 9 * 4;
        i += 6 * 4;
        result.nextTrackId = view.getUint32(i);
        return result;
    },
    pdin: function (data) {
        let view = new DataView(data.buffer, data.byteOffset, data.byteLength);
        return {
            version: view.getUint8(0),
            flags: new Uint8Array(data.subarray(1, 4)),
            rate: view.getUint32(4),
            initialDelay: view.getUint32(8)
        };
    },
    sdtp: function (data) {
        let result = {
            version: data[0],
            flags: new Uint8Array(data.subarray(1, 4)),
            samples: []
        }, i;
        for (i = 4; i < data.byteLength; i++) {
            result.samples.push({
                dependsOn: (data[i] & 0x30) >> 4,
                isDependedOn: (data[i] & 0x0c) >> 2,
                hasRedundancy: data[i] & 0x03
            });
        }
        return result;
    },
    sidx: function (data) {
        let view = new DataView(data.buffer, data.byteOffset, data.byteLength), result = {
            version: data[0],
            flags: new Uint8Array(data.subarray(1, 4)),
            references: [],
            referenceId: view.getUint32(4),
            timescale: view.getUint32(8),
            earliestPresentationTime: view.getUint32(12),
            firstOffset: view.getUint32(16)
        }, referenceCount = view.getUint16(22), i;
        for (i = 24; referenceCount; i += 12, referenceCount--) {
            result.references.push({
                referenceType: (data[i] & 0x80) >>> 7,
                referencedSize: view.getUint32(i) & 0x7fffffff,
                subsegmentDuration: view.getUint32(i + 4),
                startsWithSap: !!(data[i + 8] & 0x80),
                sapType: (data[i + 8] & 0x70) >>> 4,
                sapDeltaTime: view.getUint32(i + 8) & 0x0fffffff
            });
        }
        return result;
    },
    stbl: function (data) {
        return {
            boxes: mp4toJSON(data)
        };
    },
    stco: function (data) {
        let view = new DataView(data.buffer, data.byteOffset, data.byteLength);
        let entryCount = view.getUint32(4);
        let result = {
            version: data[0],
            flags: new Uint8Array(data.subarray(1, 4)),
            entryCount: entryCount,
            chunkOffsets: []
        };
        for (let i = 8; entryCount; i += 4, entryCount--) {
            result.chunkOffsets.push(view.getUint32(i));
        }
        return result;
    },
    stsc: function (data) {
        let view = new DataView(data.buffer, data.byteOffset, data.byteLength), entryCount = view.getUint32(4), result = {
            version: data[0],
            flags: new Uint8Array(data.subarray(1, 4)),
            sampleToChunks: []
        }, i;
        for (i = 8; entryCount; i += 12, entryCount--) {
            result.sampleToChunks.push({
                firstChunk: view.getUint32(i),
                samplesPerChunk: view.getUint32(i + 4),
                sampleDescriptionIndex: view.getUint32(i + 8)
            });
        }
        return result;
    },
    stsd: function (data) {
        return {
            version: data[0],
            flags: new Uint8Array(data.subarray(1, 4)),
            boxes: mp4toJSON(data.subarray(8))
        };
    },
    stsz: function (data) {
        let view = new DataView(data.buffer, data.byteOffset, data.byteLength), result = {
            version: data[0],
            flags: new Uint8Array(data.subarray(1, 4)),
            sampleSize: view.getUint32(4),
            entries: []
        }, i;
        for (i = 12; i < data.byteLength; i += 4) {
            result.entries.push(view.getUint32(i));
        }
        return result;
    },
    stts: function (data) {
        let view = new DataView(data.buffer, data.byteOffset, data.byteLength), result = {
            version: data[0],
            flags: new Uint8Array(data.subarray(1, 4)),
            timeToSamples: []
        }, entryCount = view.getUint32(4), i;
        for (i = 8; entryCount; i += 8, entryCount--) {
            result.timeToSamples.push({
                sampleCount: view.getUint32(i),
                sampleDelta: view.getUint32(i + 4)
            });
        }
        return result;
    },
    styp: function (data) {
        return parse.ftyp(data);
    },
    tfdt: function (data) {
        return {
            version: data[0],
            flags: new Uint8Array(data.subarray(1, 4)),
            baseMediaDecodeTime: (data[4] << 24) | (data[5] << 16) | (data[6] << 8) | data[7]
        };
    },
    tfhd: function (data) {
        let view = new DataView(data.buffer, data.byteOffset, data.byteLength), result = {
            version: data[0],
            flags: new Uint8Array(data.subarray(1, 4)),
            trackId: view.getUint32(4)
        }, baseDataOffsetPresent = result.flags[2] & 0x01, sampleDescriptionIndexPresent = result.flags[2] & 0x02, defaultSampleDurationPresent = result.flags[2] & 0x08, defaultSampleSizePresent = result.flags[2] & 0x10, defaultSampleFlagsPresent = result.flags[2] & 0x20, i;
        i = 8;
        if (baseDataOffsetPresent) {
            i += 4; // truncate top 4 bytes
            result.baseDataOffset = view.getUint32(12);
            i += 4;
        }
        if (sampleDescriptionIndexPresent) {
            result.sampleDescriptionIndex = view.getUint32(i);
            i += 4;
        }
        if (defaultSampleDurationPresent) {
            result.defaultSampleDuration = view.getUint32(i);
            i += 4;
        }
        if (defaultSampleSizePresent) {
            result.defaultSampleSize = view.getUint32(i);
            i += 4;
        }
        if (defaultSampleFlagsPresent) {
            result.defaultSampleFlags = view.getUint32(i);
        }
        return result;
    },
    tkhd: function (data) {
        let view = new DataView(data.buffer, data.byteOffset, data.byteLength), i = 4, result = {
            version: view.getUint8(0),
            flags: new Uint8Array(data.subarray(1, 4)),
            creationTime: new Date(),
            modificationTime: new Date(),
            trackId: 0,
            duration: 0,
            layer: 0,
            alternateGroup: 0,
            volume: 0,
            width: 0,
            height: 0,
            matrix: new Uint32Array(0)
        };
        if (result.version === 1) {
            i += 4;
            result.creationTime = parseMp4Date(view.getUint32(i)); // truncating top 4 bytes
            i += 8;
            result.modificationTime = parseMp4Date(view.getUint32(i)); // truncating top 4 bytes
            i += 4;
            result.trackId = view.getUint32(i);
            i += 4;
            i += 8;
            result.duration = view.getUint32(i); // truncating top 4 bytes
        }
        else {
            result.creationTime = parseMp4Date(view.getUint32(i));
            i += 4;
            result.modificationTime = parseMp4Date(view.getUint32(i));
            i += 4;
            result.trackId = view.getUint32(i);
            i += 4;
            i += 4;
            result.duration = view.getUint32(i);
        }
        i += 4;
        i += 2 * 4;
        result.layer = view.getUint16(i);
        i += 2;
        result.alternateGroup = view.getUint16(i);
        i += 2;
        // convert fixed-point, base 16 back to a number
        result.volume = view.getUint8(i) + view.getUint8(i + 1) / 8;
        i += 2;
        i += 2;
        result.matrix = new Uint32Array(data.subarray(i, i + 9 * 4));
        i += 9 * 4;
        result.width = view.getUint16(i) + view.getUint16(i + 2) / 16;
        i += 4;
        result.height = view.getUint16(i) + view.getUint16(i + 2) / 16;
        return result;
    },
    traf: function (data) {
        return {
            boxes: mp4toJSON(data)
        };
    },
    trak: function (data) {
        return {
            boxes: mp4toJSON(data)
        };
    },
    trex: function (data) {
        let view = new DataView(data.buffer, data.byteOffset, data.byteLength);
        return {
            version: data[0],
            flags: new Uint8Array(data.subarray(1, 4)),
            trackId: view.getUint32(4),
            defaultSampleDescriptionIndex: view.getUint32(8),
            defaultSampleDuration: view.getUint32(12),
            defaultSampleSize: view.getUint32(16),
            sampleDependsOn: data[20] & 0x03,
            sampleIsDependedOn: (data[21] & 0xc0) >> 6,
            sampleHasRedundancy: (data[21] & 0x30) >> 4,
            samplePaddingValue: (data[21] & 0x0e) >> 1,
            sampleIsDifferenceSample: !!(data[21] & 0x01),
            sampleDegradationPriority: view.getUint16(22)
        };
    },
    trun: function (data) {
        let result = {
            version: data[0],
            flags: new Uint8Array(data.subarray(1, 4)),
            samples: []
        }, view = new DataView(data.buffer, data.byteOffset, data.byteLength), dataOffsetPresent = result.flags[2] & 0x01, firstSampleFlagsPresent = result.flags[2] & 0x04, sampleDurationPresent = result.flags[1] & 0x01, sampleSizePresent = result.flags[1] & 0x02, sampleFlagsPresent = result.flags[1] & 0x04, sampleCompositionTimeOffsetPresent = result.flags[1] & 0x08, sampleCount = view.getUint32(4), offset = 8, sample;
        if (dataOffsetPresent) {
            result.dataOffset = view.getUint32(offset);
            offset += 4;
        }
        if (firstSampleFlagsPresent && sampleCount) {
            sample = {
                flags: parseSampleFlags(data.subarray(offset, offset + 4))
            };
            offset += 4;
            if (sampleDurationPresent) {
                sample.duration = view.getUint32(offset);
                offset += 4;
            }
            if (sampleSizePresent) {
                sample.size = view.getUint32(offset);
                offset += 4;
            }
            if (sampleCompositionTimeOffsetPresent) {
                sample.compositionTimeOffset = view.getUint32(offset);
                offset += 4;
            }
            result.samples.push(sample);
            sampleCount--;
        }
        while (sampleCount--) {
            sample = {};
            if (sampleDurationPresent) {
                sample.duration = view.getUint32(offset);
                offset += 4;
            }
            if (sampleSizePresent) {
                sample.size = view.getUint32(offset);
                offset += 4;
            }
            if (sampleFlagsPresent) {
                sample.flags = parseSampleFlags(data.subarray(offset, offset + 4));
                offset += 4;
            }
            if (sampleCompositionTimeOffsetPresent) {
                sample.compositionTimeOffset = view.getUint32(offset);
                offset += 4;
            }
            result.samples.push(sample);
        }
        return result;
    },
    'url ': function (data) {
        return {
            version: data[0],
            flags: new Uint8Array(data.subarray(1, 4))
        };
    },
    vmhd: function (data) {
        //let view = new DataView(data.buffer, data.byteOffset, data.byteLength);
        return {
            version: data[0],
            flags: new Uint8Array(data.subarray(1, 4))
            //graphicsmode: view.getUint16(4),
            //opcolor: new Uint16Array([view.getUint16(6),
            //                          view.getUint16(8),
            //                          view.getUint16(10)])
        };
    }
};
/**
 * Return a javascript array of box objects parsed from an ISO base media file.
 * @param data - the binary data of the media to be inspected
 * @return a javascript array of potentially nested box objects
 */
let mp4toJSON = function (data) {
    let i = 0, result = [], view = new DataView(data.buffer, data.byteOffset, data.byteLength), size, type, end, box;
    while (i < data.byteLength) {
        // parse box data
        (size = view.getUint32(i)), (type = parseType(data.subarray(i + 4, i + 8)));
        end = size > 1 ? i + size : data.byteLength;
        // parse type-specific data
        box = (parse[type] ||
            function (data) {
                return {
                    data: data
                };
            })(data.subarray(i + 8, end));
        box.size = size;
        box.type = type;
        // store this box and move to the next
        result.push(box);
        i = end;
    }
    return result;
};
const MP4Inspect = {
    mp4toJSON: mp4toJSON
};

/**
 * @file: demux.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
/**
 * mp4.
 */
class MP4Demux extends DemuxFacade {
    constructor(options = {}) {
        super(options);
        super.listenEndStream_();
    }
    /**
     * This is end pipeline stream
     */
    get endStream() {
        return this;
    }
    /**
     * The MP4 data pushed into stream should be complete data.
     * @param buffer
     */
    push(buffer) {
        let newBuf = super.constraintPushData_(buffer);
        logger.log(`mp4 demux received ${newBuf.byteLength} bytes`);
        let result = MP4Inspect.mp4toJSON(newBuf);
        this.emit('data', result);
    }
}

export { Events, MP4Demux };
