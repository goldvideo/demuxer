'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @file= events.js, created at Monday, 23rd December 2019 3=47=23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
(function (Events) {
    Events["ERROR"] = "ERROR";
    Events["INFO"] = "INFO";
    Events["DATA"] = "DATA";
    Events["DEMUX_DATA"] = "DEMUX_DATA";
    Events["DONE"] = "DONE";
})(exports.Events || (exports.Events = {}));

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
            this.emit(exports.Events.DEMUX_DATA, data);
        })
            .on(this.endStream, 'done', (data) => {
            this.emit(exports.Events.DONE, data);
        })
            .on(this.ctx_, 'error', (data) => {
            this.emit(exports.Events.ERROR, data);
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
 * @file: mux-error-code.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
/**
 * @readonly
 * @enum {Number}
 */
var codes;
(function (codes) {
    codes[codes["WORKER_EXCEPTION"] = 0] = "WORKER_EXCEPTION";
    codes[codes["WORKER_MSG_EXCEPTION"] = 1] = "WORKER_MSG_EXCEPTION";
    codes[codes["TS_SYNC_BYTE"] = 2] = "TS_SYNC_BYTE";
    codes[codes["FLV_HEAD_SIGNATURE"] = 3] = "FLV_HEAD_SIGNATURE";
    codes[codes["FLV_NOT_EXPECTED_ADJACENT_DATA"] = 4] = "FLV_NOT_EXPECTED_ADJACENT_DATA";
})(codes || (codes = {}));
var muxErrorCode = codes;

/**
 * @file: created at Wednesday, 13th May 2020 4:15:40 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
const HEAD_LEN = 9;
const MIN_BODY_LEN = 4;
const PREVIOUS_TAG_SIZE = 4;
const MIN_TAG_LEN = PREVIOUS_TAG_SIZE;
var FLVParseStage;
(function (FLVParseStage) {
    FLVParseStage[FLVParseStage["HEAD"] = 0] = "HEAD";
    FLVParseStage[FLVParseStage["BODY"] = 1] = "BODY";
})(FLVParseStage || (FLVParseStage = {}));

/**
 * @file: dv.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
/**
 * Bit buffer reader like DataView.
 */
function read(buf) {
    let byteOffset = 0;
    if (ArrayBuffer.isView(buf)) {
        byteOffset = buf.byteOffset;
        buf = buf.buffer;
    }
    return new DataView(buf, byteOffset);
}
class DataViewReader {
    constructor() { }
    /**
     * Gets an unsigned 8-bit integer (unsigned byte).
     * @param buffer
     * @param byteOffset    The offset, in byte, from the start of the view where to read the data.
     * @returns {number}    An unsigned 8-bit integer number.
     */
    readUint8(buffer, byteOffset) {
        return read(buffer).getUint8(byteOffset);
    }
    /**
     * Gets an unsigned 16-bit integer (unsigned long).
     * @param buffer
     * @param byteOffset     The offset, in byte, from the start of the view where to read the data.
     * @param littleEndian   Indicates whether the 16-bit int is stored in little- or big-endian format.
     * @returns {number}     An unsigned 16-bit integer number.
     */
    readUint16(buffer, byteOffset, littleEndian = false) {
        return read(buffer).getUint16(byteOffset, littleEndian);
    }
    /**
     * Gets an unsigned 32-bit integer (unsigned long).
     * @param buffer
     * @param byteOffset        The offset, in byte, from the start of the view where to read the data.
     * @param littleEndian      Indicates whether the 32-bit int is stored in little- or big-endian format.
     * @returns {number}        An unsigned 32-bit integer number.
     */
    readUint32(buffer, byteOffset, littleEndian = false) {
        return read(buffer).getUint32(byteOffset, littleEndian);
    }
}

/**
 * @file: created at Saturday, 23rd May 2020 11:46:18 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
var FlvTagTypes;
(function (FlvTagTypes) {
    FlvTagTypes[FlvTagTypes["SCRIPT_DATA"] = 18] = "SCRIPT_DATA";
    FlvTagTypes[FlvTagTypes["VIDEO"] = 9] = "VIDEO";
    FlvTagTypes[FlvTagTypes["AUDIO"] = 8] = "AUDIO";
})(FlvTagTypes || (FlvTagTypes = {}));
var FlvTagTypes$1 = FlvTagTypes;

/**
 * @file: tag.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
/**
 * @extends DataViewReader
 */
class FlvTag extends DataViewReader {
    /**
     * @param buffer
     */
    constructor(buffer) {
        super();
        this.tagType = buffer[0];
        this.dataSize = this.readUint32(buffer, 0) & 0x00ffffff;
        let timestamp = this.readUint32(buffer, 3) & 0x00ffffff; // the lower 24 bits of the timestamp
        let timestampExtended = buffer[7]; // This field represents the upper 8 bits of timestamp
        this.timestamp = (timestampExtended << 24) + timestamp;
        this.streamId = this.readUint32(buffer, 8) & 0x00ffffff; // Always 0
        this.payload = buffer.subarray(11, 11 + this.dataSize);
        this.previousTagSize = this.readUint32(buffer, 11 + this.dataSize);
        this.totalSize = this.previousTagSize + 4;
    }
    valid() {
        let { tagType, dataSize, previousTagSize } = this;
        return (previousTagSize === 11 + dataSize &&
            (tagType === FlvTagTypes$1.SCRIPT_DATA || tagType === FlvTagTypes$1.VIDEO || tagType === FlvTagTypes$1.AUDIO));
    }
}

/**
 * @file: elementary.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
class BodyStream extends Stream {
    constructor(ctx, flvCtx, options = {}) {
        super();
        this.ctx_ = ctx;
        this.flv_ = flvCtx;
        this.options_ = options;
        this.cache_buffer_ = new CacheBuffer();
    }
    /**
     * Push a body buffer
     */
    push(bodyBuffer) {
        const { ctx_, flv_, cache_buffer_ } = this;
        let buffer;
        cache_buffer_.append(bodyBuffer);
        if (flv_.pos === HEAD_LEN) {
            if (cache_buffer_.byteLength > PREVIOUS_TAG_SIZE + MIN_TAG_LEN) {
                // drop PreviousTagSize0
                cache_buffer_.cut(PREVIOUS_TAG_SIZE);
                flv_.pos += PREVIOUS_TAG_SIZE;
            }
        }
        while (cache_buffer_.byteLength > 0) {
            // buffer start with tag
            buffer = cache_buffer_.bytes;
            if (buffer.length >= MIN_TAG_LEN) {
                let tagHeadSize = 11; // 10 is tag header
                let tagPayloadSize = (buffer[1] << 16) + (buffer[2] << 8) + buffer[3];
                let previousTagSize = 4;
                let tagSize = tagHeadSize + tagPayloadSize + previousTagSize;
                if (buffer.length >= tagSize) {
                    let tagBuffer = cache_buffer_.cut(tagSize);
                    let tag = new FlvTag(tagBuffer);
                    if (tag.valid()) {
                        this.emit('data', tag);
                        flv_.pos += tag.totalSize;
                    }
                    else {
                        let errMsg = `Encounter invalid flv tag, tag_length(${tag.previousTagSize}), cache_length(${cache_buffer_.byteLength}), data(${tagBuffer})`;
                        logger.error(errMsg);
                        this.reset();
                        ctx_.emit('error', muxErrorCode.TS_SYNC_BYTE, errMsg);
                    }
                }
                else {
                    break;
                }
            }
            else {
                break;
            }
        }
    }
    reset() {
        const { cache_buffer_ } = this;
        cache_buffer_.clear();
        this.emit('reset');
    }
}

/**
 * @file: created at Sunday, 24th May 2020 2:21:46 am
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
function AMFdeSerialize(data) {
    let result = {};
    let item = parseData_(data);
    result[item.key] = item.value;
    return result;
}
function parseData_(source, isString = false) {
    let key = null, value = null, data = null;
    if (isString) {
        try {
            data = new Uint8Array(source.length + 1);
        }
        catch (e) {
            logger.error(`flv parseData failed: ${e.message}`);
        }
        data[0] = 2;
        data.set(source, 1, source.length);
    }
    else {
        data = source;
    }
    key = deSerialize_(data);
    if (isString) {
        key.valueLength -= 1;
    }
    let temp = source.subarray(key.valueLength, source.byteLength);
    value = deSerialize_(temp);
    return {
        key: key.value,
        value: value.value,
        valueLength: key.valueLength + value.valueLength
    };
}
function deSerialize_(data) {
    let result = {};
    let valueLength = 0;
    let a = new DataViewReader();
    switch (data[0]) {
        case 0:
            valueLength = 8;
            result.value = uint8ToDouble_(data.subarray(1, 9));
            result.valueLength = 1 + valueLength;
            break;
        case 1:
            valueLength = 1;
            result.value = data[1] !== 0;
            result.valueLength = 1 + valueLength;
            break;
        case 2:
            valueLength = (data[1] << 8) | data[2];
            result.value = uint8ToStr_(data.subarray(3, 3 + valueLength));
            result.valueLength = 1 + 2 + valueLength;
            break;
        case 3:
            valueLength = 1;
            result.value = {};
            while (data[valueLength] != 0x00 || data[valueLength + 1] != 0x00 || data[valueLength + 2] != 0x09) {
                let objData = data.subarray(valueLength, data.byteLength);
                let item = parseData_(objData, true);
                result.value[item.key] = item.value;
                valueLength += item.valueLength;
                objData = null;
            }
            valueLength += 3;
            result.valueLength = valueLength;
            break;
        case 4:
            valueLength = (data[1] << 8) | data[2];
            result.value = uint8ToStr_(data.subarray(3, 3 + valueLength));
            result.valueLength = 1 + 2 + valueLength;
            break;
        case 5:
            result.value = null;
            valueLength = 1;
            result.valueLength = valueLength;
            break;
        case 6:
            result.value = undefined;
            valueLength = 1;
            result.valueLength = valueLength;
            break;
        case 7:
            result.value = a.readUint16(data, 1);
            valueLength = 2 + 1;
            result.valueLength = valueLength;
            break;
        case 8:
            {
                let arrLength = (data[1] << 24) | (data[2] << 16) | (data[3] << 8) | data[4];
                valueLength = 1 + 4;
                result.value = {};
                for (let count = 0; count < arrLength; count++) {
                    let itemData = data.subarray(valueLength, data.byteLength);
                    let item2 = parseData_(itemData, true);
                    result.value[item2.key] = item2.value;
                    valueLength += item2.valueLength;
                }
                valueLength += 3;
                result.valueLength = valueLength;
            }
            break;
        case 9:
            break;
        case 10:
            {
                let arr = [];
                let arrLength2 = a.readUint32(data, 1);
                for (let i = 0; i < arrLength2; i++) {
                    let objData2 = data.subarray(i * 9 + 4 + 1, data.byteLength);
                    arr.push(deSerialize_(objData2).value);
                }
                result.value = arr;
                valueLength = arr.length * 9 + 4 + 1;
                result.valueLength = valueLength;
            }
            break;
        case 11:
            result.value = uint8ToDouble_(data.subarray(0, 8));
            valueLength = 8 + 1 + 2;
            result.valueLength = valueLength;
            break;
        case 12:
            valueLength = (data[1] << 24) | (data[2] << 16) | (data[3] << 8) | data[4];
            result.value = uint8ToStr_(data.subarray(5, 5 + valueLength));
            result.valueLength = 1 + 4 + valueLength;
            break;
        default:
            return null;
    }
    a = null;
    return result;
}
function uint8ToStr_(data) {
    return String.fromCharCode.apply(null, data);
}
function uint8ToDouble_(data) {
    let temp = new Uint8Array(data);
    let dv = new DataView(temp.buffer);
    let str = dv.getFloat64(0);
    dv = null;
    temp = null;
    return str;
}

/**
 * @file: created at Saturday, 9th May 2020 4:38:35 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
var AudioSoundFormat;
(function (AudioSoundFormat) {
    AudioSoundFormat[AudioSoundFormat["AAC"] = 10] = "AAC";
})(AudioSoundFormat || (AudioSoundFormat = {}));
var AudioSoundType;
(function (AudioSoundType) {
    AudioSoundType[AudioSoundType["MONO"] = 0] = "MONO";
    AudioSoundType[AudioSoundType["STEREO"] = 1] = "STEREO"; // For AAC: always 1
})(AudioSoundType || (AudioSoundType = {}));
class AVContext extends Stream {
    constructor() {
        super(...arguments);
        this.pos = 0; // parse byte position relative to flv first byte;
    }
}

/**
 * @file: created at Saturday, 9th May 2020 11:13:19 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
const AAC_SAMPLING_FREQUENCIES = [
    96000,
    88200,
    64000,
    48000,
    44100,
    32000,
    24000,
    22050,
    16000,
    12000,
    11025,
    8000,
    7350
];

/**
 * @file: created at Monday, 25th May 2020 12:36:52 am
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
// 0: AAC sequence header
// 1: AAC raw
var AACPacketType;
(function (AACPacketType) {
    AACPacketType[AACPacketType["SEQUENCE_HEAD"] = 0] = "SEQUENCE_HEAD";
    AACPacketType[AACPacketType["AAC_RAW"] = 1] = "AAC_RAW"; // 1 : One or more NALUs (Full frames are required)
})(AACPacketType || (AACPacketType = {}));
/**
 * ISO/IEC 14496-3 1.6.2.1 AudioSpecificConfig
 * @param buffer
 */
function parseAudioSpecificConfig(buffer) {
    let LOG = 'AudioSpecificConfig';
    // ISO/IEC 14496-3 Table 1.16 – Syntax of GetAudioObjectType()
    let audioObjectType = buffer[0] >> 3;
    if (audioObjectType == 31) {
        logger.error(`${LOG} unsupported audioObjectType`);
        // audioObjectType = 32 + audioObjectTypeExt;
    }
    let samplingFrequencyIndex = ((buffer[0] & 0x7) << 1) | (buffer[1] >> 7);
    if (samplingFrequencyIndex === 0xf) {
        logger.error(`${LOG} unsupported samplingFrequencyIndex`);
    }
    let channelConfiguration = (buffer[1] >> 3) & 0x0f;
    if (channelConfiguration < 0 || channelConfiguration >= 8) {
        logger.error('${LOG} unsupported channel configuration');
    }
    let sampleCount = ((buffer[1] >> 2) & 0x01) == 0 ? 1024 : 1024;
    let sampleRate = AAC_SAMPLING_FREQUENCIES[samplingFrequencyIndex];
    return {
        audioObjectType,
        samplingFrequencyIndex,
        channelConfiguration,
        sampleCount,
        sampleRate
    };
}
/**
 * @extends DataViewReader
 */
class AACAudioData extends DataViewReader {
    /**
     * @param buffer
     */
    constructor(buffer, timestamp) {
        super();
        this.dts = timestamp;
        this.pts = timestamp;
        this.aacPacketType = buffer[0];
        this.payload = buffer.subarray(1);
        if (this.aacPacketType === 0) {
            this.audioSpecificConfig = parseAudioSpecificConfig(this.payload);
        }
    }
}

/**
 * @file: created at Monday, 25th May 2020 2:51:52 am
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
// 0 = Linear PCM, platform endian
// 1 = ADPCM
// 2 = MP3
// 3 = Linear PCM, little endian
// 4 = Nellymoser 16-kHz mono
// 5 = Nellymoser 8-kHz mono
// 6 = Nellymoser
// 7 = G.711 A-law logarithmic PCM 8 = G.711 mu-law logarithmic PCM 9 = reserved
// 10 = AAC
// 11 = Speex
// 14 = MP3 8-Khz
// 15 = Device-specific sound
/**
 * @extends DataViewReader
 */
class FlvTagAudioData extends DataViewReader {
    /**
     * @param buffer
     */
    constructor(buffer, timestamp) {
        super();
        this.soundFormat = (buffer[0] & 0xf0) >> 4;
        this.soundRate = (buffer[0] & 0x0c) >> 2;
        let soundSize = (buffer[0] & 0x02) >> 1;
        switch (soundSize) {
            case 0:
                this.sampleSize = 8; // bit
                break;
            case 1:
                this.sampleSize = 16; // bit
                break;
        }
        this.soundType = buffer[0] & 1;
        switch (this.soundFormat) {
            case AudioSoundFormat.AAC:
                this.soundData = new AACAudioData(buffer.subarray(1), timestamp);
                break;
            default:
                logger.error(`flv tag audioData encounter unknown soundFormat ${this.soundFormat}`);
        }
    }
}

/**
 * @file: ep3b.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
/**
 * discard the emulation_prevention_three_byte
 * @param data
 */
function discardEP3B(data) {
    let length = data.byteLength, emulationPreventionBytesPositions = [], i = 1, newLength, newData = new Uint8Array(0);
    // Find all `Emulation Prevention Bytes`
    while (i < length - 2) {
        if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0x03) {
            emulationPreventionBytesPositions.push(i + 2);
            i += 2;
        }
        else {
            i++;
        }
    }
    // If no Emulation Prevention Bytes were found just return the original
    // array
    if (emulationPreventionBytesPositions.length === 0) {
        return data;
    }
    // Create a new array to hold the NAL unit data
    newLength = length - emulationPreventionBytesPositions.length;
    try {
        newData = new Uint8Array(newLength);
    }
    catch (e) {
        throw `epsb alloc mem error ${newLength}`;
    }
    let sourceIndex = 0;
    for (i = 0; i < newLength; sourceIndex++, i++) {
        if (sourceIndex === emulationPreventionBytesPositions[0]) {
            // Skip this byte
            sourceIndex++;
            // Remove this position index
            emulationPreventionBytesPositions.shift();
        }
        newData[i] = data[sourceIndex];
    }
    return newData;
}

