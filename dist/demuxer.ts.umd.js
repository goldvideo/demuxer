(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.Demuxer = {}));
}(this, (function (exports) { 'use strict';

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
     * @file: patSection.js, created at Monday, 23rd December 2019 3:47:23 pm
     * @copyright Copyright (c) 2020
     * @author gem <gems.xu@gmail.com>
     */
    /**
     * Structure for pat.
     */
    class PATSection {
        // CRC_32: number;
        constructor(buffer) {
            // program_association_section 0x00
            // this.table_id = buffer[0];
            // this.section_syntax_indicator = buffer[1] >> 7;
            // this.zero = (buffer[1] >> 6) & 0x1;
            // this.reserved_0 = (buffer[1] >> 4) & 0x3;
            // the number of bytes of the section
            // starting immediately following the section_length field, and including the CRC.
            let section_length = ((buffer[1] & 0x0f) << 8) | buffer[2];
            // this.transport_stream_id = (buffer[3] << 8) | buffer[4];
            // this.reserved_1 = buffer[5] >> 6;
            // this.version_number = (buffer[5] >> 1) & 0x1f;
            // this.current_next_indicator = buffer[5] && 0x01;
            // The section_number of the first section in the Program Association Table shall be 0x00.
            // It shall be incremented by 1 with each additional section in the PAT.
            // this.section_number = buffer[6];
            // The number of the last section (that is, the section with the highest section_number) of the complete PAT.
            // this.last_section_number = buffer[7];
            // this.network_PID = 0x00;
            var n = 0, program_num;
            // reserved_3;
            var len = section_length - 4 - 5; // 4: crc32, 5: bytes followed by section_length
            this.pmtTable = [];
            /* loop by 4 bytes, during  */
            for (; n < len; n += 4) {
                program_num = (buffer[n + 8] << 8) | buffer[n + 9];
                // reserved_3 = buffer[10 + n] >> 5;
                if (program_num == 0x00) {
                    let network_PID = ((buffer[10 + n] & 0x1f) << 8) | buffer[11 + n];
                    // 记录该TS流的网络PID
                    // TS_network_Pid = this.network_PID;
                    logger.log('packet->network_PID %0x /n/n', network_PID);
                }
                else {
                    this.pmtTable.push({
                        programNum: program_num,
                        program_map_PID: ((buffer[10 + n] & 0x1f) << 8) | buffer[11 + n]
                    });
                    // TS_PAT_Program
                    // PAT_program;
                    // PAT_program.program_map_PID = (buffer[10 + n] & 0x1F) << 8 | buffer[11 + n];
                    // PAT_program.program_number = program_num;
                    // this.program.push_back(PAT_program);
                    // TS_program.push_back(PAT_program);//向全局PAT节目数组中添加PAT节目信息
                }
            }
            // var crcLength = this.section_length + 3;
            // this.CRC_32 =
            //     ((buffer[crcLength - 4] & 0x000000ff) << 24) |
            //     ((buffer[crcLength - 3] & 0x000000ff) << 16) |
            //     ((buffer[crcLength - 2] & 0x000000ff) << 8) |
            //     (buffer[crcLength - 1] & 0x000000ff);
        }
    }

    /**
     * @file: pmtSection.js, created at Monday, 23rd December 2019 3:47:23 pm
     * @copyright Copyright (c) 2020
     * @author gem <gems.xu@gmail.com>
     */
    /**
     * Structure for PMT.
     */
    class PMTSection {
        // CRC_32: number;
        constructor(buffer) {
            // program_map_section  0x02
            // this.table_id = buffer[0];
            // this.section_syntax_indicator = buffer[1] >> 7;
            // this.zero = (buffer[1] >> 6) & 0x1;
            // this.reserved_0 = (buffer[1] >> 4) & 0x3;
            // the number of bytes of the section
            // starting immediately following the section_length field, and including the CRC.
            let section_length = ((buffer[1] & 0x0f) << 8) | buffer[2];
            // It specifies the program to which the program_map_PID is applicable.
            // this.program_number = (buffer[3] << 8) | buffer[4];
            // this.reserved_1 = buffer[5] >> 6;
            // this.version_number = (buffer[5] >> 1) & 0x1f;
            // this.current_next_indicator = buffer[5] && 0x01;
            // The section_number of the first section in the Program Association Table shall be 0x00.
            // It shall be incremented by 1 with each additional section in the PAT.
            // this.section_number = buffer[6];
            // The number of the last section (that is, the section with the highest section_number) of the complete PAT.
            // this.last_section_number = buffer[7];
            // contain the PCR fields valid for the program specified by program_number.
            // this.PCR_PID = ((buffer[8] & 0x1f) << 8) | buffer[9];
            // this.reserved_2 = buffer[10] >> 4;
            // The number of bytes of the descriptors immediately following the program_info_length field.
            const program_info_length = ((buffer[10] & 0x0f) << 8) | buffer[11];
            if (program_info_length < 0) {
                return;
            }
            else if (program_info_length > 2) {
                let i = 0;
                while (i < program_info_length) {
                    // let descriptor_tag = buffer[12 + i];
                    let descriptor_length = buffer[13 + i];
                    // 	logger.log('descriptor_tag', descriptor_tag, descriptor_length);
                    i += descriptor_length;
                }
            }
            var es_section_pos = 12 + program_info_length;
            var es_section_len = section_length - program_info_length - 9 - 4; // 9: bytes followed by section_length, 4: crc32
            var es_section_end = es_section_pos + es_section_len;
            if (es_section_pos >= es_section_end) {
                logger.warn(`es_section_pos < es_section_end ${es_section_pos}, ${es_section_end}`);
                return;
            }
            this.pes_table = [];
            let j = 0;
            while (j < es_section_len) {
                let basePos = es_section_pos + j;
                let stream_type = buffer[basePos];
                let elementary_PID = ((buffer[basePos + 1] << 8) | buffer[basePos + 2]) & 0x1fff;
                let ES_info_length = ((buffer[basePos + 3] << 8) | buffer[basePos + 4]) & 0x0fff;
                this.pes_table.push({
                    streamType: stream_type,
                    PID: elementary_PID
                });
                // if (ES_info_length > 2) {
                //     let k = 0;
                //     let es_pos = basePos + 5;
                //     while (k < ES_info_length) {
                //         // let descriptor_tag = buffer[es_pos + k];
                //         let descriptor_length = buffer[es_pos + k];
                //         // if (descriptor_tag === )
                //         k += descriptor_length;
                //     }
                // }
                j += ES_info_length + 5;
            }
            // var crcLength = this.section_length + 3;
            // this.CRC_32 =
            //     ((buffer[crcLength - 4] & 0x000000ff) << 24) |
            //     ((buffer[crcLength - 3] & 0x000000ff) << 16) |
            //     ((buffer[crcLength - 2] & 0x000000ff) << 8) |
            //     (buffer[crcLength - 1] & 0x000000ff);
        }
    }

    /**
     * @file: m2t-pid.js, created at Monday, 23rd December 2019 3:47:23 pm
     * @copyright Copyright (c) 2020
     * @author gem <gems.xu@gmail.com>
     */
    /**
     * @overview Program and program element descriptors.
     * @see ISO/IEC 13818-1: Table 2-3 – PID table
     * @see DVB SI: 5.1.3 Coding of PID and table_id fields
     */
    /**
     * @readonly
     * @enum {number}
     * @export
     */
    const PAT_PID = 0x0000;
    const CAT_PID = 0x0001;
    const TSDT_PID = 0x0002;
    /* reserved 0x0003 to 0x000F */
    const SDT_PID = 0x0011;

    /**
     * @file: psi.js, created at Monday, 23rd December 2019 3:47:23 pm
     * @copyright Copyright (c) 2020
     * @author gem <gems.xu@gmail.com>
     */
    // class Metadata {
    //     service_name: string;
    //     service_provider: string;
    // }
    class PSI {
        constructor() {
            // this.metadata = new Metadata();
            this.pat_table = [];
            this.pes_streams = [];
        }
        /**
         * program PID
         */
        get currentProgramPID() {
            let _pmtIds = [];
            for (let i = 0; i < this.pat_table.length; i++) {
                _pmtIds.push(this.pat_table[i].pid);
            }
            return _pmtIds.length > 0 ? _pmtIds[0] : -1;
        }
        get tracks() {
            return this.pes_streams;
        }
        // get pmtTable() {
        //     return this.pat_table;
        // }
        /**
         * 目前对于PSI的信息，持久化保留在内存中
         * 对于同一个片子，HLS规范会规定只能有一个 PMT/PAT 表
         * 所以一部片子的PSI信息应该是保持不变的，换片子后PSI信息的销毁通过 mux 重新实例化产生新的信息，不需要调用reset
         * 有些 TS 文件在HLS切片器切割的时候，没有带上PAT/PMT等表，需要相邻 TS 给定的表信息
         */
        reset() {
            // this.metadata = new Metadata();
            this.pat_table.splice(0, this.pat_table.length);
            this.pes_streams.splice(0, this.pes_streams.length);
        }
        /**
         * @param packet
         */
        parse(packet) {
            const self = this;
            // ISO13818-1: Table 2-3 – PID table
            if (PAT_PID === packet.PID) {
                /* PAT PID */
                this._parsePat(packet);
            }
            else if (CAT_PID === packet.PID) ;
            else if (TSDT_PID === packet.PID) ;
            else if (0x0003 <= packet.PID && packet.PID <= 0x000f) ;
            else if (SDT_PID === packet.PID) ;
            else if (packet.PID === self.currentProgramPID) {
                /* PMT PID */
                this._parsePmt(packet);
            }
            // else if (this.findTrack(packet.PID)) {
            // 	/* Reserved */
            // } else {
            // 	logger.warn(`psi unknown packet PID ${packet.PID}`);
            // }
        }
        // findPmtProgram(PID) {
        // 	let program = null;
        //
        // 	for (let i = 0; i < this.pat_table.length; i++) {
        // 		if (this.pat_table[i].pid === PID) {
        // 			program = this.pat_table[i].id;
        // 			break;
        // 		}
        // 	}
        //
        // 	return program;
        // }
        /**
         * @param PID
         */
        findTrack(PID) {
            let program = null;
            let streams = this.pes_streams;
            for (let i = 0; i < streams.length; i++) {
                if (streams[i].id === PID) {
                    program = streams[i];
                    break;
                }
            }
            return program;
        }
        /**
         * Parse PAT Packet
         * @param pack
         */
        _parsePat(pack) {
            let data;
            if (pack.payload_unit_start_indicator) {
                // psi has pointer_field
                let pointer = pack.payload[0];
                data = pack.payload.subarray(pointer + 1);
            }
            else {
                data = pack.payload;
            }
            let pat = new PATSection(data);
            // https://tools.ietf.org/html/rfc8216#section-3.2
            // Transport Stream Segments MUST contain a single MPEG-2 Program;
            for (var i = 0; i < pat.pmtTable.length; i++) {
                this._add_pid_to_pmt(pat.pmtTable[i].programNum, pat.pmtTable[i].program_map_PID);
            }
            return pat;
        }
        /**
         * Associates Program Number and Program Map Table(PMT) PID
         * @param programId
         * @param pid
         */
        _add_pid_to_pmt(programId, pid) {
            let table = this.pat_table;
            function get_pmt(id) {
                for (let i = 0, item; i < table.length; i++) {
                    item = table[i];
                    if (item.id === id) {
                        return {
                            idx: i,
                            item
                        };
                    }
                }
                return null;
            }
            let p = get_pmt(programId);
            if (!p) {
                table.push({
                    id: programId,
                    pid: pid
                });
            }
        }
        /**
         * Parse PMT Packet
         * @param pack
         */
        _parsePmt(pack) {
            let data;
            if (pack.payload_unit_start_indicator) {
                // psi has pointer_field
                let pointer = pack.payload[0];
                data = pack.payload.subarray(pointer + 1);
            }
            else {
                data = pack.payload;
            }
            let pmt = new PMTSection(data);
            for (var i = 0; i < pmt.pes_table.length; i++) {
                this._add_pes_stream(pmt.pes_table[i]);
            }
            return pmt;
        }
        /**
         * @param stream
         * @param pmt
         */
        _add_pes_stream(stream /*, pmt?: PMTSection*/) {
            let streams = this.pes_streams;
            function get_program(id) {
                for (let i = 0, item; i < streams.length; i++) {
                    item = streams[i];
                    if (item.id === id) {
                        return {
                            idx: i,
                            item
                        };
                    }
                }
                return null;
            }
            let p = get_program(stream.PID);
            if (!p) {
                streams.push({
                    id: stream.PID,
                    stream_type: stream.streamType,
                    duration: 0,
                    sps: [],
                    pps: [],
                    pixelRatio: [1, 1],
                    timescale: 90000,
                    width: 0,
                    height: 0
                });
            }
        }
    }

    /**
     * @file: complex.js, created at Monday, 23rd December 2019 3:47:23 pm
     * @copyright Copyright (c) 2020
     * @author gem <gems.xu@gmail.com>
     */

    class M2TSComplexStream extends Stream {
        constructor(ctx, psi) {
            super();

            /** @private */
            this.context = ctx;

            /** @private {PSI} */
            this.PSI = psi;

            /** @private {Object} */
            this.videoTrack = null;

            /** @private {Object} */
            this.audioTrack = null;

            /** @private {Object} */
            this.captionTrack = null;

            // pipe specified by outside.
        }

        push(data) {
            let tracks = data;

            for (let i = 0, track; i < tracks.length; i++) {
                track = tracks[i];

                switch (track.type) {
                    case 'video':
                        // data -> GOPs
                        this._complexVideo(track);
                        break;
                    case 'audio':
                        this._complexAudio(track);
                        break;
                    case 'caption':
                        this._complexCaption(track);
                        break;
                }
            }
        }

        flush() {
            this.emit('done');

            this._clearStream();
        }

        reset() {
            this._clearStream();

            // This is demux end stream, so don't emit reset.
            // this.emit('reset');
        }

        _clearStream() {
            this.videoTrack = null;
            this.audioTrack = null;
            this.captionTrack = null;
        }

        _complexVideo(gops) {
            let track = this.PSI.findTrack(gops.trackId);

            if (track) {
                track.type = 'video';
                track.gops = gops;
                track.firstDTS = gops[0][0].dts;
                track.firstPTS = gops[0][0].pts;
                // set duration to Infinity(POSITIVE_INFINITY) can be useful for live.
                // If Infinity it will loose the ability to seek.
                track.duration = Number.POSITIVE_INFINITY;

                this.videoTrack = track;

                this.emit('data', {
                    videoTrack: this.videoTrack
                });
            }
        }

        _complexAudio(frames) {
            let track = this.PSI.findTrack(frames.trackId);

            if (track) {
                track.type = 'audio';
                track.frames = frames;
                track.firstPTS = track.firstDTS = frames[0].dts;

                // set duration to Infinity(POSITIVE_INFINITY) can be useful for live.
                // If Infinity it will loose the ability to seek.
                track.duration = Number.POSITIVE_INFINITY;

                this.audioTrack = track;

                this.emit('data', {
                    audioTrack: this.audioTrack
                });
            }
        }

        _complexCaption() {}
    }

    /**
     * @file: platform.js, created at Monday, 23rd December 2019 3:47:23 pm
     * @copyright Copyright (c) 2020
     * @author gem <gems.xu@gmail.com>
     */
    /**
     * @description device
     */
    const os = {
        mac: false,
        iphone: false,
        android: false
    };
    const browser = {
        version: false,
        CHROME: false,
        SAFARI: false,
        FIREFOX: false,
        IE11: false,
        IE: false,
        EDGE: false,
        WECHAT: false
    };
    let nav = navigator;
    // let platform = nav.platform;
    let ua = nav.userAgent.toLowerCase();
    var match = /(edge)\/([\w.]+)/.exec(ua) ||
        /(opr)[/]([\w.]+)/.exec(ua) ||
        /(chrome)[ /]([\w.]+)/.exec(ua) ||
        /(firefox)[ /]([\w.]+)/.exec(ua) ||
        /(iemobile)[/]([\w.]+)/.exec(ua) ||
        /(version)(applewebkit)[ /]([\w.]+).*(safari)[ /]([\w.]+)/.exec(ua) ||
        /(webkit)[ /]([\w.]+).*(version)[ /]([\w.]+).*(safari)[ /]([\w.]+)/.exec(ua) ||
        /(webkit)[ /]([\w.]+)/.exec(ua) ||
        /(opera)(?:.*version|)[ /]([\w.]+)/.exec(ua) ||
        /(msie) ([\w.]+)/.exec(ua) ||
        (ua.indexOf('trident') >= 0 && /(rv)(?::| )([\w.]+)/.exec(ua)) ||
        (ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)) ||
        [];
    var platform_match = /(ipad)/.exec(ua) ||
        /(ipod)/.exec(ua) ||
        /(windows phone)/.exec(ua) ||
        /(iphone)/.exec(ua) ||
        /(kindle)/.exec(ua) ||
        /(silk)/.exec(ua) ||
        /(android)/.exec(ua) ||
        /(win)/.exec(ua) ||
        /(mac)/.exec(ua) ||
        /(linux)/.exec(ua) ||
        /(cros)/.exec(ua) ||
        /(playbook)/.exec(ua) ||
        /(bb)/.exec(ua) ||
        /(blackberry)/.exec(ua) ||
        [];
    var result = {
        version: undefined
    };
    var matched = {
        browser: match[5] || match[3] || match[1] || '',
        version: match[2] || match[4] || '0',
        versionNumber: match[4] || match[2] || '0',
        platform: platform_match[0] || ''
    };
    if (matched.browser) {
        result[matched.browser] = true;
        // result.version = matched.version;
        // result.versionNumber = parseInt(matched.versionNumber, 10);
        let versionArray = matched.versionNumber.split('.');
        result.version = {
            major: parseInt(matched.versionNumber, 10),
            string: matched.version
        };
        if (versionArray.length > 1) {
            result.version.minor = parseInt(versionArray[1], 10);
        }
        if (versionArray.length > 2) {
            result.version.build = parseInt(versionArray[2], 10);
        }
    }
    // -------------------------------------- browser --------------------------------------
    browser.version = result.version;
    browser.CHROME = !!result['chrome'];
    browser.SAFARI = !!result['safari'] && !browser.CHROME;
    browser.FIREFOX = !!result['firefox'];
    browser.IE11 = /rv:11/.test(ua);
    browser.IE = !!result['msie'] || browser.IE11;
    browser.EDGE = !!result['edge'];
    browser.WECHAT = /(wechat)|(micromessenger)/.test(ua);
    // -------------------------------------- os --------------------------------------
    os.mac = !!matched.platform['mac'];
    os.iphone = !!matched.platform['iphone'];
    os.android = !!matched.platform['android'];
    var platform = {
        browser: browser,
        os: os
    };

    /**
     * @file: aac-config.js, created at Monday, 23rd December 2019 3:47:23 pm
     * @copyright Copyright (c) 2020
     * @author gem <gems.xu@gmail.com>
     */
    /*
        sampling freq,
        0: 96000 Hz
        1: 88200 Hz
        2: 64000 Hz
        3: 48000 Hz
        4: 44100 Hz
        5: 32000 Hz
        6: 24000 Hz
        7: 22050 Hz
        8: 16000 Hz
        9: 12000 Hz
        10: 11025 Hz
        11: 8000 Hz
        12: 7350 Hz
        13: Reserved
        14: Reserved
        15: frequency is written explictly
     */
    const samplingRates = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];
    var getAudioConfig = (audioObjectType, samplingFrequencyIndex, channelCount) => {
        let adtsExtensionSamplingIndex;
        let realAudioObjectType = audioObjectType;
        let config;
        if (samplingFrequencyIndex > samplingRates.length - 1) {
            logger.error(`invalid sampling index:${samplingFrequencyIndex}`);
            return;
        }
        // firefox: freq less than 24kHz = AAC SBR (HE-AAC)
        if (platform.browser.FIREFOX) {
            if (samplingFrequencyIndex >= 6) {
                audioObjectType = 5;
                config = new Array(4);
                // HE-AAC uses SBR (Spectral Band Replication) , high frequencies are constructed from low frequencies
                // there is a factor 2 between frame sample rate and output sample rate
                // multiply frequency by 2 (see table below, equivalent to substract 3)
                adtsExtensionSamplingIndex = samplingFrequencyIndex - 3;
            }
            else {
                audioObjectType = 2;
                config = new Array(2);
                adtsExtensionSamplingIndex = samplingFrequencyIndex;
            }
            // Android : always use AAC
        }
        else if (platform.os.android) {
            audioObjectType = 2;
            config = new Array(2);
            adtsExtensionSamplingIndex = samplingFrequencyIndex;
        }
        else {
            /*  for other browsers (Chrome/Vivaldi/Opera ...)
                    always force audio type to be HE-AAC SBR, as some browsers do not support audio codec switch properly (like Chrome ...)
                */
            audioObjectType = 5;
            config = new Array(4);
            // if (manifest codec is HE-AAC or HE-AACv2) OR (manifest codec not specified AND frequency less than 24kHz)
            if (samplingFrequencyIndex >= 6) {
                // HE-AAC uses SBR (Spectral Band Replication) , high frequencies are constructed from low frequencies
                // there is a factor 2 between frame sample rate and output sample rate
                // multiply frequency by 2 (see table below, equivalent to substract 3)
                adtsExtensionSamplingIndex = samplingFrequencyIndex - 3;
            }
            else {
                // if (manifest codec is AAC) AND (frequency less than 24kHz AND nb channel is 1) OR (manifest codec not specified and mono audio)
                // Chrome fails to play back with low frequency AAC LC mono when initialized with HE-AAC.  This is not a problem with stereo.
                if (channelCount === 1) {
                    audioObjectType = 2;
                    config = new Array(2);
                }
                adtsExtensionSamplingIndex = samplingFrequencyIndex;
            }
        }
        /*
            refer to http://wiki.multimedia.cx/index.php?title=MPEG-4_Audio#Audio_Specific_Config ISO 14496-3 (AAC).pdf
                - Table 1.13 — Syntax of AudioSpecificConfig()
              Audio Profile / Audio Object Type
              0: Null
              1: AAC Main
              2: AAC LC (Low Complexity)
              3: AAC SSR (Scalable Sample Rate)
              4: AAC LTP (Long Term Prediction)
              5: SBR (Spectral Band Replication)
              6: AAC Scalable

              Channel Configurations
              These are the channel configurations:
              0: Defined in AOT Specifc Config
              1: 1 channel: front-center
              2: 2 channels: front-left, front-right
            */
        // audioObjectType = profile => profile, the MPEG-4 Audio Object Type minus 1
        config[0] = audioObjectType << 3;
        // samplingFrequencyIndex
        config[0] |= (samplingFrequencyIndex & 0x0e) >> 1;
        config[1] |= (samplingFrequencyIndex & 0x01) << 7;
        // channelConfiguration
        config[1] |= channelCount << 3;
        if (audioObjectType === 5) {
            // adtsExtensionSamplingIndex
            config[1] |= (adtsExtensionSamplingIndex & 0x0e) >> 1;
            config[2] = (adtsExtensionSamplingIndex & 0x01) << 7;
            // audioObjectType (force to 2, chrome is checking that object type is less than 5 ???
            //    https://chromium.googlesource.com/chromium/src.git/+/master/media/formats/mp4/aac.cc
            config[2] |= 2 << 2;
            config[3] = 0;
        }
        return {
            config: config,
            sampleRate: samplingRates[samplingFrequencyIndex],
            channelCount: channelCount,
            codec: 'mp4a.40.' + audioObjectType,
            realCodec: 'mp4a.40.' + realAudioObjectType
        };
    };

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
     * @file: adts.js, created at Monday, 23rd December 2019 3:47:23 pm
     * @copyright Copyright (c) 2020
     * @author gem <gems.xu@gmail.com>
     */
    /**
     * @extends EventEmitter
     */
    class ADTSCodec extends EventEmitter {
        constructor() {
            super();
        }
        push(data) {
            let { pts, dts, payload } = data;
            let data_byte = payload;
            let i = 0, frameNum = 0, frameLength, protectionSkipBytes, frameEnd, sampleCount, adtsFrameDuration;
            while (i + 5 < data_byte.length) {
                // Look for the start of an ADTS header..
                if (data_byte[i] !== 0xff || (data_byte[i + 1] & 0xf6) !== 0xf0) {
                    // If a valid header was not found,  jump one forward and attempt to
                    // find a valid ADTS header starting at the next byte
                    i++;
                    continue;
                }
                // The protection skip bit tells us if we have 2 bytes of CRC data at the
                // end of the ADTS header
                protectionSkipBytes = (~data_byte[i + 1] & 0x01) * 2;
                // Frame length is a 13 bit integer starting 16 bits from the
                // end of the sync sequence
                frameLength =
                    ((data_byte[i + 3] & 0x03) << 11) | (data_byte[i + 4] << 3) | ((data_byte[i + 5] & 0xe0) >> 5);
                sampleCount = ((data_byte[i + 6] & 0x03) + 1) * 1024;
                adtsFrameDuration = (sampleCount * 90000) / AAC_SAMPLING_FREQUENCIES[(data_byte[i + 2] & 0x3c) >>> 2];
                frameEnd = i + frameLength;
                // If we don't have enough data to actually finish this ADTS frame, return
                // and wait for more data
                if (data_byte.byteLength < frameEnd) {
                    return;
                }
                let aacFrame = {
                    pts: pts + frameNum * adtsFrameDuration,
                    dts: dts + frameNum * adtsFrameDuration,
                    sampleCount: sampleCount,
                    audioObjectType: ((data_byte[i + 2] >>> 6) & 0x03) + 1,
                    channelCount: ((data_byte[i + 2] & 1) << 2) | ((data_byte[i + 3] & 0xc0) >>> 6),
                    sampleRate: AAC_SAMPLING_FREQUENCIES[(data_byte[i + 2] & 0x3c) >>> 2],
                    samplingFrequencyIndex: (data_byte[i + 2] & 0x3c) >>> 2,
                    // assume ISO/IEC 14496-12 AudioSampleEntry default of 16
                    sampleSize: 16,
                    data: data_byte.subarray(i + 7 + protectionSkipBytes, frameEnd)
                };
                // Otherwise, deliver the complete AAC frame
                this.emit('frame', aacFrame);
                // If the data_byte is empty, clear it and return
                if (data_byte.byteLength === frameEnd) {
                    data_byte = undefined;
                    this.emit('done');
                    return;
                }
                frameNum++;
                // Remove the finished frame from the data_byte and start the process again
                data_byte = data_byte.subarray(frameEnd);
            }
        }
    }

    /**
     * @file: adts.js, created at Monday, 23rd December 2019 3:47:23 pm
     * @copyright Copyright (c) 2020
     * @author gem <gems.xu@gmail.com>
     */
    class ADTSStream extends Stream {
        constructor(psi) {
            super();
            this.PSI = psi;
            this.trackId = null;
            /** @private {ADTSCodec} */
            this.codec = new ADTSCodec();
            this.codec.on('frame', (frame) => {
                this.frames.push(frame);
                this.frames.byteLength += frame.data.byteLength;
                this.frames.trackId = this.trackId;
            });
            this._newFrames();
        }
        push(data) {
            if (data.stream_type === 15 /* ADTS */) {
                this.trackId = data.pid;
                this.codec.push({
                    dts: data.pes.DTS,
                    pts: data.pes.PTS,
                    payload: data.pes.data_byte
                });
            }
        }
        flush() {
            if (this.frames.length > 0) {
                let count = this.frames.length;
                let firstFrame = this.frames[0];
                let lastFrame = this.frames[count - 1];
                let lastDuration = (lastFrame.sampleRate * lastFrame.sampleCount) / 90000;
                this.frames.firstDTS = firstFrame.dts;
                this.frames.firstPTS = firstFrame.pts;
                if (count === 1) {
                    this.frames.duration = lastDuration;
                }
                else {
                    this.frames.duration = lastDuration + (lastFrame.pts - firstFrame.pts);
                }
                // To prevent information mismatch leading to next pipeline decoding errors
                // Every audio frame list assembly needs to update track meta.
                this._updateTrackMeta(firstFrame);
                this.emit('data', this.frames);
                this.reset();
                this.emit('done');
            }
        }
        reset() {
            this.trackId = null;
            this._newFrames();
        }
        _newFrames() {
            this.frames = []; // aac frames
            this.frames.type = 'audio';
            this.frames.byteLength = 0;
            this.frames.duration = 0;
            this.frames.firstDTS = 0;
            this.frames.firstPTS = 0;
        }
        /**
         * @param {Object} frame
         */
        _updateTrackMeta(frame) {
            let track = this.PSI.findTrack(this.trackId);
            let config = getAudioConfig(frame.audioObjectType, frame.samplingFrequencyIndex, frame.channelCount);
            track.config = config.config;
            track.sampleRate = config.sampleRate;
            track.inputTimeScale = track.inputTimeScale || track.timescale;
            track.timescale = config.sampleRate;
            track.channelCount = config.channelCount;
            track.codec = config.codec;
            track.realCodec = config.realCodec;
            track.isAAC = true;
        }
    }

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
     * @file: avc-config.js, created at Monday, 23rd December 2019 3:47:23 pm
     * @copyright Copyright (c) 2020
     * @author gem <gems.xu@gmail.com>
     */
    // import { PPSProps } from './pps';
    /**
     * AVC Config Helper
     * Accord sps/pps, generate mimeType info.
     */
    var getAVCConfig = (sps /*, pps?: PPSProps*/) => {
        let profile_idc = sps.profile_idc;
        let profile_compatibility = sps.profile_compatibility;
        let level_idc = sps.level_idc;
        let codecString = 'avc1.';
        let arr = [profile_idc, profile_compatibility, level_idc];
        for (let j = 0; j < arr.length; j++) {
            let h = arr[j].toString(16);
            if (h.length < 2) {
                h = '0' + h;
            }
            codecString += h;
        }
        return {
            codec: codecString
        };
    };

    /**
     * @file: avc.js, created at Monday, 23rd December 2019 3:47:23 pm
     * @copyright Copyright (c) 2020
     * @author gem <gems.xu@gmail.com>
     */
    class H264Stream extends Stream {
        constructor(psi) {
            super();
            this.PSI = psi;
            this.trackId = null;
            /** @private {Array} */
            this.currentFrame = []; // a group of nalu
            /** @private {AVCCodec} */
            this.codec = new AVCCodec();
            this._newGop();
            this._newGops();
            this.codec.on('nalu', (nalu) => {
                if (nalu.unit_type === 7 /* SPS */) {
                    let track = this.PSI.findTrack(this.trackId);
                    let config = getAVCConfig(nalu.sps);
                    // write sps info to video track.
                    track.codec = config.codec;
                    track.width = nalu.sps.width;
                    track.height = nalu.sps.height;
                    track.profileIdc = nalu.sps.profile_idc;
                    track.profileCompatibility = nalu.sps.profile_compatibility;
                    track.levelIdc = nalu.sps.level_idc;
                    track.pixelRatio = nalu.sps.pixelRatio;
                    track.sps = [nalu.rawData];
                }
                else if (nalu.unit_type === 8 /* PPS */) {
                    let track = this.PSI.findTrack(this.trackId);
                    track.pps = [nalu.rawData];
                }
                this._grouping(nalu);
            });
        }
        /**
         * Push a complete pes
         * @param data
         */
        push(data) {
            const { stream_type, pes, pid } = data;
            if (stream_type === 27 /* H264 */ || stream_type === 36 /* HEVC */) {
                this.trackId = pid;
                let rawData = {
                    pts: pes.PTS,
                    dts: pes.DTS,
                    payload: pes.data_byte
                };
                this.codec.push(rawData);
            }
        }
        flush() {
            // Push last frame into gop.
            if (this.currentFrame.length > 0) {
                // If the last frame has valid duration, use the duration of the previous frame
                if (!this.currentFrame.duration || this.currentFrame.duration <= 0) {
                    this.currentFrame.duration = this.prevFrame.duration || 0;
                }
                this._pushFrameIntoGop();
                this.currentFrame = [];
            }
            // Push last gop.
            if (this.gop.length > 0) {
                this._pushGopIntoGroup();
            }
        }
        reset() {
            this.codec.reset();
            this.currentFrame = [];
            this._newGop();
            this._newGops();
        }
        /**
         * Group nalu into frame & gop.
         * @param currentNal
         * @private
         */
        _grouping(currentNal) {
            if (currentNal.unit_type === 9 /* AUD */) {
                if (this.currentFrame.length > 0) {
                    this.currentFrame.duration = currentNal.dts - this.currentFrame.dts;
                    if (this.gop.length > 0 && this.currentFrame.keyframe) {
                        this.gop.trackId = this.trackId;
                        this._pushGopIntoGroup();
                    }
                    // the gop should commence with a key frame,
                    // or the frame will be dropped until finding one that contains a key frame.
                    if (this.currentFrame.keyframe || this.gop.length > 0) {
                        this._pushFrameIntoGop();
                    }
                    else {
                        logger.warn(`h264 codec drop frame`);
                    }
                }
                this.prevFrame = this.currentFrame;
                // end a frame.
                this.currentFrame = [];
                this.currentFrame.keyframe = false;
                this.currentFrame.byteLength = 0;
                this.currentFrame.naluCount = 0;
                this.currentFrame.pts = currentNal.pts;
                this.currentFrame.dts = currentNal.dts;
            }
            else {
                if (currentNal.unit_type === 5 /* IDR_SLICE */) {
                    this.currentFrame.keyframe = true;
                }
                this.currentFrame.byteLength += currentNal.rawData.byteLength;
                this.currentFrame.naluCount++;
                this.currentFrame.push(currentNal);
            }
            this.currentFrame.duration = currentNal.dts - this.currentFrame.dts;
        }
        _newGop() {
            this.gop = []; // a group of idr-start-frame sequence
            this.gop.duration = 0;
            this.gop.naluCount = 0;
            this.gop.byteLength = 0;
        }
        _pushFrameIntoGop() {
            // Gop
            this.gop.push(this.currentFrame);
            this.gop.duration += this.currentFrame.duration;
            this.gop.byteLength += this.currentFrame.byteLength;
            this.gop.naluCount += this.currentFrame.naluCount;
        }
        _newGops() {
            this.gops = []; // a group of gop
            this.gops.type = 'video';
            this.gops.duration = 0;
            this.gops.naluCount = 0;
            this.gops.byteLength = 0;
            this.gops.frameLength = 0;
            this.gops.firstDTS = 0;
        }
        _pushGopIntoGroup() {
            let firstFrame = this.gop[0];
            // GOPs
            this.gops.trackId = this.trackId;
            this.gops.duration += this.gop.duration;
            this.gops.byteLength += this.gop.byteLength;
            this.gops.naluCount += this.gop.naluCount;
            this.gops.frameLength += this.gop.length;
            this.gops.firstDTS = firstFrame.dts;
            this.gops.firstPTS = firstFrame.pts;
            this.gops.push(this.gop);
            this.emit('data', this.gops);
            this._newGop();
            this._newGops();
            this.emit('done');
        }
    }

    /**
     * @file: elementary.js, created at Monday, 23rd December 2019 3:47:23 pm
     * @copyright Copyright (c) 2020
     * @author gem <gems.xu@gmail.com>
     */
    class ElementaryStream extends Stream {
        constructor(ctx, psi, options = {}) {
            super();
            this.context = ctx;
            this.PSI = psi;
            this.options = options;
            this.tracks = [];
            this.adtsStream = new ADTSStream(psi);
            this.avcStream = new H264Stream(psi);
            this.streams = [this.adtsStream, this.avcStream];
            if (options.decodeCodec) {
                this.avcStream.on('data', (data) => {
                    let stubTime = options.config.stubTime;
                    if (isNumber(stubTime)) {
                        let end = (data.firstPTS + data.duration) / 90000;
                        if (end < stubTime) {
                            logger.warn(`drop avc gop, start/end/stubTime(${data.firstPTS}/${end}/${stubTime})`);
                            return;
                        }
                    }
                    this.tracks.push(data);
                    this.emit('data', this.tracks);
                    this.tracks = [];
                    this.adtsStream.flush();
                });
                this.adtsStream.on('data', (data) => {
                    let stubTime = options.config.stubTime;
                    if (isNumber(stubTime)) {
                        let end = (data.firstPTS + data.duration) / 90000;
                        if (end < stubTime) {
                            logger.warn(`drop adts, start/end/stubTime(${data.firstPTS}/${end}/${stubTime})`);
                            return;
                        }
                    }
                    this.tracks.push(data);
                    this.emit('data', this.tracks);
                    this.tracks = [];
                });
            }
        }
        /**
         * Push a complete pes
         * @param data
         */
        push(data) {
            const { options, adtsStream, avcStream } = this;
            let { stream_type } = data;
            if (options.decodeCodec) {
                switch (stream_type) {
                    case 27 /* H264 */:
                    case 36 /* HEVC */:
                        avcStream.push(data);
                        break;
                    case 15 /* ADTS */:
                        adtsStream.push(data);
                        break;
                    default:
                        logger.warn(`ts elementary encounter unknown stream type ${stream_type}`);
                }
            }
            else {
                this.emit('data', data);
            }
        }
        flush() {
            let { streams, tracks } = this;
            for (let i = 0; i < this.streams.length; i++) {
                let stream = streams[i];
                stream.flush();
            }
            if (tracks.length > 0) {
                this.emit('data', tracks);
            }
            this.emit('done');
            tracks.splice(0, tracks.length);
        }
        reset() {
            this.tracks = [];
            for (let i = 0; i < this.streams.length; i++) {
                let stream = this.streams[i];
                stream.reset();
            }
            this.emit('reset');
        }
    }

    /**
     * @file: pes.js, created at Monday, 23rd December 2019 3:47:23 pm
     * @copyright Copyright (c) 2020
     * @author gem <gems.xu@gmail.com>
     */
    /**
     * Structure for Pes.
     */
    class Pes {
        constructor(buffer) {
            // The packet_start_code_prefix is a 24-bit code.
            // this.start_code_prefix = (buffer[0] << 16) | (buffer[1] << 8) | buffer[2];
            // In Transport Streams,
            // the stream_id may be set to any valid value which correctly describes the elementary stream type.
            // the elementary stream type is specified in the PSI(Program Specific Information).
            // this.stream_id = buffer[3];
            // A 16-bit field specifying the number of bytes in the PES packet.
            // this.packet_length = (buffer[4] << 8) | buffer[5];
            // this.data_alignment_indicator = buffer[6] & 0x04;
            // this.copyright = buffer[6] & 0x02;
            // PTS (presentation time stamp)
            // DTS (decoding time stamp)
            let PTS_DTS_flags = buffer[7] >> 6;
            // ESCR (Elementary Stream Clock Reference system):
            // A time stamp in the PES Stream from which decoders of PES streams may derive timing.
            // this.ESCR_flag = buffer[7] & 0x20;
            // this.ES_rate_flag = buffer[7] & 0x10;
            // this.trick_mode_flag = buffer[7] & 0x08;
            // this.additional_copy_info_flag = buffer[7] & 0x04;
            // this.CRC_flag = buffer[7] & 0x02;
            // this.extension_flag = buffer[7] & 0x01;
            let header_data_length = buffer[8];
            this.PTS = 0;
            if ((PTS_DTS_flags & 0x02) == 0x02) {
                this.PTS = this.calcTimestamp_(buffer, 9);
            }
            // if there is no dts, let DTS=PTS
            // See Annex D - D.0.2 Audio and Video Presentation Synchronization
            this.DTS = this.PTS;
            if ((PTS_DTS_flags & 0x01) == 0x01) {
                this.DTS = this.calcTimestamp_(buffer, 14);
            }
            // if (this.ESCR_flag === 1) {
            // }
            //
            // if (this.ES_rate_flag === 1) {
            // }
            //
            //
            // if (this.trick_mode_flag === 1) {
            //
            // }
            //
            // if (this.ESCR_flag === 1) {
            // }
            this.data_byte = buffer.subarray(9 + header_data_length);
            // this.isStartPes = (buffer[0] << 16 | buffer[1] << 8 | buffer[2]) & 0xffffff === 0x000001;
        }
        /**
         * @param buffer
         * @param start
         */
        calcTimestamp_(buffer, start) {
            // PTS / DTS is 33 bit
            return (
            // JS Bitwise operators treat their operands as a sequence of 32 bits,
            // We cannot use bitwise operator in JS beyond 32bits
            (buffer[start] & 0x0e) * 536870912 + // Math.pow(2, 29) === 536870912
                (buffer[start + 1] << 22) +
                ((buffer[start + 2] >> 1) << 15) +
                (buffer[start + 3] << 7) +
                (buffer[start + 4] >> 1));
        }
    }

    /**
     * @file: pes.js, created at Monday, 23rd December 2019 3:47:23 pm
     * @copyright Copyright (c) 2020
     * @author gem <gems.xu@gmail.com>
     */
    class PesStream extends Stream {
        constructor(ctx, psi) {
            super();
            this.context = ctx;
            this.PSI = psi;
            this.PID = null;
            this.cache_buffer = new CacheBuffer();
        }
        /**
         * @param packet
         */
        push(packet) {
            const self = this;
            // PES PID
            // 0x20 - 0xff is reserved for dvb etc. (https://en.wikipedia.org/wiki/Program-specific_information#PSI_labels)
            // but this is not strict restriction.
            if (packet.PID > 0x001f && packet.PID < 0x1fff) {
                if (this.PSI.currentProgramPID == -1) {
                    self._pushPacket(packet);
                }
                else if (this.PSI.currentProgramPID !== packet.PID) {
                    if (packet.payload_unit_start_indicator === 1) {
                        self._assembleOnePES();
                    }
                    self._pushPacket(packet);
                }
            }
        }
        flush() {
            const self = this;
            // 组装最后一个PES
            self._assembleOnePES();
            self.emit('done');
        }
        reset() {
            this._clearCached();
            this.emit('reset');
        }
        _clearCached() {
            this.PID = null;
            this.cache_buffer.clear();
        }
        _pushPacket(p) {
            let empty = this.cache_buffer.empty;
            // Make first packet in cache is start unit.
            if (empty && p.payload_unit_start_indicator === 0) {
                return;
            }
            if (empty) {
                this.PID = p.PID;
            }
            this.cache_buffer.append(p.payload);
        }
        _assembleOnePES() {
            const self = this;
            if (!this.cache_buffer.empty) {
                let bytes;
                try {
                    bytes = this.cache_buffer.toNewBytes();
                }
                catch (e) {
                    throw `pes alloc mem err ${this.cache_buffer.byteLength}`;
                }
                let pesData = new Pes(bytes);
                let track = this.PSI.findTrack(this.PID);
                // console.log(`stream_id: ${pesData.stream_id}, PTS: ${pesData.PTS}, DTS: ${pesData.DTS}`);
                if (track) {
                    let data = {
                        pid: track.id,
                        stream_type: track.stream_type,
                        // pcr_pid: track.pcr_pid,
                        pes: pesData
                    };
                    // Assemble one pes packet, emit it to next stream.
                    self.emit('data', data);
                }
                self._clearCached();
            }
        }
    }

    /**
     * @file: packet.js, created at Monday, 23rd December 2019 3:47:23 pm
     * @copyright Copyright (c) 2020
     * @author gem <gems.xu@gmail.com>
     */
    const SYNC_BYTE = 0x47; // The sync_byte is a fixed 8-bit field whose value is '0100 0111' (0x47).
    /**
     * packet structure.
     */
    class Packet {
        /**
         * @param buffer
         */
        constructor(buffer) {
            this.sync_byte = buffer[0];
            // this.transport_error_indicator = buffer[1] >> 7;
            // Indicating transport stream packets carry PES packets or PSI data
            // PES: 1 -> commence with the first byte of a PES packet,  0 -> no PES packet shall start in this packet.
            // PSI: 1 -> carries the first byte of a PSI section, 0 -> no pointer_field in the payload.
            this.payload_unit_start_indicator = (buffer[1] >> 6) & 1;
            // this.transport_priority = (buffer[1] >>> 5) & 1;
            // The PID(Packet ID) is a 13-bit field, indicating the type of the data stored in the packet payload.
            // NOTE – The transport packets with PID values 0x0000, 0x0001, and 0x0010-0x1FFE are allowed to carry a PCR.
            // ISO/IEC 13818-1 : 2000 (E)
            // Value                  Description
            // 0x0000                 Program Association Table
            // 0x0001                 Conditional Access Table
            // 0x0002                 Transport Stream Description Table
            // 0x0003-0x000F          Reserved
            // 0x0010 ... 0x1FFE      May be assigned as network_PID, Program_map_PID, elementary_PID, or for other purposes
            // https://www.dvb.org/resources/public/standards/a38_dvb-si_specification.pdf
            // 0x0040                 Network_information_section-actual_network
            // 0x0041                 Network_information_section-other_network
            // 0x0042                 Service_description_section-actual_transport_stream
            // 0x0043                 TO 0x45 Reserved for future use
            // 0x0046                 Service_description_section-other_transport_stream
            // 0x0047                 TO 0x49 Reserved for future use
            // 0x004A                 Bouquet_association_section
            // 0x004B                 TO 0x4D Reserved for future use
            // 0x004E                 Event_information_section-actual_transport_stream,P/F
            // 0x004F                 Event_information_section-other_transport_stream,P/F
            // 0x0050                 TO 0x5F Event_information_section-actual_transport_stream,schedule
            // 0x0060                 TO 0x6F Event_information_section-other_transport_stream,schedule
            // 0x0070                 Time_data_section
            // 0x0071                 Running_status_section
            // 0x0072                 Stuffing_section
            // 0x0073                 Time_offset_section
            // 0x0074                 TO 0x007D Reserved for future use
            // 0x007E                 Discontinuity_information_section
            // 0x007F                 Selection_information_section
            // 0x0080                 TO 0x00FE User defined
            // 0x00FF                 Reserved
            // 0x1FFF                 Null packet
            this.PID = ((buffer[1] << 8) | buffer[2]) & 0x1fff;
            // transport_scrambling_control
            // this.tsc = buffer[3] >> 6;
            // adaptation_field_control
            // Value  Description
            // 00     Reserved for future use by ISO/IEC
            // 01     No adaptation_field, payload only
            // 10     Adaptation_field only, no payload
            // 11     Adaptation_field followed by payload
            this.afc = (buffer[3] >> 4) & 3;
            // '1' indicates that the discontinuity state is true for the current Transport Stream packet.
            // this.continuity_counter = buffer[3] & 0xf;
            // self defines.
            this.has_payload = this.afc & 1;
            this.has_adaptation = this.afc & 2;
            // this.is_discontinuity = this.has_adaptation && buffer[4] != 0 /* with length > 0 */ && buffer[5] & 0x80;
            /* and discontinuity indicated */
            if (this.has_payload) {
                if (this.has_adaptation) {
                    let adaptation_field_length = buffer[4];
                    this.payload = buffer.subarray(5 + adaptation_field_length);
                }
                else {
                    this.payload = buffer.subarray(4);
                }
            }
        }
        valid() {
            return this.sync_byte === SYNC_BYTE && this.has_payload === 1;
        }
    }

    /**
     * @file: demux.js, created at Monday, 23rd December 2019 3:47:23 pm
     * @copyright Copyright (c) 2020
     * @author gem <gems.xu@gmail.com>
     */
    const CHUNK_BYTE_LENGTH = 188; // Transport Stream chunks shall be 188 bytes long.
    class TSDemux extends DemuxFacade {
        constructor(options = {}) {
            super(options);
            this.psi_ = new PSI(this.ctx_);
            this.pesStream_ = new PesStream(this.ctx_, this.psi_);
            this.elementaryStream_ = new ElementaryStream(this.ctx_, this.psi_, options);
            this.complexStream_ = new M2TSComplexStream(this.ctx_, this.psi_);
            // Compose pipeline
            this.pipe(this.pesStream_);
            this.pesStream_.pipe(this.elementaryStream_);
            this.elementaryStream_.pipe(this.complexStream_);
            super.listenEndStream_();
        }
        /**
         * This is end pipeline stream
         */
        get endStream() {
            let stream = this.elementaryStream_;
            if (this.options_.decodeCodec) {
                stream = this.complexStream_;
            }
            return stream;
        }
        /**
         * TS push support streaming incomplete data push.
         * @param buffer
         * @param conf
         * @param conf.done - If you need the done event, this boolean needs to be set
         */
        push(buffer, conf) {
            const { done } = conf;
            const { options_, ctx_, cache_buffer_, psi_ } = this;
            let newBuf = super.constraintPushData_(buffer);
            let cacheByteLength = cache_buffer_.byteLength;
            let byteOffset = null;
            options_.config = conf;
            logger.log(`hls demux received ${newBuf.byteLength} bytes, cache ${cacheByteLength} bytes. ${done ? 'chunk done' : ''}`);
            cache_buffer_.append(newBuf);
            while (cache_buffer_.byteLength >= CHUNK_BYTE_LENGTH) {
                let chunk = cache_buffer_.cut(CHUNK_BYTE_LENGTH);
                // The pushed buffer may be so small that can't cut a ts chunk.
                if (chunk) {
                    let packet = new Packet(chunk);
                    if (packet.valid()) {
                        psi_.parse(packet);
                        this.emit('data', packet);
                    }
                    else {
                        let errMsg = `Encounter invalid ts packet, packet_length(${chunk.length}), cache_length(${this.cache_buffer_.byteLength}), has_payload(${packet.has_payload}), data(${chunk})`;
                        logger.error(errMsg);
                        this.reset();
                        ctx_.emit('error', muxErrorCode.TS_SYNC_BYTE, errMsg, {
                            startByte: byteOffset,
                            endByte: byteOffset + chunk.byteLength
                        });
                        break;
                    }
                    byteOffset += chunk.byteLength;
                }
            }
            if (cache_buffer_.empty && done) {
                // logger.log('mux packet done!');
                this.emit('done');
            }
        }
        reset() {
            this.cache_buffer_.clear();
            this.emit('reset');
        }
    }

    exports.TSDemux = TSDemux;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