/**
 * @file: exp-golumb.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
/**
 * exp golumb algorithm.
 * codeNum = 2leadingZeroBits – 1 + read_bits( leadingZeroBits )
 * @see https://en.wikipedia.org/wiki/Exponential-Golomb_coding
 */
/**
 * read n bit.
 * @param buffer
 * @param bitOffset
 * @param length
 * @private
 */
function readBit(buffer, bitOffset = 0, length = 1) {
    let startByte = 0;
    let startByteBitPos = 0;
    let val = 0;
    let bitStr = '', bitVal = 0;
    for (let j = bitOffset; j < bitOffset + length; j++) {
        startByte = Math.floor(j / 8);
        startByteBitPos = 7 - (j % 8);
        bitVal = (buffer[startByte] >> startByteBitPos) & 0x01;
        bitStr += bitVal;
    }
    val = parseInt(bitStr, 2);
    return val;
}
/**
 * read 1 byte.
 * @param buffer
 * @param bitOffset
 */
function readByte(buffer, bitOffset = 0) {
    return readBit(buffer, bitOffset, 8);
}
/**
 * Unsigned Integer Exp-Golomb Coded.
 * @param buffer
 * @param bitOffset
 */
function readUEV(buffer, bitOffset = 0) {
    let leadingZeros = [];
    let bitLength = buffer.byteLength * 8;
    let readBit1 = false;
    let startByte = 0;
    let startByteBitPos = 0;
    let bitVal = 0;
    let value = '';
    // 1. 计算 leadingZeros
    for (let i = bitOffset; i < bitLength; i++) {
        startByte = Math.floor(i / 8);
        startByteBitPos = 7 - (i % 8);
        bitVal = (buffer[startByte] >> startByteBitPos) & 0x01;
        if (!readBit1) {
            if (bitVal === 0) {
                leadingZeros.push(0);
            }
            else {
                readBit1 = true;
                bitOffset = i;
                break;
            }
        }
    }
    let codeNumLength = leadingZeros.length + 1;
    // 2. 计算有效位数值
    for (let j = bitOffset; j < bitOffset + codeNumLength; j++) {
        startByte = Math.floor(j / 8);
        startByteBitPos = 7 - (j % 8);
        bitVal = (buffer[startByte] >> startByteBitPos) & 0x01;
        value += bitVal;
    }
    return {
        bitLength: leadingZeros.length + codeNumLength,
        value: parseInt(value, 2) - 1
    };
}
/**
 * Signed Integer Exp-Golomb Coded.
 * @param buffer
 * @param bitOffset
 */
function readSEV(buffer, bitOffset = 0) {
    let uev = readUEV(buffer, bitOffset);
    let codeNum = uev.value;
    let signedValue = Math.pow(-1, codeNum + 1) * Math.ceil(codeNum / 2);
    return {
        bitLength: uev.bitLength,
        value: signedValue
    };
}
var ExpGolomb = {
    readUEV,
    readSEV,
    readBit,
    readByte
};

/**
 * @file: sps.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
let bitOffset = 0;
/**
 * 7.3.2.1.1.1 Scaling list syntax
 * @param scalingList
 * @param size
 */
function scaling_list(scalingList, size) {
    let lastScale = 8;
    let nextScale = 8;
    let delta_scale;
    for (var j = 0; j < size; j++) {
        if (nextScale != 0) {
            delta_scale = ExpGolomb.readUEV(scalingList, bitOffset);
            bitOffset += delta_scale.bitLength;
            nextScale = (lastScale + delta_scale.value + 256) % 256;
        }
        lastScale = scalingList[j];
    }
}
/**
 * decode (SPS)Sequence parameter set
 * @param payload
 */
function decodeSPS(payload) {
    bitOffset = 0;
    let profile_idc = payload[0];
    let profile_compatibility = payload[1];
    let level_idc = payload[2];
    let golombBuffer = payload.subarray(3);
    let //separate_colour_plane_flag = 0,
    // qpprime_y_zero_transform_bypass_flag = 0,
    seq_scaling_matrix_present_flag = 0;
    let lmpoclmUEV;
    let //delta_pic_order_always_zero_flag = 0,
    ofnrpSEV, ofttbfSEV, nrfipoccUEV;
    let pixelRatio = [1, 1], pixelScale = 1;
    let video_format;
    let fps = 0, num_units_in_tick, time_scale, fixed_frame_rate_flag = true;
    // seq_parameter_set_id
    let spsUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
    bitOffset += spsUEV.bitLength;
    if (profile_idc == 100 ||
        profile_idc == 110 ||
        profile_idc == 122 ||
        profile_idc == 244 ||
        profile_idc == 44 ||
        profile_idc == 83 ||
        profile_idc == 86 ||
        profile_idc == 118 ||
        profile_idc == 128) {
        // chroma_format_idc
        let chromaFIUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
        bitOffset += chromaFIUEV.bitLength;
        if (chromaFIUEV.value == 3) {
            // separate_colour_plane_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
            bitOffset += 1;
        }
        // bit_depth_luma_minus8
        let bitdlmUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
        bitOffset += bitdlmUEV.bitLength;
        // bit_depth_chroma_minus8
        let bitdcmUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
        bitOffset += bitdcmUEV.bitLength;
        // qpprime_y_zero_transform_bypass_flag
        // qpprime_y_zero_transform_bypass_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
        bitOffset += 1;
        // seq_scaling_matrix_present_flag
        seq_scaling_matrix_present_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
        bitOffset += 1;
        if (seq_scaling_matrix_present_flag) {
            for (let i = 0; i < (chromaFIUEV.value != 3 ? 8 : 12); i++) {
                let seq_scaling_list_present_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
                bitOffset += 1;
                if (seq_scaling_list_present_flag) {
                    if (i < 6) {
                        scaling_list(golombBuffer, 16);
                    }
                    else {
                        scaling_list(golombBuffer, 64);
                    }
                }
            }
        }
    }
    // log2_max_frame_num_minus4
    let lmfnmUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
    bitOffset += lmfnmUEV.bitLength;
    // pic_order_cnt_type
    let poctUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
    let pic_order_cnt_type = poctUEV.value;
    bitOffset += poctUEV.bitLength;
    if (pic_order_cnt_type === 0) {
        // log2_max_pic_order_cnt_lsb_minus4
        lmpoclmUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
        bitOffset += lmpoclmUEV.bitLength;
    }
    else if (pic_order_cnt_type === 1) {
        // delta_pic_order_always_zero_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
        bitOffset += 1;
        // offset_for_non_ref_pic
        ofnrpSEV = ExpGolomb.readSEV(golombBuffer, bitOffset);
        bitOffset += ofnrpSEV.bitLength;
        // offset_for_top_to_bottom_field
        ofttbfSEV = ExpGolomb.readSEV(golombBuffer, bitOffset);
        bitOffset += ofttbfSEV.bitLength;
        // num_ref_frames_in_pic_order_cnt_cycle
        nrfipoccUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
        bitOffset += nrfipoccUEV.bitLength;
        // let offset_for_ref_frames = [];
        for (let i = 0, item; i < nrfipoccUEV.value; i++) {
            item = ExpGolomb.readSEV(golombBuffer, bitOffset);
            bitOffset += item.bitLength;
            // offset_for_ref_frames.push(item);
        }
    }
    // max_num_ref_frames
    // 指定参考帧队列可能达到的最大长度，解码器依照这个句法元素的值开辟存储区，这个存储区用于存放已解码的参考帧，
    // H.264 规定最多可用 16 个参考帧，本句法元素的值最大为 16。值得注意的是这个长度以帧为单位，如果在场模式下，应该相应地扩展一倍
    let mnrfUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
    bitOffset += mnrfUEV.bitLength;
    // gaps_in_frame_num_value_allowed_flag
    // let gaps_in_frame_num_value_allowed_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
    bitOffset += 1;
    // pic_width_in_mbs_minus1
    let picWidthUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
    bitOffset += picWidthUEV.bitLength;
    // pic_height_in_map_units_minus1
    let picHeightUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
    bitOffset += picHeightUEV.bitLength;
    // frame_mbs_only_flag
    // 本句法元素等于 1 时, 表示本序列中所有图像的编码模式都是帧编码；
    // 本句法元素等于 0 时, 表示本序列中图像的编码模式可能是帧，也可能是场或帧场自适应，某个图像具体是哪一种要由其他句法元素决定。
    let frame_mbs_only_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
    bitOffset += 1;
    if (!frame_mbs_only_flag) {
        // mb_adaptive_frame_field_flag (Unused, Unnecessary to read it.)
        // ExpGolomb.readBit(golombBuffer, bitOffset);
        bitOffset += 1;
    }
    // direct_8x8_inference_flag,  用于指明 B 片的直接 和 skip 模式下运动矢量的预测方法
    // let direct_8x8_inference_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
    bitOffset += 1;
    // frame_cropping_flag, 用于指明解码器是否要将图像裁剪后输出，如果是的话，后面紧跟着的四个句法元素分别指出左右、上下裁剪的宽度
    let frame_cropping_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
    bitOffset += 1;
    let cropLeft = 0, cropRight = 0, cropTop = 0, cropBottom = 0;
    if (frame_cropping_flag) {
        let fcloUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
        bitOffset += fcloUEV.bitLength;
        cropLeft = fcloUEV.value;
        let fcroUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
        bitOffset += fcroUEV.bitLength;
        cropRight = fcroUEV.value;
        let fctoUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
        bitOffset += fctoUEV.bitLength;
        cropTop = fctoUEV.value;
        let fcboUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
        bitOffset += fcboUEV.bitLength;
        cropBottom = fcboUEV.value;
    }
    // vui_parameters_present_flag
    let vui_parameters_present_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
    bitOffset += 1;
    if (vui_parameters_present_flag) {
        // Annex E, E.1.1 VUI parameters syntax
        // VUI 用以表征视频格式等额外信息
        // aspect_ratio, video_format
        let aspect_ratio_info_present_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
        bitOffset += 1;
        if (aspect_ratio_info_present_flag) {
            const aspectRatioIdc = ExpGolomb.readByte(golombBuffer, bitOffset);
            bitOffset += 8;
            switch (aspectRatioIdc) {
                case 1:
                    pixelRatio = [1, 1];
                    break;
                case 2:
                    pixelRatio = [12, 11];
                    break;
                case 3:
                    pixelRatio = [10, 11];
                    break;
                case 4:
                    pixelRatio = [16, 11];
                    break;
                case 5:
                    pixelRatio = [40, 33];
                    break;
                case 6:
                    pixelRatio = [24, 11];
                    break;
                case 7:
                    pixelRatio = [20, 11];
                    break;
                case 8:
                    pixelRatio = [32, 11];
                    break;
                case 9:
                    pixelRatio = [80, 33];
                    break;
                case 10:
                    pixelRatio = [18, 11];
                    break;
                case 11:
                    pixelRatio = [15, 11];
                    break;
                case 12:
                    pixelRatio = [64, 33];
                    break;
                case 13:
                    pixelRatio = [160, 99];
                    break;
                case 14:
                    pixelRatio = [4, 3];
                    break;
                case 15:
                    pixelRatio = [3, 2];
                    break;
                case 16:
                    pixelRatio = [2, 1];
                    break;
                case 255: {
                    let width0 = ExpGolomb.readByte(golombBuffer, bitOffset);
                    bitOffset += 8;
                    let width1 = ExpGolomb.readByte(golombBuffer, bitOffset);
                    bitOffset += 8;
                    let height0 = ExpGolomb.readByte(golombBuffer, bitOffset);
                    bitOffset += 8;
                    let height1 = ExpGolomb.readByte(golombBuffer, bitOffset);
                    bitOffset += 8;
                    pixelRatio = [(width0 << 8) | width1, (height0 << 8) | height1];
                    break;
                }
            }
            if (pixelRatio) {
                pixelScale = pixelRatio[0] / pixelRatio[1];
            }
            if (aspectRatioIdc === 255) {
                // sar_width
                bitOffset += 16;
                // sar_height
                bitOffset += 16;
            }
        }
        let overscan_info_present_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
        bitOffset += 1;
        if (overscan_info_present_flag) {
            bitOffset += 1;
            // overscan_appropriate_flag;
        }
        let video_signal_type_present_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
        bitOffset += 1;
        if (video_signal_type_present_flag) {
            /*
                Table E-2 – Meaning of video_format
                video_format    Meaning
                0               Component
                1               PAL
                2               NTSC
                3               SECAM
                4               MAC
                5               Unspecified video format
                6               Reserved
                7               Reserved
             */
            video_format = ExpGolomb.readBit(golombBuffer, bitOffset, 3);
            bitOffset += 3;
            // switch (video_format) {
            // }
            // let video_full_range_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
            bitOffset += 1;
            let colour_description_present_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
            bitOffset += 1;
            if (colour_description_present_flag) {
                // colour_primaries            u(8)
                // transfer_characteristics    u(8)
                // matrix_coefficients         u(8)
                bitOffset += 24;
            }
        }
        let chroma_loc_info_present_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
        bitOffset += 1;
        if (chroma_loc_info_present_flag) {
            let chroma_sample_loc_type_top_field = ExpGolomb.readUEV(golombBuffer, bitOffset);
            bitOffset += chroma_sample_loc_type_top_field.bitLength;
            let chroma_sample_loc_type_bottom_field = ExpGolomb.readUEV(golombBuffer, bitOffset);
            bitOffset += chroma_sample_loc_type_bottom_field.bitLength;
        }
        let timing_info_present_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
        bitOffset += 1;
        if (timing_info_present_flag) {
            num_units_in_tick = ExpGolomb.readBit(golombBuffer, bitOffset, 32);
            bitOffset += 32;
            time_scale = ExpGolomb.readBit(golombBuffer, bitOffset, 32);
            bitOffset += 32;
            fixed_frame_rate_flag = !!ExpGolomb.readBit(golombBuffer, bitOffset);
            bitOffset += 1;
            fps = time_scale / (num_units_in_tick * 2);
        }
        // There is left VUI other's parameters to be decoded ...
        // For now, it is useless, so don't pass them.
    }
    // let FrameHeightInMbs = (2 - frame_mbs_only_flag) * (picHeightUEV.value + 1);
    // PicSizeInMapUnits = PicWidthInMbs * PicHeightInMapUnits
    return {
        payload: golombBuffer,
        profile_idc,
        profile_compatibility,
        level_idc,
        sps_id: spsUEV.value,
        log2_max_frame_num_minus4: poctUEV.value,
        pic_order_cnt_type,
        log2_max_pic_order_cnt_lsb_minus4: lmpoclmUEV ? lmpoclmUEV.value : 0,
        width: Math.ceil(((picWidthUEV.value + 1) * 16 - cropLeft * 2 - cropRight * 2) * pixelScale),
        height: (2 - frame_mbs_only_flag) * (picHeightUEV.value + 1) * 16 - cropTop * 2 - cropBottom * 2,
        pixelRatio,
        video_format,
        fps,
        fixedFPS: fixed_frame_rate_flag
    };
}

/**
 * @file: pps.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
/**
 * decode (PPS)Picture parameter set
 * @param payload
 */
function decodePPS(payload) {
    let bitOffset = 0;
    let golombBuffer = payload;
    let //slice_group_change_direction_flag = 0,
    sliceGroupIds = [];
    let sgcdfUEV, picSizeUEV;
    let i = 0;
    // pic_parameter_set_id
    let ppsUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
    bitOffset += ppsUEV.bitLength;
    // seq_parameter_set_id
    let spsUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
    bitOffset += spsUEV.bitLength;
    // entropy_coding_mode_flag
    // 0: Exp-Golomb coded, see subclause 9.1 or CAVLC, see subclause 9.2
    // 1: CABAC, see subclause 9.3
    // let entropy_coding_mode_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
    bitOffset += 1;
    // bottom_field_pic_order_in_frame_present_flag
    // let bottom_field_pic_order_in_frame_present_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
    bitOffset += 1;
    // num_slice_groups_minus1,
    let sliceGroupUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
    bitOffset += sliceGroupUEV.bitLength;
    if (sliceGroupUEV.value > 0) {
        // slice_group_map_type
        let sgmtUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
        bitOffset += sgmtUEV.bitLength;
        let iGroup = 0, itemUev;
        switch (sgmtUEV.value) {
            case 0:
                for (iGroup = 0; iGroup <= sgmtUEV.value; iGroup++) {
                    // run_length_minus1
                    itemUev = ExpGolomb.readUEV(golombBuffer, bitOffset);
                    bitOffset += itemUev.bitLength;
                }
                break;
            case 2:
                for (iGroup = 0; iGroup <= sgmtUEV.value; iGroup++) {
                    // top_left
                    itemUev = ExpGolomb.readUEV(golombBuffer, bitOffset);
                    bitOffset += itemUev.bitLength;
                    // bottom_right
                    itemUev = ExpGolomb.readUEV(golombBuffer, bitOffset);
                    bitOffset += itemUev.bitLength;
                }
                break;
            case 3:
            case 4:
            case 5:
                // slice_group_change_direction_flag
                // slice_group_change_direction_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
                bitOffset += 1;
                // slice_group_change_rate_minus1
                sgcdfUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
                bitOffset += sgcdfUEV.bitLength;
                break;
            case 6:
                {
                    // pic_size_in_map_units_minus1
                    picSizeUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
                    bitOffset += picSizeUEV.bitLength;
                    let length = Math.ceil(Math.log2(sliceGroupUEV.value + 1));
                    for (i = 0; i <= picSizeUEV.value; i++) {
                        // pic_size_in_map_units_minus1
                        sliceGroupIds.push(ExpGolomb.readBit(golombBuffer, bitOffset, length));
                        bitOffset += length;
                    }
                }
                break;
        }
    }
    // num_ref_idx_l0_default_active_minus1
    let nril0dcmUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
    bitOffset += nril0dcmUEV.bitLength;
    // num_ref_idx_l1_default_active_minus1
    let nril1dcmUEV = ExpGolomb.readUEV(golombBuffer, bitOffset);
    bitOffset += nril1dcmUEV.bitLength;
    // weighted_pred_flag
    // let weighted_pred_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
    bitOffset += 1;
    // weighted_bipred_idc
    // let weighted_bipred_idc = ExpGolomb.readBit(golombBuffer, bitOffset, 2);
    bitOffset += 1;
    // pic_init_qp_minus26
    let piqpSEV = ExpGolomb.readSEV(golombBuffer, bitOffset);
    bitOffset += piqpSEV.bitLength;
    // pic_init_qs_minus26
    let piqsSEV = ExpGolomb.readSEV(golombBuffer, bitOffset);
    bitOffset += piqsSEV.bitLength;
    // chroma_qp_index_offset
    let cqioSEV = ExpGolomb.readSEV(golombBuffer, bitOffset);
    bitOffset += cqioSEV.bitLength;
    // let deblocking_filter_control_present_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
    bitOffset += 1;
    // let constrained_intra_pred_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
    bitOffset += 1;
    // let redundant_pic_cnt_present_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
    bitOffset += 1;
    // if( more_rbsp_data( ) ) {
    //     // Unused data...
    // }
    return {
        sliceGroupNum: sliceGroupUEV.value + 1
    };
}

/**
 * @file: pps.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
/**
 * decode (SEI)Supplemental enhancement information
 * @param payload
 */
function decodeSEI(payload) {
    return {};
}

/**
 * @file: nalu.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
/**
 * decode (AUD)Access unit delimiter
 * @param payload
 * @private
 */
function _decodeAUD(payload) {
    // var primary_pic_type_table = {
    //     0x084, // 2, 7
    //     0x0a5, // 0, 2, 5, 7
    //     0x0e7, // 0, 1, 2, 5, 6, 7
    //     0x210, // 4, 9
    //     0x318, // 3, 4, 8, 9
    //     0x294, // 2, 4, 7, 9
    //     0x3bd, // 0, 2, 3, 4, 5, 7, 8, 9
    //     0x3ff, // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
    // }
    return payload[0] >> 5;
}
class NALU extends DataViewReader {
    constructor(buffer) {
        super();
        this.forbidden_zero_bit = buffer[0] >> 7;
        // nalu priority.
        this.ref_idc = (buffer[0] >> 5) & 0x03;
        // specifies the type of RBSP data structure. see in mux-nalu-types.js
        this.unit_type = buffer[0] & 0x1f;
        this.data = discardEP3B(buffer.subarray(1));
        this.rawData = buffer;
        switch (this.unit_type) {
            case 1 /* NON_IDR_SLICE */:
                break;
            case 2 /* DPA_SLICE */:
            case 3 /* DPB_SLICE */:
            case 4 /* DPC_SLICE */:
                // TODO decode A/B/C Partition Slice.
                break;
            case 5 /* IDR_SLICE */:
                // this.data = decodeSlice(this.data).data;
                break;
            case 7 /* SPS */:
                this.sps = decodeSPS(this.data);
                break;
            case 8 /* PPS */:
                this.pps = decodePPS(this.data);
                break;
            case 6 /* SEI */:
                this.sei = decodeSEI(this.data);
                break;
            case 9 /* AUD */:
                this.primary_pic_type = _decodeAUD(this.data);
                break;
        }
    }
}

/**
 * @file: avc.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
class AVCCodec extends EventEmitter {
    constructor() {
        super(...arguments);
        this.lastState = null;
        this.lastNALu = null;
        this.lastNALuState = null;
    }
    spitNalu_(bytes, pts, dts) {
        let nalu = new NALU(bytes);
        nalu.pts = pts;
        nalu.dts = dts;
        this.lastNALu = nalu;
        this.emit('nalu', nalu);
    }
    push(data) {
        const { lastState, lastNALuState } = this;
        let i = 0, lastNALuOffset = -1, { pts, dts, payload, naluSizeLength } = data;
        if (!naluSizeLength) {
            // Start parse Annex-B Byte stream format
            let j = payload.byteLength - 1;
            let dropZerosLength = 0;
            // Collect tailing zeros.
            // end with 0x000000 and more...
            do {
                if (payload[j] === 0x00) {
                    dropZerosLength++;
                }
                else {
                    break;
                }
                j--;
            } while (j > 0);
            if (dropZerosLength >= 3) {
                // drop tailing zeros.
                payload = payload.subarray(0, j + 1);
            }
            const len = payload.length;
            let state = 0;
            do {
                let value = payload[i++];
                // loop optimization.
                if (state === 0) {
                    state = value ? 0 : 1;
                    continue;
                }
                else if (state === 1) {
                    state = value ? 0 : 2;
                    continue;
                }
                // value will be 2 or 3
                if (!value) {
                    state = 3;
                }
                else if (value === 1) {
                    if (lastNALuOffset >= 0) {
                        this.lastNALuState = state;
                        this.spitNalu_(payload.subarray(lastNALuOffset, i - 1 - state), pts, dts);
                    }
                    else {
                        // naluOffset is undefined => this is the first start code found in this PES packet
                        // first check if start code delimiter is overlapping between 2 PES packets,
                        // ie it started in last packet (lastState not zero)
                        // and ended at the beginning of this PES packet (i <= 4 - lastState)
                        const lastUnit = this.lastNALu;
                        if (lastUnit) {
                            if (lastState && i <= 4 - lastState) {
                                // start delimiter overlapping between PES packets
                                // strip start delimiter bytes from the end of last NAL unit
                                // check if lastUnit had a state different from zero
                                if (lastNALuState) {
                                    // strip last bytes
                                    lastUnit.rawData = lastUnit.rawData.subarray(0, lastUnit.rawData.byteLength - lastState);
                                }
                            }
                            // If NAL units are not starting right at the
                            // beginning of the PES packet, push preceding data
                            // into previous NAL unit.
                            let overflow = i - state - 1;
                            if (overflow > 0) {
                                logger.log(`overflow NALU found: ${overflow}/${pts}/${dts}`);
                                let cb = new CacheBuffer();
                                cb.append(lastUnit.rawData);
                                cb.append(payload.subarray(0, overflow));
                                let bytes = cb.toNewBytes();
                                cb.clear(); // gc
                                lastUnit.rawData = bytes;
                            }
                        }
                    }
                    // reset state & record last unit start byte offset.
                    if (i < len) {
                        // console.log(`'find NALU @ offset: ${i}`);
                        lastNALuOffset = i;
                        state = 0;
                    }
                }
                else {
                    state = 0;
                }
            } while (i < len);
            if (lastNALuOffset >= 0 && state >= 0) {
                this.lastNALuState = state;
                this.spitNalu_(payload.subarray(lastNALuOffset, len), pts, dts);
            }
            this.lastState = state;
        }
        else {
            let startPos = 0, size = 0, endPos = 0, byteLength = payload.length;
            do {
                size = 0;
                for (let k = 0; k < naluSizeLength; k++) {
                    size = size | (payload[startPos + k] << ((naluSizeLength - k - 1) * 8));
                }
                // size = (data_byte[i] << 24) | (data_byte[i + 1] << 16) | (data_byte[i + 2] << 8) | data_byte[i + 3];
                startPos += naluSizeLength;
                endPos = startPos + size;
                if (endPos > byteLength) {
                    endPos = byteLength;
                }
                this.spitNalu_(payload.subarray(startPos, endPos), pts, dts);
                startPos = endPos;
            } while (startPos < byteLength);
        }
        this.emit('done');
    }
    reset() {
        this.lastState = null;
        this.lastNALu = null;
        this.lastNALuState = null;
    }
}

/**
 * @file: created at Monday, 25th May 2020 12:36:52 am
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
// 0 : AVCDecoderConfigurationRecord（AVC sequence header）
// 1 : One or more NALUs (Full frames are required)
// 2 : AVC end of sequence
var AVCPacketTypes;
(function (AVCPacketTypes) {
    AVCPacketTypes[AVCPacketTypes["SEQUENCE_HEAD"] = 0] = "SEQUENCE_HEAD";
    AVCPacketTypes[AVCPacketTypes["NALU"] = 1] = "NALU";
    AVCPacketTypes[AVCPacketTypes["SEQUENCE_END"] = 2] = "SEQUENCE_END"; // 2 : AVC end of sequence
})(AVCPacketTypes || (AVCPacketTypes = {}));
/**
 * ISO/IEC 14496-15  5.2.4.1.1 Syntax
 * @param data
 */
function parseAVCDecoderConfigurationRecord(data) {
    let version = data[0];
    let profile = data[1];
    let profileCompatibility = data[2];
    let level = data[3];
    let naluSizeLength = 1 + (data[4] & 0x03);
    let ppsNalus = [], spsNalus = [];
    let pos = 5;
    let numOfSPS = data[pos] & 0x1f;
    if (numOfSPS === 0) {
        logger.error(`Flv: Invalid AVCDecoderConfigurationRecord: No SPS`);
    }
    else if (numOfSPS > 0) {
        if (numOfSPS > 1) {
            logger.warn(`Flv: Strange AVCDecoderConfigurationRecord: SPS Count = ${numOfSPS}`);
        }
        pos++;
        for (let i = 0; i < numOfSPS; i++) {
            let spsDataLength = (data[pos] << 8) | data[pos + 1];
            pos += 2;
            spsNalus.push(data.subarray(pos, pos + spsDataLength));
            pos += spsDataLength;
        }
    }
    let numOfPPS = data[pos];
    if (numOfPPS === 0) {
        logger.error(`Flv: Invalid AVCDecoderConfigurationRecord: No PPS`);
    }
    else if (numOfPPS > 0) {
        if (numOfPPS > 1) {
            logger.warn(`Flv: Strange AVCDecoderConfigurationRecord: PPS Count = ${numOfPPS}`);
        }
        pos++;
        for (let i = 0; i < numOfPPS; i++) {
            let ppsDataLength = (data[pos] << 8) | data[pos + 1];
            pos += 2;
            ppsNalus.push(data.subarray(pos, pos + ppsDataLength));
            pos += ppsDataLength;
        }
    }
    return {
        version,
        profile,
        profileCompatibility,
        level,
        naluSizeLength,
        spsNalus,
        ppsNalus
    };
}
const avcCodec = new AVCCodec();
const naluList_ = [];
avcCodec.on('nalu', (nalu) => {
    naluList_.push(nalu);
});
/**
 * @extends DataViewReader
 */
class AVCVideoPacket extends DataViewReader {
    /**
     * @param buffer
     */
    constructor(pipeCtx, buffer, timestamp) {
        super();
        const { flv, options } = pipeCtx;
        this.avcPacketType = buffer[0];
        if (this.avcPacketType === 1) {
            let cts_uint32 = this.readUint32(buffer, 0) & 0x00ffffff;
            this.cts = (cts_uint32 << 8) >> 8; // convert to 24-bit signed int
        }
        else {
            this.cts = 0;
        }
        this.dts = timestamp;
        this.pts = this.dts + this.cts;
        this.payload = buffer.subarray(4);
        if (this.avcPacketType === 0) {
            this.decoderConfigurationRecord = parseAVCDecoderConfigurationRecord(this.payload);
            flv.decoderConfigurationRecord = this.decoderConfigurationRecord;
        }
        else {
            if (options.decodeCodec) {
                this.naluList = [];
                let raw = {
                    pts: this.pts,
                    dts: this.dts,
                    payload: this.payload
                };
                if (!this.decoderConfigurationRecord) {
                    if (flv.decoderConfigurationRecord) {
                        raw.naluSizeLength = flv.decoderConfigurationRecord.naluSizeLength;
                    }
                    avcCodec.push(raw);
                    // Clone nalu to videoData
                    for (let i = 0; i < naluList_.length; i++) {
                        this.naluList.push(naluList_[i]);
                    }
                    // empty cache
                    naluList_.splice(0, naluList_.length);
                }
            }
        }
    }
}

/**
 * @file: tag.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
// If CodecID == 2 H263VIDEOPACKET
// If CodecID == 3 SCREENVIDEOPACKET
// If CodecID == 4 VP6FLVVIDEOPACKET
// If CodecID == 5 VP6FLVALPHAVIDEOPACKET
// If CodecID == 6 SCREENV2VIDEOPACKET
// if CodecID == 7 AVCVIDEOPACKET
// Video frame payload or UI8 (see note following table)
var VideoCodecIDs;
(function (VideoCodecIDs) {
    VideoCodecIDs[VideoCodecIDs["AVC"] = 7] = "AVC"; // AVC_VIDEO_PACKET
})(VideoCodecIDs || (VideoCodecIDs = {}));
/**
 * @extends DataViewReader
 */
class FlvTagVideoData extends DataViewReader {
    /**
     * @param buffer
     */
    constructor(pipeCtx, buffer, timestamp) {
        super();
        this.frameType = (buffer[0] >> 4) & 0x0f;
        this.isKeyframe = this.frameType === 1;
        this.codecId = buffer[0] & 0x0f;
        switch (this.codecId) {
            case VideoCodecIDs.AVC:
                this.videoData = new AVCVideoPacket(pipeCtx, buffer.subarray(1), timestamp);
                break;
            default:
                logger.error(`flv tag videoData encounter unknown codecId ${this.codecId}`);
        }
    }
}

/**
 * @file: created at Saturday, 9th May 2020 3:49:22 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
class TagsStream extends Stream {
    constructor(ctx, flv, options = {}) {
        super();
        this.flv_ = flv;
        this.options_ = options;
        this.pipeCtx = {
            ctx,
            flv,
            options
        };
    }
    push(tag) {
        switch (tag.tagType) {
            case FlvTagTypes$1.SCRIPT_DATA:
                this.parseScriptData_(tag.payload);
                break;
            case FlvTagTypes$1.VIDEO:
                this.parseVideoData_(tag);
                break;
            case FlvTagTypes$1.AUDIO:
                this.parseAudioData_(tag);
                break;
            default:
                logger.error(`still not supported flv tag type ${tag.tagType}`);
        }
    }
    flush() {
        const self = this;
        self.emit('done');
    }
    reset() {
        this.emit('reset');
    }
    parseScriptData_(buffer) {
        const { flv_ } = this;
        let result = AMFdeSerialize(buffer);
        flv_.emit('data', {
            type: 'tag',
            tagType: FlvTagTypes$1.SCRIPT_DATA,
            ...result
        });
    }
    parseVideoData_(tag) {
        const { flv_ } = this;
        const data = new FlvTagVideoData(this.pipeCtx, tag.payload, tag.timestamp);
        let ret = {
            type: 'tag',
            tagType: FlvTagTypes$1.VIDEO,
            timestamp: tag.timestamp,
            ...data
        };
        flv_.emit('data', ret);
    }
    parseAudioData_(tag) {
        const { /*options_,*/ flv_ } = this;
        const data = new FlvTagAudioData(tag.payload, tag.timestamp);
        const { /*sampleSize,*/ soundData } = data;
        if (soundData.audioSpecificConfig) {
            flv_.audioSpecificConfig = soundData.audioSpecificConfig;
        }
        let ret = {
            type: 'tag',
            tagType: FlvTagTypes$1.AUDIO,
            timestamp: tag.timestamp,
            ...data
        };
        flv_.emit('data', ret);
    }
}

/**
 * @file: created at Thursday, 14th May 2020 10:18:11 am
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */
/**
 * @extends DataViewReader
 */
class FlvHead extends DataViewReader {
    /**
     * @param buffer
     */
    constructor(buffer) {
        super();
        this.signature =
            String.fromCharCode(buffer[0]) + // F
                String.fromCharCode(buffer[1]) + // L
                String.fromCharCode(buffer[2]); //V
        this.version = buffer[3];
        this.hasAudio = (buffer[4] & 4) >>> 2 == 1;
        this.hasVideo = (buffer[4] & 1) == 1;
        this.offset = this.readUint32(buffer, 5);
    }
    valid() {
        return this.signature === 'FLV';
    }
}

/**
 * flv demuxer.
 */
/**
 * flv
 */
class FLVDemux extends DemuxFacade {
    constructor(options = {}) {
        super(options);
        this.flv_ = new AVContext();
        this.flv_.stage = FLVParseStage.HEAD;
        // this. = 0;
        this.body_ = new BodyStream(this.ctx_, this.flv_, options);
        this.tags_ = new TagsStream(this.ctx_, this.flv_, options);
        // Compose pipeline
        this.pipe(this.body_);
        this.body_.pipe(this.tags_);
        super.listenEndStream_();
    }
    get endStream() {
        return this.flv_;
    }
    /**
     * @param buffer
     * @param conf
     * @param conf.offsetByte
     */
    push(buffer, conf = {}) {
        const { options_, ctx_, flv_, cache_buffer_ } = this;
        const data = super.constraintPushData_(buffer);
        let cacheByteLength = this.cache_buffer_.byteLength;
        logger.log(`flv demux received ${data.byteLength} bytes, cache ${cacheByteLength} bytes.`);
        options_.config = conf;
        if (isNumber(conf.offsetPos)) {
            if (cacheByteLength === 0) {
                if (flv_.pos !== conf.offsetPos) {
                    ctx_.emit('error', muxErrorCode.FLV_NOT_EXPECTED_ADJACENT_DATA);
                }
                flv_.pos = conf.offsetPos;
            }
        }
        cache_buffer_.append(data);
        // if file byteOffset is provided, then specify the stage of parser.
        if (flv_.pos < HEAD_LEN) {
            flv_.stage === FLVParseStage.HEAD;
        }
        else {
            flv_.stage === FLVParseStage.BODY;
        }
        while (true) {
            if (flv_.stage === FLVParseStage.HEAD) {
                if (cache_buffer_.byteLength >= HEAD_LEN) {
                    // has enough header
                    let chunk = cache_buffer_.cut(HEAD_LEN);
                    let head = new FlvHead(chunk);
                    if (head.valid()) {
                        flv_.emit('data', {
                            type: 'head',
                            signature: head.signature,
                            version: head.version,
                            hasAudio: head.hasAudio,
                            hasVideo: head.hasVideo,
                            offset: head.offset
                        });
                        // Change parse state -> body
                        flv_.stage = FLVParseStage.BODY;
                        flv_.pos = HEAD_LEN;
                    }
                    else {
                        ctx_.emit('error', muxErrorCode.FLV_HEAD_SIGNATURE);
                        break;
                    }
                }
                else {
                    break;
                }
            }
            else if (flv_.stage === FLVParseStage.BODY) {
                // At least has 4 body byte to parse
                if (cache_buffer_.byteLength >= MIN_BODY_LEN) {
                    let cbLen = cache_buffer_.byteLength;
                    let nextBytes = cache_buffer_.bytes;
                    cache_buffer_.clear();
                    if (nextBytes) {
                        this.emit('data', nextBytes);
                    }
                    flv_.pos += cbLen;
                }
                break;
            }
        }
    }
}

exports.FLVDemux = FLVDemux;
