/*! qvs built @1/20/2020, 10:21:06 AM */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Demuxer"] = factory();
	else
		root["Demuxer"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	/** ===== Webpack2 Polyfill ===== **/
/******/ 		/** ===== empty module export ===== **/
/******/
/******/ 							if (!Object.defineProperty || !Object.defineProperties || !Object.create 
/******/ 								|| !window.ArrayBuffer || !window.Uint8Array) {
/******/ 								return {};
/******/ 							}
/******/ 						
/******/ 		/** ===== empty module export end ===== **/
/******/ 	/** ===== Webpack2 Polyfill end ===== **/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @file: index.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 * @description module entry.
 */

/* eslint-env commonjs */
module.exports = __webpack_require__(1)["default"];

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_buffer_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(65);
/* harmony import */ var core_js_modules_es_array_buffer_slice__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_buffer_slice__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(75);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_typed_array_uint8_array__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(79);
/* harmony import */ var core_js_modules_es_typed_array_uint8_array__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_uint8_array__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_typed_array_copy_within__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(95);
/* harmony import */ var core_js_modules_es_typed_array_copy_within__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_copy_within__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_typed_array_every__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(97);
/* harmony import */ var core_js_modules_es_typed_array_every__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_every__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_typed_array_fill__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(98);
/* harmony import */ var core_js_modules_es_typed_array_fill__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_fill__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_typed_array_filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(99);
/* harmony import */ var core_js_modules_es_typed_array_filter__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_filter__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_typed_array_find__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(100);
/* harmony import */ var core_js_modules_es_typed_array_find__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_find__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_typed_array_find_index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(101);
/* harmony import */ var core_js_modules_es_typed_array_find_index__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_find_index__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_typed_array_for_each__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(102);
/* harmony import */ var core_js_modules_es_typed_array_for_each__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_for_each__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_typed_array_includes__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(103);
/* harmony import */ var core_js_modules_es_typed_array_includes__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_includes__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_typed_array_index_of__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(104);
/* harmony import */ var core_js_modules_es_typed_array_index_of__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_index_of__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_typed_array_iterator__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(105);
/* harmony import */ var core_js_modules_es_typed_array_iterator__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_iterator__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_typed_array_join__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(106);
/* harmony import */ var core_js_modules_es_typed_array_join__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_join__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_typed_array_last_index_of__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(107);
/* harmony import */ var core_js_modules_es_typed_array_last_index_of__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_last_index_of__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_typed_array_map__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(111);
/* harmony import */ var core_js_modules_es_typed_array_map__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_map__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_typed_array_reduce__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(112);
/* harmony import */ var core_js_modules_es_typed_array_reduce__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_reduce__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_typed_array_reduce_right__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(114);
/* harmony import */ var core_js_modules_es_typed_array_reduce_right__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_reduce_right__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_typed_array_reverse__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(115);
/* harmony import */ var core_js_modules_es_typed_array_reverse__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_reverse__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_es_typed_array_set__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(116);
/* harmony import */ var core_js_modules_es_typed_array_set__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_set__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_es_typed_array_slice__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(117);
/* harmony import */ var core_js_modules_es_typed_array_slice__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_slice__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_es_typed_array_some__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(118);
/* harmony import */ var core_js_modules_es_typed_array_some__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_some__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_es_typed_array_sort__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(119);
/* harmony import */ var core_js_modules_es_typed_array_sort__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_sort__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var core_js_modules_es_typed_array_subarray__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(120);
/* harmony import */ var core_js_modules_es_typed_array_subarray__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_subarray__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var core_js_modules_es_typed_array_to_locale_string__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(121);
/* harmony import */ var core_js_modules_es_typed_array_to_locale_string__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_to_locale_string__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var core_js_modules_es_typed_array_to_string__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(122);
/* harmony import */ var core_js_modules_es_typed_array_to_string__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_to_string__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(123);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(124);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(125);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(128);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(127);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_31__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(129);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_32__);
/* harmony import */ var _util_logger__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(131);
/* harmony import */ var _util_stream__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(151);
/* harmony import */ var _util_event_manager__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(152);
/* harmony import */ var _util_is__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(155);
/* harmony import */ var _enum_events__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(159);
/* harmony import */ var _m2t_demux__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(160);
/* harmony import */ var _mp4_demux__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(207);


































/**
 * @file: demuxer.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */







var muxers = {
  m2ts: _m2t_demux__WEBPACK_IMPORTED_MODULE_38__["default"],
  mp4: _mp4_demux__WEBPACK_IMPORTED_MODULE_39__["default"]
};

var Demuxer =
/*#__PURE__*/
function (_Stream) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_32___default()(Demuxer, _Stream);

  /**
   * Mux Constructor
   * @param {String} from - the source to demux
   * @param {Object} [options] - mux configure
   */
  function Demuxer(from) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_27___default()(this, Demuxer);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_29___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_30___default()(Demuxer).call(this));

    if (options.debug) {
      _util_logger__WEBPACK_IMPORTED_MODULE_33__["default"].enable = true;
    }
    /**
     * @type {Demux}
     * @private
     */


    _this._demuxer = new muxers[from](_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_31___default()(_this), options);
    /**
     * @type {EventManager}
     * @private
     */

    _this._eventManager = new _util_event_manager__WEBPACK_IMPORTED_MODULE_35__["default"]();

    _this._eventManager.on(_this._demuxer.endStream, 'data', function (data) {
      _this.emit(_enum_events__WEBPACK_IMPORTED_MODULE_37__["default"].DEMUX_DATA, data);
    }).on(_this._demuxer.endStream, 'done', function (data) {
      _this.emit(_enum_events__WEBPACK_IMPORTED_MODULE_37__["default"].DONE, data);
    });

    return _this;
  }
  /**
   * Pipe the arrayBuffer to the demuxer.
   * @param {(ArrayBuffer|Uint8Array)} buf
   * @param {Object} conf
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_28___default()(Demuxer, [{
    key: "push",
    value: function push(buf) {
      var conf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!Object(_util_is__WEBPACK_IMPORTED_MODULE_36__["isArrayBuffer"])(buf) && !Object(_util_is__WEBPACK_IMPORTED_MODULE_36__["isUint8Array"])(buf)) {
        return null;
      }

      if (Object(_util_is__WEBPACK_IMPORTED_MODULE_36__["isArrayBuffer"])(buf)) {
        buf = new Uint8Array(buf);
      }

      this._demuxer.push(buf, conf);
    }
  }, {
    key: "reset",
    value: function reset() {
      this._demuxer.reset();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._demuxer.unpipe();

      this._demuxer.endStream.unpipe();

      this._eventManager.removeAll();
    }
  }]);

  return Demuxer;
}(_util_stream__WEBPACK_IMPORTED_MODULE_34__["default"]);

Demuxer.Events = _enum_events__WEBPACK_IMPORTED_MODULE_37__["default"];
/* harmony default export */ __webpack_exports__["default"] = (Demuxer);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__(3);
var addToUnscopables = __webpack_require__(8);
var Iterators = __webpack_require__(43);
var InternalStateModule = __webpack_require__(44);
var defineIterator = __webpack_require__(47);

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(4);
var requireObjectCoercible = __webpack_require__(7);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(5);
var classof = __webpack_require__(6);

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(9);
var create = __webpack_require__(29);
var definePropertyModule = __webpack_require__(18);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(10);
var shared = __webpack_require__(12);
var has = __webpack_require__(25);
var uid = __webpack_require__(26);
var NATIVE_SYMBOL = __webpack_require__(27);
var USE_SYMBOL_AS_UID = __webpack_require__(28);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(11)))

/***/ }),
/* 11 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__(13);
var store = __webpack_require__(14);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.4',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(10);
var setGlobal = __webpack_require__(15);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(10);
var createNonEnumerableProperty = __webpack_require__(16);

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(17);
var definePropertyModule = __webpack_require__(18);
var createPropertyDescriptor = __webpack_require__(24);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(5);

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(17);
var IE8_DOM_DEFINE = __webpack_require__(19);
var anObject = __webpack_require__(22);
var toPrimitive = __webpack_require__(23);

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(17);
var fails = __webpack_require__(5);
var createElement = __webpack_require__(20);

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(10);
var isObject = __webpack_require__(21);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(21);

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(21);

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(5);

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_SYMBOL = __webpack_require__(27);

module.exports = NATIVE_SYMBOL
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(22);
var defineProperties = __webpack_require__(30);
var enumBugKeys = __webpack_require__(38);
var hiddenKeys = __webpack_require__(37);
var html = __webpack_require__(39);
var documentCreateElement = __webpack_require__(20);
var sharedKey = __webpack_require__(42);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(17);
var definePropertyModule = __webpack_require__(18);
var anObject = __webpack_require__(22);
var objectKeys = __webpack_require__(31);

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(32);
var enumBugKeys = __webpack_require__(38);

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(25);
var toIndexedObject = __webpack_require__(3);
var indexOf = __webpack_require__(33).indexOf;
var hiddenKeys = __webpack_require__(37);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(3);
var toLength = __webpack_require__(34);
var toAbsoluteIndex = __webpack_require__(36);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(35);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(35);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 38 */
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(40);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(41);
var global = __webpack_require__(10);

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(10);

module.exports = global;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(12);
var uid = __webpack_require__(26);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(45);
var global = __webpack_require__(10);
var isObject = __webpack_require__(21);
var createNonEnumerableProperty = __webpack_require__(16);
var objectHas = __webpack_require__(25);
var sharedKey = __webpack_require__(42);
var hiddenKeys = __webpack_require__(37);

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(10);
var inspectSource = __webpack_require__(46);

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(14);

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(48);
var createIteratorConstructor = __webpack_require__(57);
var getPrototypeOf = __webpack_require__(59);
var setPrototypeOf = __webpack_require__(63);
var setToStringTag = __webpack_require__(62);
var createNonEnumerableProperty = __webpack_require__(16);
var redefine = __webpack_require__(51);
var wellKnownSymbol = __webpack_require__(9);
var IS_PURE = __webpack_require__(13);
var Iterators = __webpack_require__(43);
var IteratorsCore = __webpack_require__(58);

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(10);
var getOwnPropertyDescriptor = __webpack_require__(49).f;
var createNonEnumerableProperty = __webpack_require__(16);
var redefine = __webpack_require__(51);
var setGlobal = __webpack_require__(15);
var copyConstructorProperties = __webpack_require__(52);
var isForced = __webpack_require__(56);

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(17);
var propertyIsEnumerableModule = __webpack_require__(50);
var createPropertyDescriptor = __webpack_require__(24);
var toIndexedObject = __webpack_require__(3);
var toPrimitive = __webpack_require__(23);
var has = __webpack_require__(25);
var IE8_DOM_DEFINE = __webpack_require__(19);

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(10);
var createNonEnumerableProperty = __webpack_require__(16);
var has = __webpack_require__(25);
var setGlobal = __webpack_require__(15);
var inspectSource = __webpack_require__(46);
var InternalStateModule = __webpack_require__(44);

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(25);
var ownKeys = __webpack_require__(53);
var getOwnPropertyDescriptorModule = __webpack_require__(49);
var definePropertyModule = __webpack_require__(18);

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(40);
var getOwnPropertyNamesModule = __webpack_require__(54);
var getOwnPropertySymbolsModule = __webpack_require__(55);
var anObject = __webpack_require__(22);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(32);
var enumBugKeys = __webpack_require__(38);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),
/* 55 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(5);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__(58).IteratorPrototype;
var create = __webpack_require__(29);
var createPropertyDescriptor = __webpack_require__(24);
var setToStringTag = __webpack_require__(62);
var Iterators = __webpack_require__(43);

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getPrototypeOf = __webpack_require__(59);
var createNonEnumerableProperty = __webpack_require__(16);
var has = __webpack_require__(25);
var wellKnownSymbol = __webpack_require__(9);
var IS_PURE = __webpack_require__(13);

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(25);
var toObject = __webpack_require__(60);
var sharedKey = __webpack_require__(42);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(61);

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(7);

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(5);

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(18).f;
var has = __webpack_require__(25);
var wellKnownSymbol = __webpack_require__(9);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(22);
var aPossiblePrototype = __webpack_require__(64);

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(21);

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(48);
var fails = __webpack_require__(5);
var ArrayBufferModule = __webpack_require__(66);
var anObject = __webpack_require__(22);
var toAbsoluteIndex = __webpack_require__(36);
var toLength = __webpack_require__(34);
var speciesConstructor = __webpack_require__(73);

var ArrayBuffer = ArrayBufferModule.ArrayBuffer;
var DataView = ArrayBufferModule.DataView;
var nativeArrayBufferSlice = ArrayBuffer.prototype.slice;

var INCORRECT_SLICE = fails(function () {
  return !new ArrayBuffer(2).slice(1, undefined).byteLength;
});

// `ArrayBuffer.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-arraybuffer.prototype.slice
$({ target: 'ArrayBuffer', proto: true, unsafe: true, forced: INCORRECT_SLICE }, {
  slice: function slice(start, end) {
    if (nativeArrayBufferSlice !== undefined && end === undefined) {
      return nativeArrayBufferSlice.call(anObject(this), start); // FF fix
    }
    var length = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    var result = new (speciesConstructor(this, ArrayBuffer))(toLength(fin - first));
    var viewSource = new DataView(this);
    var viewTarget = new DataView(result);
    var index = 0;
    while (first < fin) {
      viewTarget.setUint8(index++, viewSource.getUint8(first++));
    } return result;
  }
});


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(10);
var DESCRIPTORS = __webpack_require__(17);
var NATIVE_ARRAY_BUFFER = __webpack_require__(67);
var createNonEnumerableProperty = __webpack_require__(16);
var redefineAll = __webpack_require__(68);
var fails = __webpack_require__(5);
var anInstance = __webpack_require__(69);
var toInteger = __webpack_require__(35);
var toLength = __webpack_require__(34);
var toIndex = __webpack_require__(70);
var IEEE754 = __webpack_require__(71);
var getPrototypeOf = __webpack_require__(59);
var setPrototypeOf = __webpack_require__(63);
var getOwnPropertyNames = __webpack_require__(54).f;
var defineProperty = __webpack_require__(18).f;
var arrayFill = __webpack_require__(72);
var setToStringTag = __webpack_require__(62);
var InternalStateModule = __webpack_require__(44);

var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length';
var WRONG_INDEX = 'Wrong index';
var NativeArrayBuffer = global[ARRAY_BUFFER];
var $ArrayBuffer = NativeArrayBuffer;
var $DataView = global[DATA_VIEW];
var $DataViewPrototype = $DataView && $DataView[PROTOTYPE];
var ObjectPrototype = Object.prototype;
var RangeError = global.RangeError;

var packIEEE754 = IEEE754.pack;
var unpackIEEE754 = IEEE754.unpack;

var packInt8 = function (number) {
  return [number & 0xFF];
};

var packInt16 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF];
};

var packInt32 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
};

var unpackInt32 = function (buffer) {
  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
};

var packFloat32 = function (number) {
  return packIEEE754(number, 23, 4);
};

var packFloat64 = function (number) {
  return packIEEE754(number, 52, 8);
};

var addGetter = function (Constructor, key) {
  defineProperty(Constructor[PROTOTYPE], key, { get: function () { return getInternalState(this)[key]; } });
};

var get = function (view, count, index, isLittleEndian) {
  var intIndex = toIndex(index);
  var store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  var bytes = getInternalState(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = bytes.slice(start, start + count);
  return isLittleEndian ? pack : pack.reverse();
};

var set = function (view, count, index, conversion, value, isLittleEndian) {
  var intIndex = toIndex(index);
  var store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  var bytes = getInternalState(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = conversion(+value);
  for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
};

if (!NATIVE_ARRAY_BUFFER) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    setInternalState(this, {
      bytes: arrayFill.call(new Array(byteLength), 0),
      byteLength: byteLength
    });
    if (!DESCRIPTORS) this.byteLength = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = getInternalState(buffer).byteLength;
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    setInternalState(this, {
      buffer: buffer,
      byteLength: byteLength,
      byteOffset: offset
    });
    if (!DESCRIPTORS) {
      this.buffer = buffer;
      this.byteLength = byteLength;
      this.byteOffset = offset;
    }
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, 'byteLength');
    addGetter($DataView, 'buffer');
    addGetter($DataView, 'byteLength');
    addGetter($DataView, 'byteOffset');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
    }
  });
} else {
  if (!fails(function () {
    NativeArrayBuffer(1);
  }) || !fails(function () {
    new NativeArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new NativeArrayBuffer(); // eslint-disable-line no-new
    new NativeArrayBuffer(1.5); // eslint-disable-line no-new
    new NativeArrayBuffer(NaN); // eslint-disable-line no-new
    return NativeArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new NativeArrayBuffer(toIndex(length));
    };
    var ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE] = NativeArrayBuffer[PROTOTYPE];
    for (var keys = getOwnPropertyNames(NativeArrayBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) {
        createNonEnumerableProperty($ArrayBuffer, key, NativeArrayBuffer[key]);
      }
    }
    ArrayBufferPrototype.constructor = $ArrayBuffer;
  }

  // WebKit bug - the same parent prototype for typed arrays and data view
  if (setPrototypeOf && getPrototypeOf($DataViewPrototype) !== ObjectPrototype) {
    setPrototypeOf($DataViewPrototype, ObjectPrototype);
  }

  // iOS Safari 7.x bug
  var testView = new $DataView(new $ArrayBuffer(2));
  var nativeSetInt8 = $DataViewPrototype.setInt8;
  testView.setInt8(0, 2147483648);
  testView.setInt8(1, 2147483649);
  if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll($DataViewPrototype, {
    setInt8: function setInt8(byteOffset, value) {
      nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, { unsafe: true });
}

setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);

module.exports = {
  ArrayBuffer: $ArrayBuffer,
  DataView: $DataView
};


/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = typeof ArrayBuffer !== 'undefined' && typeof DataView !== 'undefined';


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(51);

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};


/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(35);
var toLength = __webpack_require__(34);

// `ToIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-toindex
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length or index');
  return length;
};


/***/ }),
/* 71 */
/***/ (function(module, exports) {

// IEEE754 conversions based on https://github.com/feross/ieee754
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = 1 / 0;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;

var pack = function (number, mantissaLength, bytes) {
  var buffer = new Array(bytes);
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
  var index = 0;
  var exponent, mantissa, c;
  number = abs(number);
  // eslint-disable-next-line no-self-compare
  if (number != number || number === Infinity) {
    // eslint-disable-next-line no-self-compare
    mantissa = number != number ? 1 : 0;
    exponent = eMax;
  } else {
    exponent = floor(log(number) / LN2);
    if (number * (c = pow(2, -exponent)) < 1) {
      exponent--;
      c *= 2;
    }
    if (exponent + eBias >= 1) {
      number += rt / c;
    } else {
      number += rt * pow(2, 1 - eBias);
    }
    if (number * c >= 2) {
      exponent++;
      c /= 2;
    }
    if (exponent + eBias >= eMax) {
      mantissa = 0;
      exponent = eMax;
    } else if (exponent + eBias >= 1) {
      mantissa = (number * c - 1) * pow(2, mantissaLength);
      exponent = exponent + eBias;
    } else {
      mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
      exponent = 0;
    }
  }
  for (; mantissaLength >= 8; buffer[index++] = mantissa & 255, mantissa /= 256, mantissaLength -= 8);
  exponent = exponent << mantissaLength | mantissa;
  exponentLength += mantissaLength;
  for (; exponentLength > 0; buffer[index++] = exponent & 255, exponent /= 256, exponentLength -= 8);
  buffer[--index] |= sign * 128;
  return buffer;
};

var unpack = function (buffer, mantissaLength) {
  var bytes = buffer.length;
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var nBits = exponentLength - 7;
  var index = bytes - 1;
  var sign = buffer[index--];
  var exponent = sign & 127;
  var mantissa;
  sign >>= 7;
  for (; nBits > 0; exponent = exponent * 256 + buffer[index], index--, nBits -= 8);
  mantissa = exponent & (1 << -nBits) - 1;
  exponent >>= -nBits;
  nBits += mantissaLength;
  for (; nBits > 0; mantissa = mantissa * 256 + buffer[index], index--, nBits -= 8);
  if (exponent === 0) {
    exponent = 1 - eBias;
  } else if (exponent === eMax) {
    return mantissa ? NaN : sign ? -Infinity : Infinity;
  } else {
    mantissa = mantissa + pow(2, mantissaLength);
    exponent = exponent - eBias;
  } return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
};

module.exports = {
  pack: pack,
  unpack: unpack
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toObject = __webpack_require__(60);
var toAbsoluteIndex = __webpack_require__(36);
var toLength = __webpack_require__(34);

// `Array.prototype.fill` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.fill
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(22);
var aFunction = __webpack_require__(74);
var wellKnownSymbol = __webpack_require__(9);

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};


/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(76);
var redefine = __webpack_require__(51);
var toString = __webpack_require__(77);

// `Object.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(9);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(76);
var classof = __webpack_require__(78);

// `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(76);
var classofRaw = __webpack_require__(6);
var wellKnownSymbol = __webpack_require__(9);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var createTypedArrayConstructor = __webpack_require__(80);

// `Uint8Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Uint8', function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(48);
var global = __webpack_require__(10);
var DESCRIPTORS = __webpack_require__(17);
var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = __webpack_require__(81);
var ArrayBufferViewCore = __webpack_require__(83);
var ArrayBufferModule = __webpack_require__(66);
var anInstance = __webpack_require__(69);
var createPropertyDescriptor = __webpack_require__(24);
var createNonEnumerableProperty = __webpack_require__(16);
var toLength = __webpack_require__(34);
var toIndex = __webpack_require__(70);
var toOffset = __webpack_require__(84);
var toPrimitive = __webpack_require__(23);
var has = __webpack_require__(25);
var classof = __webpack_require__(78);
var isObject = __webpack_require__(21);
var create = __webpack_require__(29);
var setPrototypeOf = __webpack_require__(63);
var getOwnPropertyNames = __webpack_require__(54).f;
var typedArrayFrom = __webpack_require__(86);
var forEach = __webpack_require__(90).forEach;
var setSpecies = __webpack_require__(93);
var definePropertyModule = __webpack_require__(18);
var getOwnPropertyDescriptorModule = __webpack_require__(49);
var InternalStateModule = __webpack_require__(44);
var inheritIfRequired = __webpack_require__(94);

var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var round = Math.round;
var RangeError = global.RangeError;
var ArrayBuffer = ArrayBufferModule.ArrayBuffer;
var DataView = ArrayBufferModule.DataView;
var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
var TYPED_ARRAY_TAG = ArrayBufferViewCore.TYPED_ARRAY_TAG;
var TypedArray = ArrayBufferViewCore.TypedArray;
var TypedArrayPrototype = ArrayBufferViewCore.TypedArrayPrototype;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var isTypedArray = ArrayBufferViewCore.isTypedArray;
var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
var WRONG_LENGTH = 'Wrong length';

var fromList = function (C, list) {
  var index = 0;
  var length = list.length;
  var result = new (aTypedArrayConstructor(C))(length);
  while (length > index) result[index] = list[index++];
  return result;
};

var addGetter = function (it, key) {
  nativeDefineProperty(it, key, { get: function () {
    return getInternalState(this)[key];
  } });
};

var isArrayBuffer = function (it) {
  var klass;
  return it instanceof ArrayBuffer || (klass = classof(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
};

var isTypedArrayIndex = function (target, key) {
  return isTypedArray(target)
    && typeof key != 'symbol'
    && key in target
    && String(+key) == String(key);
};

var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
  return isTypedArrayIndex(target, key = toPrimitive(key, true))
    ? createPropertyDescriptor(2, target[key])
    : nativeGetOwnPropertyDescriptor(target, key);
};

var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
  if (isTypedArrayIndex(target, key = toPrimitive(key, true))
    && isObject(descriptor)
    && has(descriptor, 'value')
    && !has(descriptor, 'get')
    && !has(descriptor, 'set')
    // TODO: add validation descriptor w/o calling accessors
    && !descriptor.configurable
    && (!has(descriptor, 'writable') || descriptor.writable)
    && (!has(descriptor, 'enumerable') || descriptor.enumerable)
  ) {
    target[key] = descriptor.value;
    return target;
  } return nativeDefineProperty(target, key, descriptor);
};

if (DESCRIPTORS) {
  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
    getOwnPropertyDescriptorModule.f = wrappedGetOwnPropertyDescriptor;
    definePropertyModule.f = wrappedDefineProperty;
    addGetter(TypedArrayPrototype, 'buffer');
    addGetter(TypedArrayPrototype, 'byteOffset');
    addGetter(TypedArrayPrototype, 'byteLength');
    addGetter(TypedArrayPrototype, 'length');
  }

  $({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
    defineProperty: wrappedDefineProperty
  });

  module.exports = function (TYPE, wrapper, CLAMPED) {
    var BYTES = TYPE.match(/\d+$/)[0] / 8;
    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + TYPE;
    var SETTER = 'set' + TYPE;
    var NativeTypedArrayConstructor = global[CONSTRUCTOR_NAME];
    var TypedArrayConstructor = NativeTypedArrayConstructor;
    var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
    var exported = {};

    var getter = function (that, index) {
      var data = getInternalState(that);
      return data.view[GETTER](index * BYTES + data.byteOffset, true);
    };

    var setter = function (that, index, value) {
      var data = getInternalState(that);
      if (CLAMPED) value = (value = round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
      data.view[SETTER](index * BYTES + data.byteOffset, value, true);
    };

    var addElement = function (that, index) {
      nativeDefineProperty(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };

    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
      TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
        anInstance(that, TypedArrayConstructor, CONSTRUCTOR_NAME);
        var index = 0;
        var byteOffset = 0;
        var buffer, byteLength, length;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new ArrayBuffer(byteLength);
        } else if (isArrayBuffer(data)) {
          buffer = data;
          byteOffset = toOffset(offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - byteOffset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + byteOffset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (isTypedArray(data)) {
          return fromList(TypedArrayConstructor, data);
        } else {
          return typedArrayFrom.call(TypedArrayConstructor, data);
        }
        setInternalState(that, {
          buffer: buffer,
          byteOffset: byteOffset,
          byteLength: byteLength,
          length: length,
          view: new DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create(TypedArrayPrototype);
    } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS) {
      TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
        anInstance(dummy, TypedArrayConstructor, CONSTRUCTOR_NAME);
        return inheritIfRequired(function () {
          if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
          if (isArrayBuffer(data)) return $length !== undefined
            ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES), $length)
            : typedArrayOffset !== undefined
              ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES))
              : new NativeTypedArrayConstructor(data);
          if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
          return typedArrayFrom.call(TypedArrayConstructor, data);
        }(), dummy, TypedArrayConstructor);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
        if (!(key in TypedArrayConstructor)) {
          createNonEnumerableProperty(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
        }
      });
      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
    }

    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
    }

    if (TYPED_ARRAY_TAG) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
    }

    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

    $({
      global: true, forced: TypedArrayConstructor != NativeTypedArrayConstructor, sham: !NATIVE_ARRAY_BUFFER_VIEWS
    }, exported);

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
      createNonEnumerableProperty(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
    }

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
    }

    setSpecies(CONSTRUCTOR_NAME);
  };
} else module.exports = function () { /* empty */ };


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-new */
var global = __webpack_require__(10);
var fails = __webpack_require__(5);
var checkCorrectnessOfIteration = __webpack_require__(82);
var NATIVE_ARRAY_BUFFER_VIEWS = __webpack_require__(83).NATIVE_ARRAY_BUFFER_VIEWS;

var ArrayBuffer = global.ArrayBuffer;
var Int8Array = global.Int8Array;

module.exports = !NATIVE_ARRAY_BUFFER_VIEWS || !fails(function () {
  Int8Array(1);
}) || !fails(function () {
  new Int8Array(-1);
}) || !checkCorrectnessOfIteration(function (iterable) {
  new Int8Array();
  new Int8Array(null);
  new Int8Array(1.5);
  new Int8Array(iterable);
}, true) || fails(function () {
  // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
  return new Int8Array(new ArrayBuffer(2), 1, undefined).length !== 1;
});


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(9);

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var NATIVE_ARRAY_BUFFER = __webpack_require__(67);
var DESCRIPTORS = __webpack_require__(17);
var global = __webpack_require__(10);
var isObject = __webpack_require__(21);
var has = __webpack_require__(25);
var classof = __webpack_require__(78);
var createNonEnumerableProperty = __webpack_require__(16);
var redefine = __webpack_require__(51);
var defineProperty = __webpack_require__(18).f;
var getPrototypeOf = __webpack_require__(59);
var setPrototypeOf = __webpack_require__(63);
var wellKnownSymbol = __webpack_require__(9);
var uid = __webpack_require__(26);

var Int8Array = global.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var Uint8ClampedArray = global.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
var TypedArray = Int8Array && getPrototypeOf(Int8Array);
var TypedArrayPrototype = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype);
var ObjectPrototype = Object.prototype;
var isPrototypeOf = ObjectPrototype.isPrototypeOf;

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
// Fixing native typed arrays in Opera Presto crashes the browser, see #595
var NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!setPrototypeOf && classof(global.opera) !== 'Opera';
var TYPED_ARRAY_TAG_REQIRED = false;
var NAME;

var TypedArrayConstructorsList = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};

var isView = function isView(it) {
  var klass = classof(it);
  return klass === 'DataView' || has(TypedArrayConstructorsList, klass);
};

var isTypedArray = function (it) {
  return isObject(it) && has(TypedArrayConstructorsList, classof(it));
};

var aTypedArray = function (it) {
  if (isTypedArray(it)) return it;
  throw TypeError('Target is not a typed array');
};

var aTypedArrayConstructor = function (C) {
  if (setPrototypeOf) {
    if (isPrototypeOf.call(TypedArray, C)) return C;
  } else for (var ARRAY in TypedArrayConstructorsList) if (has(TypedArrayConstructorsList, NAME)) {
    var TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && (C === TypedArrayConstructor || isPrototypeOf.call(TypedArrayConstructor, C))) {
      return C;
    }
  } throw TypeError('Target is not a typed array constructor');
};

var exportTypedArrayMethod = function (KEY, property, forced) {
  if (!DESCRIPTORS) return;
  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
    var TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && has(TypedArrayConstructor.prototype, KEY)) {
      delete TypedArrayConstructor.prototype[KEY];
    }
  }
  if (!TypedArrayPrototype[KEY] || forced) {
    redefine(TypedArrayPrototype, KEY, forced ? property
      : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property);
  }
};

var exportTypedArrayStaticMethod = function (KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!DESCRIPTORS) return;
  if (setPrototypeOf) {
    if (forced) for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global[ARRAY];
      if (TypedArrayConstructor && has(TypedArrayConstructor, KEY)) {
        delete TypedArrayConstructor[KEY];
      }
    }
    if (!TypedArray[KEY] || forced) {
      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
      try {
        return redefine(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && Int8Array[KEY] || property);
      } catch (error) { /* empty */ }
    } else return;
  }
  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      redefine(TypedArrayConstructor, KEY, property);
    }
  }
};

for (NAME in TypedArrayConstructorsList) {
  if (!global[NAME]) NATIVE_ARRAY_BUFFER_VIEWS = false;
}

// WebKit bug - typed arrays constructors prototype is Object.prototype
if (!NATIVE_ARRAY_BUFFER_VIEWS || typeof TypedArray != 'function' || TypedArray === Function.prototype) {
  // eslint-disable-next-line no-shadow
  TypedArray = function TypedArray() {
    throw TypeError('Incorrect invocation');
  };
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME], TypedArray);
  }
}

if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype) {
  TypedArrayPrototype = TypedArray.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME].prototype, TypedArrayPrototype);
  }
}

// WebKit bug - one more object in Uint8ClampedArray prototype chain
if (NATIVE_ARRAY_BUFFER_VIEWS && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
  setPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
}

if (DESCRIPTORS && !has(TypedArrayPrototype, TO_STRING_TAG)) {
  TYPED_ARRAY_TAG_REQIRED = true;
  defineProperty(TypedArrayPrototype, TO_STRING_TAG, { get: function () {
    return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
  } });
  for (NAME in TypedArrayConstructorsList) if (global[NAME]) {
    createNonEnumerableProperty(global[NAME], TYPED_ARRAY_TAG, NAME);
  }
}

module.exports = {
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQIRED && TYPED_ARRAY_TAG,
  aTypedArray: aTypedArray,
  aTypedArrayConstructor: aTypedArrayConstructor,
  exportTypedArrayMethod: exportTypedArrayMethod,
  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
  isView: isView,
  isTypedArray: isTypedArray,
  TypedArray: TypedArray,
  TypedArrayPrototype: TypedArrayPrototype
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var toPositiveInteger = __webpack_require__(85);

module.exports = function (it, BYTES) {
  var offset = toPositiveInteger(it);
  if (offset % BYTES) throw RangeError('Wrong offset');
  return offset;
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(35);

module.exports = function (it) {
  var result = toInteger(it);
  if (result < 0) throw RangeError("The argument can't be less than 0");
  return result;
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var toObject = __webpack_require__(60);
var toLength = __webpack_require__(34);
var getIteratorMethod = __webpack_require__(87);
var isArrayIteratorMethod = __webpack_require__(88);
var bind = __webpack_require__(89);
var aTypedArrayConstructor = __webpack_require__(83).aTypedArrayConstructor;

module.exports = function from(source /* , mapfn, thisArg */) {
  var O = toObject(source);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var i, length, result, step, iterator, next;
  if (iteratorMethod != undefined && !isArrayIteratorMethod(iteratorMethod)) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    O = [];
    while (!(step = next.call(iterator)).done) {
      O.push(step.value);
    }
  }
  if (mapping && argumentsLength > 2) {
    mapfn = bind(mapfn, arguments[2], 2);
  }
  length = toLength(O.length);
  result = new (aTypedArrayConstructor(this))(length);
  for (i = 0; length > i; i++) {
    result[i] = mapping ? mapfn(O[i], i) : O[i];
  }
  return result;
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(78);
var Iterators = __webpack_require__(43);
var wellKnownSymbol = __webpack_require__(9);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(9);
var Iterators = __webpack_require__(43);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(74);

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__(89);
var IndexedObject = __webpack_require__(4);
var toObject = __webpack_require__(60);
var toLength = __webpack_require__(34);
var arraySpeciesCreate = __webpack_require__(91);

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(21);
var isArray = __webpack_require__(92);
var wellKnownSymbol = __webpack_require__(9);

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(6);

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(40);
var definePropertyModule = __webpack_require__(18);
var wellKnownSymbol = __webpack_require__(9);
var DESCRIPTORS = __webpack_require__(17);

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(21);
var setPrototypeOf = __webpack_require__(63);

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(83);
var $copyWithin = __webpack_require__(96);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.copyWithin` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.copywithin
exportTypedArrayMethod('copyWithin', function copyWithin(target, start /* , end */) {
  return $copyWithin.call(aTypedArray(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
});


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toObject = __webpack_require__(60);
var toAbsoluteIndex = __webpack_require__(36);
var toLength = __webpack_require__(34);

var min = Math.min;

// `Array.prototype.copyWithin` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.copywithin
module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(83);
var $every = __webpack_require__(90).every;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.every` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.every
exportTypedArrayMethod('every', function every(callbackfn /* , thisArg */) {
  return $every(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(83);
var $fill = __webpack_require__(72);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.fill` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.fill
// eslint-disable-next-line no-unused-vars
exportTypedArrayMethod('fill', function fill(value /* , start, end */) {
  return $fill.apply(aTypedArray(this), arguments);
});


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(83);
var $filter = __webpack_require__(90).filter;
var speciesConstructor = __webpack_require__(73);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.filter
exportTypedArrayMethod('filter', function filter(callbackfn /* , thisArg */) {
  var list = $filter(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  var C = speciesConstructor(this, this.constructor);
  var index = 0;
  var length = list.length;
  var result = new (aTypedArrayConstructor(C))(length);
  while (length > index) result[index] = list[index++];
  return result;
});


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(83);
var $find = __webpack_require__(90).find;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.find` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.find
exportTypedArrayMethod('find', function find(predicate /* , thisArg */) {
  return $find(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(83);
var $findIndex = __webpack_require__(90).findIndex;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.findIndex` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.findindex
exportTypedArrayMethod('findIndex', function findIndex(predicate /* , thisArg */) {
  return $findIndex(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(83);
var $forEach = __webpack_require__(90).forEach;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.foreach
exportTypedArrayMethod('forEach', function forEach(callbackfn /* , thisArg */) {
  $forEach(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(83);
var $includes = __webpack_require__(33).includes;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.includes
exportTypedArrayMethod('includes', function includes(searchElement /* , fromIndex */) {
  return $includes(aTypedArray(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(83);
var $indexOf = __webpack_require__(33).indexOf;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.indexof
exportTypedArrayMethod('indexOf', function indexOf(searchElement /* , fromIndex */) {
  return $indexOf(aTypedArray(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(10);
var ArrayBufferViewCore = __webpack_require__(83);
var ArrayIterators = __webpack_require__(2);
var wellKnownSymbol = __webpack_require__(9);

var ITERATOR = wellKnownSymbol('iterator');
var Uint8Array = global.Uint8Array;
var arrayValues = ArrayIterators.values;
var arrayKeys = ArrayIterators.keys;
var arrayEntries = ArrayIterators.entries;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var nativeTypedArrayIterator = Uint8Array && Uint8Array.prototype[ITERATOR];

var CORRECT_ITER_NAME = !!nativeTypedArrayIterator
  && (nativeTypedArrayIterator.name == 'values' || nativeTypedArrayIterator.name == undefined);

var typedArrayValues = function values() {
  return arrayValues.call(aTypedArray(this));
};

// `%TypedArray%.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.entries
exportTypedArrayMethod('entries', function entries() {
  return arrayEntries.call(aTypedArray(this));
});
// `%TypedArray%.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.keys
exportTypedArrayMethod('keys', function keys() {
  return arrayKeys.call(aTypedArray(this));
});
// `%TypedArray%.prototype.values` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.values
exportTypedArrayMethod('values', typedArrayValues, !CORRECT_ITER_NAME);
// `%TypedArray%.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype-@@iterator
exportTypedArrayMethod(ITERATOR, typedArrayValues, !CORRECT_ITER_NAME);


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(83);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $join = [].join;

// `%TypedArray%.prototype.join` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.join
// eslint-disable-next-line no-unused-vars
exportTypedArrayMethod('join', function join(separator) {
  return $join.apply(aTypedArray(this), arguments);
});


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(83);
var $lastIndexOf = __webpack_require__(108);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.lastIndexOf` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.lastindexof
// eslint-disable-next-line no-unused-vars
exportTypedArrayMethod('lastIndexOf', function lastIndexOf(searchElement /* , fromIndex */) {
  return $lastIndexOf.apply(aTypedArray(this), arguments);
});


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__(3);
var toInteger = __webpack_require__(35);
var toLength = __webpack_require__(34);
var arrayMethodIsStrict = __webpack_require__(109);
var arrayMethodUsesToLength = __webpack_require__(110);

var min = Math.min;
var nativeLastIndexOf = [].lastIndexOf;
var NEGATIVE_ZERO = !!nativeLastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('lastIndexOf');
// For preventing possible almost infinite loop in non-standard implementations, test the forward version of the method
var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });
var FORCED = NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH;

// `Array.prototype.lastIndexOf` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof
module.exports = FORCED ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
  // convert -0 to +0
  if (NEGATIVE_ZERO) return nativeLastIndexOf.apply(this, arguments) || 0;
  var O = toIndexedObject(this);
  var length = toLength(O.length);
  var index = length - 1;
  if (arguments.length > 1) index = min(index, toInteger(arguments[1]));
  if (index < 0) index = length + index;
  for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
  return -1;
} : nativeLastIndexOf;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(5);

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(17);
var fails = __webpack_require__(5);
var has = __webpack_require__(25);

var defineProperty = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

module.exports = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !DESCRIPTORS) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(83);
var $map = __webpack_require__(90).map;
var speciesConstructor = __webpack_require__(73);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.map` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.map
exportTypedArrayMethod('map', function map(mapfn /* , thisArg */) {
  return $map(aTypedArray(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
    return new (aTypedArrayConstructor(speciesConstructor(O, O.constructor)))(length);
  });
});


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(83);
var $reduce = __webpack_require__(113).left;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reduce
exportTypedArrayMethod('reduce', function reduce(callbackfn /* , initialValue */) {
  return $reduce(aTypedArray(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(74);
var toObject = __webpack_require__(60);
var IndexedObject = __webpack_require__(4);
var toLength = __webpack_require__(34);

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction(callbackfn);
    var O = toObject(that);
    var self = IndexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

module.exports = {
  // `Array.prototype.reduce` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(83);
var $reduceRight = __webpack_require__(113).right;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.reduceRicht` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reduceright
exportTypedArrayMethod('reduceRight', function reduceRight(callbackfn /* , initialValue */) {
  return $reduceRight(aTypedArray(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(83);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var floor = Math.floor;

// `%TypedArray%.prototype.reverse` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reverse
exportTypedArrayMethod('reverse', function reverse() {
  var that = this;
  var length = aTypedArray(that).length;
  var middle = floor(length / 2);
  var index = 0;
  var value;
  while (index < middle) {
    value = that[index];
    that[index++] = that[--length];
    that[length] = value;
  } return that;
});


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(83);
var toLength = __webpack_require__(34);
var toOffset = __webpack_require__(84);
var toObject = __webpack_require__(60);
var fails = __webpack_require__(5);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

var FORCED = fails(function () {
  // eslint-disable-next-line no-undef
  new Int8Array(1).set({});
});

// `%TypedArray%.prototype.set` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.set
exportTypedArrayMethod('set', function set(arrayLike /* , offset */) {
  aTypedArray(this);
  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
  var length = this.length;
  var src = toObject(arrayLike);
  var len = toLength(src.length);
  var index = 0;
  if (len + offset > length) throw RangeError('Wrong length');
  while (index < len) this[offset + index] = src[index++];
}, FORCED);


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(83);
var speciesConstructor = __webpack_require__(73);
var fails = __webpack_require__(5);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $slice = [].slice;

var FORCED = fails(function () {
  // eslint-disable-next-line no-undef
  new Int8Array(1).slice();
});

// `%TypedArray%.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.slice
exportTypedArrayMethod('slice', function slice(start, end) {
  var list = $slice.call(aTypedArray(this), start, end);
  var C = speciesConstructor(this, this.constructor);
  var index = 0;
  var length = list.length;
  var result = new (aTypedArrayConstructor(C))(length);
  while (length > index) result[index] = list[index++];
  return result;
}, FORCED);


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(83);
var $some = __webpack_require__(90).some;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.some` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.some
exportTypedArrayMethod('some', function some(callbackfn /* , thisArg */) {
  return $some(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(83);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $sort = [].sort;

// `%TypedArray%.prototype.sort` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.sort
exportTypedArrayMethod('sort', function sort(comparefn) {
  return $sort.call(aTypedArray(this), comparefn);
});


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(83);
var toLength = __webpack_require__(34);
var toAbsoluteIndex = __webpack_require__(36);
var speciesConstructor = __webpack_require__(73);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.subarray` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.subarray
exportTypedArrayMethod('subarray', function subarray(begin, end) {
  var O = aTypedArray(this);
  var length = O.length;
  var beginIndex = toAbsoluteIndex(begin, length);
  return new (speciesConstructor(O, O.constructor))(
    O.buffer,
    O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT,
    toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - beginIndex)
  );
});


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(10);
var ArrayBufferViewCore = __webpack_require__(83);
var fails = __webpack_require__(5);

var Int8Array = global.Int8Array;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $toLocaleString = [].toLocaleString;
var $slice = [].slice;

// iOS Safari 6.x fails here
var TO_LOCALE_STRING_BUG = !!Int8Array && fails(function () {
  $toLocaleString.call(new Int8Array(1));
});

var FORCED = fails(function () {
  return [1, 2].toLocaleString() != new Int8Array([1, 2]).toLocaleString();
}) || !fails(function () {
  Int8Array.prototype.toLocaleString.call([1, 2]);
});

// `%TypedArray%.prototype.toLocaleString` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tolocalestring
exportTypedArrayMethod('toLocaleString', function toLocaleString() {
  return $toLocaleString.apply(TO_LOCALE_STRING_BUG ? $slice.call(aTypedArray(this)) : aTypedArray(this), arguments);
}, FORCED);


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var exportTypedArrayMethod = __webpack_require__(83).exportTypedArrayMethod;
var fails = __webpack_require__(5);
var global = __webpack_require__(10);

var Uint8Array = global.Uint8Array;
var Uint8ArrayPrototype = Uint8Array && Uint8Array.prototype || {};
var arrayToString = [].toString;
var arrayJoin = [].join;

if (fails(function () { arrayToString.call({}); })) {
  arrayToString = function toString() {
    return arrayJoin.call(this);
  };
}

var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString != arrayToString;

// `%TypedArray%.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tostring
exportTypedArrayMethod('toString', arrayToString, IS_NOT_ARRAY_METHOD);


/***/ }),
/* 123 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),
/* 124 */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(126);

var assertThisInitialized = __webpack_require__(127);

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),
/* 126 */
/***/ (function(module, exports) {

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),
/* 127 */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),
/* 128 */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(130);

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),
/* 130 */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLogger", function() { return setLogger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLogger", function() { return getLogger; });
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(132);
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(137);
/* harmony import */ var core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(138);
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(139);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(123);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(125);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(128);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(124);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(129);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(143);
/* harmony import */ var _event_emitter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(144);










/**
 * @file: logger.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * utils - logger
 */

/* global WorkerGlobalScope */


var console = _global__WEBPACK_IMPORTED_MODULE_9__["default"].console;
var isWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope && typeof importScripts != 'undefined';
var prefix = '>>>';

var Logger =
/*#__PURE__*/
function (_EventEmitter) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8___default()(Logger, _EventEmitter);

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default()(Logger, [{
    key: "enable",
    get: function get() {
      return this._enable;
    },
    set: function set(value) {
      this._enable = value;
      this.MSG_NAME = '__log__';
    }
  }]);

  function Logger() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default()(this, Logger);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Logger).call(this));
    _this._enable = false;
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default()(Logger, [{
    key: "log",
    value: function log() {
      if (isWorker) {
        logger.emit(this.MSG_NAME, 'log', Array.prototype.slice.call(arguments).join(''));
      } else {
        if (this._enable) {
          var _console$log;

          (_console$log = console.log).call.apply(_console$log, [console, prefix].concat(Array.prototype.slice.call(arguments)));
        }
      }
    }
  }, {
    key: "debug",
    value: function debug() {
      if (isWorker) {
        logger.emit(this.MSG_NAME, 'debug', Array.prototype.slice.call(arguments).join(''));
      } else {
        if (this._enable && console.debug) {
          var _console$debug;

          (_console$debug = console.debug).call.apply(_console$debug, [console, prefix].concat(Array.prototype.slice.call(arguments)));
        }
      }
    }
  }, {
    key: "assert",
    value: function assert() {
      if (this._enable && console.assert) {
        var _console$assert;

        var condition = arguments[0];
        var sliceArgs = Array.prototype.slice.call(arguments, 1);
        sliceArgs.unshift(prefix);

        (_console$assert = console.assert).call.apply(_console$assert, [console, condition].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_3___default()(sliceArgs)));
      }
    }
  }, {
    key: "warn",
    value: function warn() {
      if (isWorker) {
        logger.emit(this.MSG_NAME, 'warn', Array.prototype.slice.call(arguments).join(''));
      } else {
        if (this._enable) {
          var _console$warn;

          (_console$warn = console.warn).call.apply(_console$warn, [console, prefix].concat(Array.prototype.slice.call(arguments)));
        }
      }
    }
  }, {
    key: "error",
    value: function error() {
      if (isWorker) {
        logger.emit(this.MSG_NAME, 'error', Array.prototype.slice.call(arguments).join(''));
      } else {
        if (this._enable) {
          var _console$error;

          (_console$error = console.error).call.apply(_console$error, [console, prefix].concat(Array.prototype.slice.call(arguments)));
        }
      }
    }
  }]);

  return Logger;
}(_event_emitter__WEBPACK_IMPORTED_MODULE_10__["default"]);

var logger = new Logger();
/**
 * @param {Object} obj - custom logger
 */

function setLogger(obj) {
  console = obj;
}
function getLogger() {
  return logger;
}
/* harmony default export */ __webpack_exports__["default"] = (logger);

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(48);
var fails = __webpack_require__(5);
var isArray = __webpack_require__(92);
var isObject = __webpack_require__(21);
var toObject = __webpack_require__(60);
var toLength = __webpack_require__(34);
var createProperty = __webpack_require__(133);
var arraySpeciesCreate = __webpack_require__(91);
var arrayMethodHasSpeciesSupport = __webpack_require__(134);
var wellKnownSymbol = __webpack_require__(9);
var V8_VERSION = __webpack_require__(135);

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, forced: FORCED }, {
  concat: function concat(arg) { // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPrimitive = __webpack_require__(23);
var definePropertyModule = __webpack_require__(18);
var createPropertyDescriptor = __webpack_require__(24);

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(5);
var wellKnownSymbol = __webpack_require__(9);
var V8_VERSION = __webpack_require__(135);

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(10);
var userAgent = __webpack_require__(136);

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(40);

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(48);
var IndexedObject = __webpack_require__(4);
var toIndexedObject = __webpack_require__(3);
var arrayMethodIsStrict = __webpack_require__(109);

var nativeJoin = [].join;

var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD = arrayMethodIsStrict('join', ',');

// `Array.prototype.join` method
// https://tc39.github.io/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(48);
var isObject = __webpack_require__(21);
var isArray = __webpack_require__(92);
var toAbsoluteIndex = __webpack_require__(36);
var toLength = __webpack_require__(34);
var toIndexedObject = __webpack_require__(3);
var createProperty = __webpack_require__(133);
var wellKnownSymbol = __webpack_require__(9);
var arrayMethodHasSpeciesSupport = __webpack_require__(134);
var arrayMethodUsesToLength = __webpack_require__(110);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
var USES_TO_LENGTH = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(140);

var iterableToArray = __webpack_require__(141);

var nonIterableSpread = __webpack_require__(142);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),
/* 140 */
/***/ (function(module, exports) {

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

module.exports = _arrayWithoutHoles;

/***/ }),
/* 141 */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),
/* 142 */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;

/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @file: global.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * @description provide global scope.
 */
var global; // see https://stackoverflow.com/a/11237259/589493

if (typeof window === 'undefined') {
  /* eslint-disable-next-line no-undef */
  global = self;
} else {
  global = window;
}

/* harmony default export */ __webpack_exports__["default"] = (global);

/***/ }),
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventEmitter; });
/* harmony import */ var core_js_modules_es_function_bind__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(145);
/* harmony import */ var core_js_modules_es_function_bind__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(147);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_create__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(148);
/* harmony import */ var core_js_modules_es_object_create__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_create__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(149);
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(150);
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(126);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(123);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(124);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7__);









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
var bind = Function.prototype.bind || functionBindPolyfill; // By default Dispatchers will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.

var defaultMaxListeners = 10;

var EventEmitter =
/*#__PURE__*/
function () {
  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default()(EventEmitter, null, [{
    key: "listenerCount",
    value: function listenerCount(emitter, type) {
      if (typeof emitter.listenerCount === 'function') {
        return emitter.listenerCount(type);
      } else {
        return _listenerCount.call(emitter, type);
      }
    }
  }]);

  function EventEmitter() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6___default()(this, EventEmitter);

    if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {
      this._events = objectCreate(null);
      this._eventsCount = 0;
    }

    this._maxListeners = this._maxListeners || undefined;
  } // // Obviously not all Emitters should be limited to 10. This function allows
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


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default()(EventEmitter, [{
    key: "emit",
    value: function emit(type) {
      var er, handler, len, args, i, events;
      var doError = type === 'error';
      events = this._events;
      if (events) doError = doError && events.error == null;else if (!doError) return false; // If there is no 'error' event listener then throw.

      if (doError) {
        if (arguments.length > 1) er = arguments[1];

        if (er instanceof Error) {
          throw er; // Unhandled 'error' event
        } else {
          // At least give some kind of context to the user
          var err = new Error('Unhandled "error" event. (' + er + ')');
          err.context = er;
          throw err;
        }
      }

      handler = events[type];
      if (!handler) return false;
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

          for (i = 1; i < len; i++) {
            args[i - 1] = arguments[i];
          }

          emitMany(handler, isFn, this, args);
      }

      return true;
    }
  }, {
    key: "on",
    value: function on(type, listener) {
      return _addListener(this, type, listener, false);
    }
  }, {
    key: "once",
    value: function once(type, listener) {
      if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
      this.on(type, _onceWrap(this, type, listener));
      return this;
    }
  }, {
    key: "off",
    value: function off(type, listener) {
      return _removeListener.call(this, type, listener);
    }
  }, {
    key: "removeAllListeners",
    value: function removeAllListeners(type) {
      var listeners, events, i;
      events = this._events;
      if (!events) return this; // not listening for off, no need to emit

      if (!events.off) {
        if (arguments.length === 0) {
          this._events = objectCreate(null);
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0) this._events = objectCreate(null);else delete events[type];
        }

        return this;
      } // emit off for all listeners on all events


      if (arguments.length === 0) {
        var keys = objectKeys(events);
        var key;

        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'off') continue;
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
      } else if (listeners) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.off(type, listeners[i]);
        }
      }

      return this;
    }
  }, {
    key: "listeners",
    value: function listeners(type) {
      return _listeners(this, type, true);
    }
  }, {
    key: "rawListeners",
    value: function rawListeners(type) {
      return _listeners(this, type, false);
    }
  }, {
    key: "listenerCount",
    value: function listenerCount() {
      return EventEmitter.listenerCount.apply(this, arguments);
    }
  }]);

  return EventEmitter;
}();


var hasDefineProperty;

try {
  var o = {};
  if (Object.defineProperty) Object.defineProperty(o, 'x', {
    value: 0
  });
  hasDefineProperty = o.x === 0;
} catch (err) {
  hasDefineProperty = false;
}

if (hasDefineProperty) {
  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function get() {
      return defaultMaxListeners;
    },
    set: function set(arg) {
      // check whether the input is a positive number (whose value is zero or
      // greater and not a NaN).
      if (typeof arg !== 'number' || arg < 0 || arg !== arg) throw new TypeError('"defaultMaxListeners" must be a positive number');
      defaultMaxListeners = arg;
    }
  });
} else {
  EventEmitter.defaultMaxListeners = defaultMaxListeners;
}

function $getMaxListeners(that) {
  if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
} // These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.


function emitNone(handler, isFn, self) {
  if (isFn) handler.call(self);else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);

    for (var i = 0; i < len; ++i) {
      try {
        listeners[i].call(self);
      } catch (e) {
        console.error(e);
      }
    }
  }
}

function emitOne(handler, isFn, self, arg1) {
  if (isFn) handler.call(self, arg1);else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);

    for (var i = 0; i < len; ++i) {
      try {
        listeners[i].call(self, arg1);
      } catch (e) {
        console.error(e);
      }
    }
  }
}

function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn) handler.call(self, arg1, arg2);else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);

    for (var i = 0; i < len; ++i) {
      try {
        listeners[i].call(self, arg1, arg2);
      } catch (e) {
        console.error(e);
      }
    }
  }
}

function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn) handler.call(self, arg1, arg2, arg3);else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);

    for (var i = 0; i < len; ++i) {
      try {
        listeners[i].call(self, arg1, arg2, arg3);
      } catch (e) {
        console.error(e);
      }
    }
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn) handler.apply(self, args);else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);

    for (var i = 0; i < len; ++i) {
      try {
        listeners[i].apply(self, args);
      } catch (e) {
        console.error(e);
      }
    }
  }
}

function _addListener(target, type, listener) {
  var m;
  var events;
  var existing;
  if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
  events = target._events;

  if (!events) {
    events = target._events = objectCreate(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type, listener.listener ? listener.listener : listener); // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object

      events = target._events;
    }

    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] = [existing, listener];
    } else {
      existing.push(listener);
    } // Check for listener leak


    if (!existing.warned) {
      m = $getMaxListeners(target);

      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible Dispatcher memory leak detected. ' + existing.length + ' "' + String(type) + '" listeners ' + 'added. Use emitter.setMaxListeners() to ' + 'increase limit.');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;

        if ((typeof console === "undefined" ? "undefined" : _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_5___default()(console)) === 'object' && console.warn) {
          console.warn('%s: %s', w.name, w.message);
        }
      }
    }
  }

  return target;
}

function _removeListener(type, listener) {
  var list, events, position, i, originalListener;
  if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
  events = this._events;
  if (!events) return this;
  list = events[type];
  if (!list) return this;

  if (list === listener || list.listener === listener) {
    if (--this._eventsCount === 0) this._events = objectCreate(null);else {
      delete events[type];
      if (events.off) this.emit('off', type, list.listener || listener);
    }
  } else if (typeof list !== 'function') {
    position = -1;

    for (i = list.length - 1; i >= 0; i--) {
      if (list[i] === listener || list[i].listener === listener) {
        originalListener = list[i].listener;
        position = i;
        break;
      }
    }

    if (position < 0) return this;
    if (position === 0) list.shift();else spliceOne(list, position);
    if (list.length === 1) events[type] = list[0];
    if (events.off) this.emit('off', type, originalListener || listener);
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

        for (var i = 0; i < args.length; ++i) {
          args[i] = arguments[i];
        }

        this.listener.apply(this.target, args);
    }
  }
}

function _onceWrap(target, type, listener) {
  var state = {
    fired: false,
    wrapFn: undefined,
    target: target,
    type: type,
    listener: listener
  };
  var wrapped = bind.call(onceWrapper, state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

function _listeners(target, type, unwrap) {
  var events = target._events;
  if (!events) return [];
  var evlistener = events[type];
  if (!evlistener) return [];
  if (typeof evlistener === 'function') return unwrap ? [evlistener.listener || evlistener] : [evlistener];
  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

function _listenerCount(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
} // About 1.5x faster than the two-arg version of Array#splice().


function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }

  list.pop();
}

function arrayClone(arr, n) {
  var copy = new Array(n);

  for (var i = 0; i < n; ++i) {
    copy[i] = arr[i];
  }

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
  var F = function F() {};

  F.prototype = proto;
  return new F();
}

function objectKeysPolyfill(obj) {
  var keys = [];

  for (var k in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) {
      keys.push(k);
    }
  }

  return k;
}

function functionBindPolyfill(context) {
  var fn = this;
  return function () {
    return fn.apply(context, arguments);
  };
}

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(48);
var bind = __webpack_require__(146);

// `Function.prototype.bind` method
// https://tc39.github.io/ecma262/#sec-function.prototype.bind
$({ target: 'Function', proto: true }, {
  bind: bind
});


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(74);
var isObject = __webpack_require__(21);

var slice = [].slice;
var factories = {};

var construct = function (C, argsLength, args) {
  if (!(argsLength in factories)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.github.io/ecma262/#sec-function.prototype.bind
module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = slice.call(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = partArgs.concat(slice.call(arguments));
    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
  };
  if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
  return boundFunction;
};


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(17);
var defineProperty = __webpack_require__(18).f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.github.io/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(48);
var DESCRIPTORS = __webpack_require__(17);
var create = __webpack_require__(29);

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  create: create
});


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(48);
var DESCRIPTORS = __webpack_require__(17);
var objectDefinePropertyModile = __webpack_require__(18);

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
$({ target: 'Object', stat: true, forced: !DESCRIPTORS, sham: !DESCRIPTORS }, {
  defineProperty: objectDefinePropertyModile.f
});


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(48);
var toObject = __webpack_require__(60);
var nativeKeys = __webpack_require__(31);
var fails = __webpack_require__(5);

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),
/* 151 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(123);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(124);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(125);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(128);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(129);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _event_emitter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(144);






/**
 * @file: stream.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * simple stream implementation.
 */


var Stream =
/*#__PURE__*/
function (_EventEmitter) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(Stream, _EventEmitter);

  function Stream() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Stream);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Stream).call(this));
  }
  /**
   * connect to the next pipeline stream.
   * @param destination
   * @returns {*}
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Stream, [{
    key: "pipe",
    value: function pipe(destination) {
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

  }, {
    key: "unpipe",
    value: function unpipe() {
      this.removeAllListeners('reset');
      this.removeAllListeners('data');
      this.removeAllListeners('done');
      return this;
    }
    /**
     * push data to current pipeline.
     * @param data
     */

  }, {
    key: "push",
    value: function push(data) {
      this.emit('data', data);
    }
    /**
     * flush current pipeline.
     * @param flushSource
     */

  }, {
    key: "flush",
    value: function flush(flushSource) {
      this.emit('done', flushSource);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.emit('reset');
    }
  }]);

  return Stream;
}(_event_emitter__WEBPACK_IMPORTED_MODULE_5__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Stream);

/***/ }),
/* 152 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventManager; });
/* harmony import */ var core_js_modules_es_function_bind__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(145);
/* harmony import */ var core_js_modules_es_function_bind__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(123);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(124);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _multi_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(153);




/**
 * Creates a new EventManager.
 * An EventManager maintains a collection of "event bindings" between event targets and event listeners.
 */

var EventManager =
/*#__PURE__*/
function () {
  function EventManager() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, EventManager);

    /**
     * Maps an event type to an array of event bindings.
     * @private {MultiMap}
     */
    this._bindingMap = new _multi_map__WEBPACK_IMPORTED_MODULE_3__["default"]();
  }
  /**
   * Detaches all event listeners.
   * @override
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(EventManager, [{
    key: "destroy",
    value: function destroy() {
      this.removeAll();
      this._bindingMap = null;
    }
    /**
     * Attaches an event listener to an event target.
     * @param {EventTarget|Dispatcher} target The event target.
     * @param {string} type The event type.
     * @param {function} listener The event listener.
     */

  }, {
    key: "on",
    value: function on(target, type, listener) {
      if (!this._bindingMap) return;
      var binding = new EventManager._Binding(target, type, listener);

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

  }, {
    key: "once",
    value: function once(target, type, listener) {
      // Install a shim listener that will stop listening after the first event.
      this.on(target, type, function (event) {
        // Stop listening to this event.
        this.off(target, type); // Call the original listener.

        listener(event);
      }.bind(this));
    }
    /**
     * Detaches an event listener from an event target.
     * @param {EventTarget} target The event target.
     * @param {string} type The event type.
     */

  }, {
    key: "off",
    value: function off(target, type) {
      if (!this._bindingMap) return;
      var list = this._bindingMap.get(type) || [];

      for (var i = 0; i < list.length; ++i) {
        var binding = list[i];

        if (binding.target == target) {
          binding.off();

          this._bindingMap.remove(type, binding);
        }
      }
    }
    /**
     * Detaches all event listeners from all targets.
     */

  }, {
    key: "removeAll",
    value: function removeAll() {
      if (!this._bindingMap) return;

      var list = this._bindingMap.getAll();

      for (var i = 0; i < list.length; ++i) {
        list[i].off();
      }

      this._bindingMap.clear();
    }
  }]);

  return EventManager;
}();
/**
 * Creates a new _Binding and attaches the event listener to the event target.
 * @param {EventTarget} target The event target.
 * @param {string} type The event type.
 * @param {function} listener The event listener.
 * @constructor
 * @private
 */




EventManager._Binding = function (target, type, listener) {
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


EventManager._Binding.prototype.off = function () {
  if (this.target.removeEventListener) {
    this.target.removeEventListener(this.type, this.listener, false);
  } else if (this.target.off) {
    this.target.off(this.type, this.listener, false);
  }

  this.target = null;
  this.listener = null;
};

/***/ }),
/* 153 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MultiMap; });
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(138);
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(154);
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(123);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(124);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);





/**
 * A simple multimap template.
 * @template T
 */
var MultiMap =
/*#__PURE__*/
function () {
  function MultiMap() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, MultiMap);

    /** @private {!Object.<string, !Array.<T>>} */
    this.map_ = {};
  }
  /**
   * Add a key, value pair to the map.
   * @param {string} key
   * @param {T} value
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(MultiMap, [{
    key: "push",
    value: function push(key, value) {
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

  }, {
    key: "get",
    value: function get(key) {
      var list = this.map_[key]; // slice() clones the list so that it and the map can each be modified
      // without affecting the other.

      return list ? list.slice() : null;
    }
    /**
     * Get a list of all values.
     * @return {!Array.<T>}
     */

  }, {
    key: "getAll",
    value: function getAll() {
      var list = [];

      for (var key in this.map_) {
        list.push.apply(list, this.map_[key]);
      }

      return list;
    }
    /**
     * Remove a specific value, if it exists.
     * @param {string} key
     * @param {T} value
     */

  }, {
    key: "remove",
    value: function remove(key, value) {
      var list = this.map_[key];
      if (!list) return;

      for (var i = 0; i < list.length; ++i) {
        if (list[i] == value) {
          list.splice(i, 1);
          --i;
        }
      }
    }
    /**
     * Clear all keys and values from the multimap.
     */

  }, {
    key: "clear",
    value: function clear() {
      this.map_ = {};
    }
    /**
     * @param {function(string, !Array.<T>)} callback
     */

  }, {
    key: "forEach",
    value: function forEach(callback) {
      for (var key in this.map_) {
        callback(key, this.map_[key]);
      }
    }
  }]);

  return MultiMap;
}();



/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(48);
var toAbsoluteIndex = __webpack_require__(36);
var toInteger = __webpack_require__(35);
var toLength = __webpack_require__(34);
var toObject = __webpack_require__(60);
var arraySpeciesCreate = __webpack_require__(91);
var createProperty = __webpack_require__(133);
var arrayMethodHasSpeciesSupport = __webpack_require__(134);
var arrayMethodUsesToLength = __webpack_require__(110);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');
var USES_TO_LENGTH = arrayMethodUsesToLength('splice', { ACCESSORS: true, 0: 0, 1: 2 });

var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});


/***/ }),
/* 155 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObjectLike", function() { return isObjectLike; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmptyObject", function() { return isEmptyObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isHttps", function() { return isHttps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return isNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArrayBuffer", function() { return isArrayBuffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUint8Array", function() { return isUint8Array; });
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(156);
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(75);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(157);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(126);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_3__);





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
  return !!value && _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_3___default()(value) == 'object';
}
function isEmptyObject(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}
/**
 * @param {string} [url]
 */

function isHttps(url) {
  return /^https/gi.test(url || window.location.protocol);
}
/**
 * @param {*} num
 */

function isNumber(num) {
  return typeof num === 'number' && !isNaN(num);
}
/**
 * @param {*} value
 */

function isArrayBuffer(value) {
  return isObjectLike(value) && objectToString.call(value).toLowerCase() === '[object arraybuffer]';
}
/**
 * @param {*} value
 */

function isUint8Array(value) {
  return isObjectLike(value) && objectToString.call(value).toLowerCase() === '[object uint8array]';
}

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(51);

var DatePrototype = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var nativeDateToString = DatePrototype[TO_STRING];
var getTime = DatePrototype.getTime;

// `Date.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-date.prototype.tostring
if (new Date(NaN) + '' != INVALID_DATE) {
  redefine(DatePrototype, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? nativeDateToString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefine = __webpack_require__(51);
var anObject = __webpack_require__(22);
var fails = __webpack_require__(5);
var flags = __webpack_require__(158);

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(22);

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 159 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @file: events.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * @readonly
 * @enum {string}
 * @export
 */
/* harmony default export */ __webpack_exports__["default"] = ({
  ERROR: 'ERROR',
  INFO: 'INFO',
  DATA: 'DATA',
  DEMUX_DATA: 'DEMUX_DATA',
  DONE: 'DONE'
});

/***/ }),
/* 160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(132);
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(123);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(124);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(125);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(128);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(129);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _util_stream__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(151);
/* harmony import */ var _streams_complex__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(161);
/* harmony import */ var _util_logger__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(131);
/* harmony import */ var _util_cache_buffer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(165);
/* harmony import */ var _streams_elementary__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(166);
/* harmony import */ var _streams_pes__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(198);
/* harmony import */ var _psi__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(200);
/* harmony import */ var _structs_packet__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(205);
/* harmony import */ var _mux_error_code__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(206);







/**
 * @file: demux.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * MPEG-2 transport stream demuxer.
 */









var CHUNK_BYTE_LENGTH = 188; // Transport Stream chunks shall be 188 bytes long.

var Demux =
/*#__PURE__*/
function (_stream) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Demux, _stream);

  function Demux(ctx) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Demux);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Demux).call(this));
    /**
     * @type {MuxInline}
     * @private
     */

    _this.context = ctx;
    /**
     * @type {Object}
     * @private
     */

    _this.options = options;
    /**
     * @type {CacheBuffer}
     * @private
     */

    _this.cache_buffer = new _util_cache_buffer__WEBPACK_IMPORTED_MODULE_9__["default"]();
    /**
     * @type {PSI}
     * @private
     */

    _this.psi = new _psi__WEBPACK_IMPORTED_MODULE_12__["default"](ctx);
    /**
     * @type {PesStream}
     * @private
     */

    _this.pesStream = new _streams_pes__WEBPACK_IMPORTED_MODULE_11__["default"](ctx, _this.psi);
    /**
     * @type {ElementaryStream}
     * @private
     */

    _this.elementaryStream = new _streams_elementary__WEBPACK_IMPORTED_MODULE_10__["default"](ctx, _this.psi, options);
    /**
     * @type {M2TSComplexStream}
     * @private
     */

    _this.complexStream = new _streams_complex__WEBPACK_IMPORTED_MODULE_7__["default"](ctx, _this.psi); // concat stream.

    _this.pipe(_this.pesStream);

    _this.pesStream.pipe(_this.elementaryStream);

    _this.elementaryStream.pipe(_this.complexStream);

    return _this;
  }
  /**
   * This is end pipeline stream
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(Demux, [{
    key: "push",

    /**
     * TS push support streaming incomplete data push.
     * @param {Uint8Array} buffer
     * @param {Object} conf
     * @param {boolean} conf.done - If you need the done event, this boolean needs to be set
     */
    value: function push(buffer) {
      var conf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var done = conf.done;
      var cacheByteLength = this.cache_buffer.byteLength;
      var byteOffset = null;
      this.options.config = conf;
      _util_logger__WEBPACK_IMPORTED_MODULE_8__["default"].log("hls demux received ".concat(buffer.byteLength, " bytes, cache ").concat(cacheByteLength, " bytes. ").concat(done ? 'chunk done' : ''));
      this.cache_buffer.append(buffer);

      while (this.cache_buffer.byteLength >= CHUNK_BYTE_LENGTH) {
        var chunk = this.cache_buffer.cut(CHUNK_BYTE_LENGTH); // The pushed buffer may be so small that can't cut a ts chunk.

        if (chunk) {
          var packet = new _structs_packet__WEBPACK_IMPORTED_MODULE_13__["default"](chunk);

          if (packet.valid()) {
            this.psi.parse(packet);
            this.emit('data', packet);
          } else {
            var errMsg = "Encounter invalid ts packet, packet_length(".concat(chunk.length, "), cache_length(").concat(this.cache_buffer.byteLength, "), has_payload(").concat(packet.has_payload, "), data(").concat(chunk, ")");
            _util_logger__WEBPACK_IMPORTED_MODULE_8__["default"].error(errMsg);
            this.reset();
            this.context.emit('error', _mux_error_code__WEBPACK_IMPORTED_MODULE_14__["default"].TS_SYNC_BYTE, errMsg, {
              startByte: byteOffset,
              endByte: byteOffset + chunk.byteLength
            });
            break;
          }

          byteOffset += chunk.byteLength;
        }
      }

      if (this.cache_buffer.empty && done) {
        // logger.log('mux packet done!');
        this.emit('done');
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this.cache_buffer.clear();
      this.emit('reset');
    }
  }, {
    key: "endStream",
    get: function get() {
      var stream = this.elementaryStream;

      if (this.options.complex) {
        stream = this.complexStream;
      }

      return stream;
    }
  }]);

  return Demux;
}(_util_stream__WEBPACK_IMPORTED_MODULE_6__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Demux);

/***/ }),
/* 161 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(162);
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(123);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(124);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(125);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(128);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(129);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _util_stream__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(151);
/* harmony import */ var _util_logger__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(131);







/**
 * @file: complex.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * Complex Stream.
 *
 * Combine Video, Audio, Caption c and other data.
 */



var M2TSComplexStream =
/*#__PURE__*/
function (_Stream) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(M2TSComplexStream, _Stream);

  function M2TSComplexStream(ctx, psi) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, M2TSComplexStream);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(M2TSComplexStream).call(this));
    /** @private */

    _this.context = ctx;
    /** @private {PSI} */

    _this.PSI = psi;
    /** @private {Object} */

    _this.videoTrack = null;
    /** @private {Object} */

    _this.audioTrack = null;
    /** @private {Object} */

    _this.captionTrack = null; // pipe specified by outside.

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(M2TSComplexStream, [{
    key: "push",
    value: function push(data) {
      var tracks = data;

      for (var i = 0, track; i < tracks.length; i++) {
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
  }, {
    key: "flush",
    value: function flush() {
      this.emit('done');

      this._clearStream();
    }
  }, {
    key: "reset",
    value: function reset() {
      this._clearStream(); // This is demux end stream, so don't emit reset.
      // this.emit('reset');

    }
  }, {
    key: "_clearStream",
    value: function _clearStream() {
      this.videoTrack = null;
      this.audioTrack = null;
      this.captionTrack = null;
    }
  }, {
    key: "_complexVideo",
    value: function _complexVideo(gops) {
      var track = this.PSI.findTrack(gops.trackId);

      if (track) {
        track.type = 'video';
        track.gops = gops;
        track.firstDTS = gops[0][0].dts;
        track.firstPTS = gops[0][0].pts; // set duration to Infinity(POSITIVE_INFINITY) can be useful for live.
        // If Infinity it will loose the ability to seek.

        track.duration = Number.POSITIVE_INFINITY;
        this.videoTrack = track;
        this.emit('data', {
          videoTrack: this.videoTrack
        });
      }
    }
  }, {
    key: "_complexAudio",
    value: function _complexAudio(frames) {
      var track = this.PSI.findTrack(frames.trackId);

      if (track) {
        track.type = 'audio';
        track.frames = frames;
        track.firstPTS = track.firstDTS = frames[0].dts; // set duration to Infinity(POSITIVE_INFINITY) can be useful for live.
        // If Infinity it will loose the ability to seek.

        track.duration = Number.POSITIVE_INFINITY;
        this.audioTrack = track;
        this.emit('data', {
          audioTrack: this.audioTrack
        });
      }
    }
  }, {
    key: "_complexCaption",
    value: function _complexCaption() {}
  }]);

  return M2TSComplexStream;
}(_util_stream__WEBPACK_IMPORTED_MODULE_6__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (M2TSComplexStream);

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(17);
var global = __webpack_require__(10);
var isForced = __webpack_require__(56);
var redefine = __webpack_require__(51);
var has = __webpack_require__(25);
var classof = __webpack_require__(6);
var inheritIfRequired = __webpack_require__(94);
var toPrimitive = __webpack_require__(23);
var fails = __webpack_require__(5);
var create = __webpack_require__(29);
var getOwnPropertyNames = __webpack_require__(54).f;
var getOwnPropertyDescriptor = __webpack_require__(49).f;
var defineProperty = __webpack_require__(18).f;
var trim = __webpack_require__(163).trim;

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;

// Opera ~12 has broken Object#toString
var BROKEN_CLASSOF = classof(create(NumberPrototype)) == NUMBER;

// `ToNumber` abstract operation
// https://tc39.github.io/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  var first, third, radix, maxCode, digits, length, index, code;
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = it.charCodeAt(0);
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = it.slice(2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.github.io/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper
      // check on 1..constructor(foo) case
      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classof(dummy) != NUMBER)
        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(NativeNumber, key = keys[j]) && !has(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global, NUMBER, NumberWrapper);
}


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(7);
var whitespaces = __webpack_require__(164);

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),
/* 164 */
/***/ (function(module, exports) {

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 165 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(132);
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(154);
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_buffer_slice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(65);
/* harmony import */ var core_js_modules_es_array_buffer_slice__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_buffer_slice__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(75);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_typed_array_uint8_array__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(79);
/* harmony import */ var core_js_modules_es_typed_array_uint8_array__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_uint8_array__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_typed_array_copy_within__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(95);
/* harmony import */ var core_js_modules_es_typed_array_copy_within__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_copy_within__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_typed_array_every__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(97);
/* harmony import */ var core_js_modules_es_typed_array_every__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_every__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_typed_array_fill__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(98);
/* harmony import */ var core_js_modules_es_typed_array_fill__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_fill__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_typed_array_filter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(99);
/* harmony import */ var core_js_modules_es_typed_array_filter__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_filter__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_typed_array_find__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(100);
/* harmony import */ var core_js_modules_es_typed_array_find__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_find__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_typed_array_find_index__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(101);
/* harmony import */ var core_js_modules_es_typed_array_find_index__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_find_index__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_typed_array_for_each__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(102);
/* harmony import */ var core_js_modules_es_typed_array_for_each__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_for_each__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_typed_array_includes__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(103);
/* harmony import */ var core_js_modules_es_typed_array_includes__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_includes__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_typed_array_index_of__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(104);
/* harmony import */ var core_js_modules_es_typed_array_index_of__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_index_of__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_typed_array_iterator__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(105);
/* harmony import */ var core_js_modules_es_typed_array_iterator__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_iterator__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_typed_array_join__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(106);
/* harmony import */ var core_js_modules_es_typed_array_join__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_join__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_typed_array_last_index_of__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(107);
/* harmony import */ var core_js_modules_es_typed_array_last_index_of__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_last_index_of__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_typed_array_map__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(111);
/* harmony import */ var core_js_modules_es_typed_array_map__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_map__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_typed_array_reduce__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(112);
/* harmony import */ var core_js_modules_es_typed_array_reduce__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_reduce__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_es_typed_array_reduce_right__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(114);
/* harmony import */ var core_js_modules_es_typed_array_reduce_right__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_reduce_right__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_es_typed_array_reverse__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(115);
/* harmony import */ var core_js_modules_es_typed_array_reverse__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_reverse__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_es_typed_array_set__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(116);
/* harmony import */ var core_js_modules_es_typed_array_set__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_set__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_es_typed_array_slice__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(117);
/* harmony import */ var core_js_modules_es_typed_array_slice__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_slice__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var core_js_modules_es_typed_array_some__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(118);
/* harmony import */ var core_js_modules_es_typed_array_some__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_some__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var core_js_modules_es_typed_array_sort__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(119);
/* harmony import */ var core_js_modules_es_typed_array_sort__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_sort__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var core_js_modules_es_typed_array_subarray__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(120);
/* harmony import */ var core_js_modules_es_typed_array_subarray__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_subarray__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var core_js_modules_es_typed_array_to_locale_string__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(121);
/* harmony import */ var core_js_modules_es_typed_array_to_locale_string__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_to_locale_string__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var core_js_modules_es_typed_array_to_string__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(122);
/* harmony import */ var core_js_modules_es_typed_array_to_string__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_to_string__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(123);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(124);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_30__);
































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
var CacheBuffer =
/*#__PURE__*/
function () {
  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_30___default()(CacheBuffer, [{
    key: "byteLength",
    get: function get() {
      if (this._byteLength === null) {
        var len = 0;

        for (var i = 0, item; i < this._list.length; i++) {
          item = this._list[i];
          len += item.byteLength;
        }

        this._byteLength = len;
      }

      return this._byteLength;
    }
  }, {
    key: "empty",
    get: function get() {
      return this._list.length === 0;
    }
  }, {
    key: "bufferList",
    get: function get() {
      return this._list;
    }
  }]);

  function CacheBuffer() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_29___default()(this, CacheBuffer);

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

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_30___default()(CacheBuffer, [{
    key: "clear",
    value: function clear() {
      var len = this._list.length;

      if (len > 0) {
        this._list.splice(0, len);
      }

      this._byteLength = null;
    }
    /**
     * @returns {Uint8Array}
     */

  }, {
    key: "toNewBytes",
    value: function toNewBytes() {
      var bytes = null;
      var tryCount = 0;
      var maxTryCount = 50; // The following retry strategies are provided for failed memory applications
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

      for (var i = 0, offset = 0; i < this._list.length; i++) {
        var payload = this._list[i];
        bytes.set(payload, offset);
        offset += payload.byteLength;
      }

      return bytes;
    }
    /**
     * @param {Uint8Array|CacheBuffer} newBuffer
     */

  }, {
    key: "append",
    value: function append(newBuffer) {
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

  }, {
    key: "cut",
    value: function cut(fixedLength) {
      var needCutResult = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var chunk = null;

      if (fixedLength > 0 && !this.empty) {
        var list = this._list;
        var offset = 0;
        var loopIndex = 0;

        while (list.length > 0) {
          var cur = list.shift();

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
                  throw "alloc_memory_error@ cache buffer: ".concat(fixedLength, " ").concat(e.message);
                }

                chunk.set(cur, 0);
              }

              offset += cur.byteLength;
            }
          } else {
            var subLen = fixedLength - offset;

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
    } // /**
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

  }]);

  return CacheBuffer;
}();

/* harmony default export */ __webpack_exports__["default"] = (CacheBuffer);

/***/ }),
/* 166 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(132);
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(123);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(124);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(125);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(128);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(129);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _util_is__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(155);
/* harmony import */ var _util_logger__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(131);
/* harmony import */ var _util_stream__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(151);
/* harmony import */ var _enum_stream_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(167);
/* harmony import */ var _adts__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(168);
/* harmony import */ var _avc__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(184);







/**
 * @file: elementary.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * Elementary Stream.
 * @summary An elementary stream (ES) as defined by the MPEG communication protocol is usually the output of an audio or video encoder.
 *      ES contains only one kind of data, e.g. audio, video or closed caption.
 * @description  https://en.wikipedia.org/wiki/Elementary_stream
 */







var ElementaryStream =
/*#__PURE__*/
function (_Stream) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(ElementaryStream, _Stream);

  function ElementaryStream(ctx, psi) {
    var _this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, ElementaryStream);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(ElementaryStream).call(this));
    /** @private */

    _this.context = ctx;
    /** @private {PSI} */

    _this.PSI = psi;
    /** @private {Object} */

    _this.options = options;
    /** @private {Array} */

    _this.tracks = [];
    /** @private {ADTSStream} */

    _this.adtsStream = new _adts__WEBPACK_IMPORTED_MODULE_10__["default"](psi);
    /** @private {AVCStream} */

    _this.avcStream = new _avc__WEBPACK_IMPORTED_MODULE_11__["default"](psi);
    /** @private {Array} */

    _this.streams = [_this.adtsStream, _this.avcStream];

    _this.avcStream.on('data', function (data) {
      var stubTime = options.config.stubTime;

      if (Object(_util_is__WEBPACK_IMPORTED_MODULE_6__["isNumber"])(stubTime)) {
        var end = (data.firstPTS + data.duration) / 90000;

        if (end < stubTime) {
          _util_logger__WEBPACK_IMPORTED_MODULE_7__["default"].warn("drop avc gop, start/end/stubTime(".concat(data.firstPTS, "/").concat(end, "/").concat(stubTime, ")"));
          return;
        }
      }

      _this.tracks.push(data);

      _this.emit('data', _this.tracks);

      _this.tracks = [];

      _this.adtsStream.flush();
    });

    _this.adtsStream.on('data', function (data) {
      var stubTime = options.config.stubTime;

      if (Object(_util_is__WEBPACK_IMPORTED_MODULE_6__["isNumber"])(stubTime)) {
        var end = (data.firstPTS + data.duration) / 90000;

        if (end < stubTime) {
          _util_logger__WEBPACK_IMPORTED_MODULE_7__["default"].warn("drop adts, start/end/stubTime(".concat(data.firstPTS, "/").concat(end, "/").concat(stubTime, ")"));
          return;
        }
      }

      _this.tracks.push(data);

      _this.emit('data', _this.tracks);

      _this.tracks = [];
    });

    return _this;
  }
  /**
   * Push a complete pes
   * @param data
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(ElementaryStream, [{
    key: "push",
    value: function push(data) {
      var options = this.options,
          adtsStream = this.adtsStream,
          avcStream = this.avcStream;
      var stream_type = data.stream_type;

      if (options.complex) {
        switch (stream_type) {
          case _enum_stream_types__WEBPACK_IMPORTED_MODULE_9__["default"].H264:
          case _enum_stream_types__WEBPACK_IMPORTED_MODULE_9__["default"].HEVC:
            avcStream.push(data);
            break;

          case _enum_stream_types__WEBPACK_IMPORTED_MODULE_9__["default"].ADTS:
            adtsStream.push(data);
            break;

          default:
            _util_logger__WEBPACK_IMPORTED_MODULE_7__["default"].warn("ts elementary encounter unknown stream type ".concat(stream_type));
        }
      } else {
        this.emit('data', data);
      }
    }
  }, {
    key: "flush",
    value: function flush() {
      for (var i = 0; i < this.streams.length; i++) {
        var stream = this.streams[i];
        stream.flush();
      }

      this.emit('data', this.tracks);
      this.emit('done');
      this.tracks = [];
    }
  }, {
    key: "reset",
    value: function reset() {
      this.tracks = [];

      for (var i = 0; i < this.streams.length; i++) {
        var stream = this.streams[i];
        stream.reset();
      }

      this.emit('reset');
    }
  }]);

  return ElementaryStream;
}(_util_stream__WEBPACK_IMPORTED_MODULE_8__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (ElementaryStream);

/***/ }),
/* 167 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @file: stream-types.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 * @overview stream type defined by T-REC-H.222.0-200605-S!!PDF-E.pdf $Table 2-34 – Stream type assignments.
 */

/*
Value       Description
0x00        ITU-T | ISO/IEC Reserved
0x01        ISO/IEC 11172-2 Video
0x02        ITU-T Rec. H.262 | ISO/IEC 13818-2 Video or ISO/IEC 11172-2 constrained parameter video stream
0x03        ISO/IEC 11172-3 Audio
0x04        ISO/IEC 13818-3 Audio
0x05        ITU-T Rec. H.222.0 | ISO/IEC 13818-1 private_sections
0x06        ITU-T Rec. H.222.0 | ISO/IEC 13818-1 PES packets containing private data
0x07        ISO/IEC 13522 MHEG
0x08        ITU-T Rec. H.222.0 | ISO/IEC 13818-1 Annex A DSM-CC
0x09        ITU-T Rec. H.222.1
0x0A        ISO/IEC 13818-6 type A
0x0B        ISO/IEC 13818-6 type B
0x0C        ISO/IEC 13818-6 type C
0x0D        ISO/IEC 13818-6 type D
0x0E        ITU-T Rec. H.222.0 | ISO/IEC 13818-1 auxiliary
0x0F        ISO/IEC 13818-7 Audio with ADTS transport syntax
0x10        ISO/IEC 14496-2 Visual
0x11        ISO/IEC 14496-3 Audio with the LATM transport syntax as defined in ISO/IEC 14496-3
0x12        ISO/IEC 14496-1 SL-packetized stream or FlexMux stream carried in PES packets
0x13        ISO/IEC 14496-1 SL-packetized stream or FlexMux stream carried in ISO/IEC 14496_sections
0x14        ISO/IEC 13818-6 Synchronized Download Protocol
0x15        Metadata carried in PES packets
0x16        Metadata carried in metadata_sections
0x17        Metadata carried in ISO/IEC 13818-6 Data Carousel
0x18        Metadata carried in ISO/IEC 13818-6 Object Carousel
0x19        Metadata carried in ISO/IEC 13818-6 Synchronized Download Protocol
0x1A        IPMP stream (defined in ISO/IEC 13818-11, MPEG-2 IPMP)
0x1B        AVC video stream as defined in ITU-T Rec. H.264 | ISO/IEC 14496-10 Video
0x1C-0x7E   ITU-T Rec. H.222.0 | ISO/IEC 13818-1 Reserved
0x7F        IPMP stream
0x80-0xFF   User Private
*/

/**
 * @readonly
 * @enum {number}
 * @export
 */
/* harmony default export */ __webpack_exports__["default"] = ({
  H264: 0x1b,
  HEVC: 0x24,
  ADTS: 0x0f,
  METADATA: 0x15
});

/***/ }),
/* 168 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(123);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(124);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(125);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(128);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(129);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _util_stream__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(151);
/* harmony import */ var _enum_stream_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(167);
/* harmony import */ var _codec_adts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(169);
/* harmony import */ var _codec_aac_aac_config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(170);






/**
 * @file: adts.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * ADTS(Audio Data Transport Stream) Stream.
 */





var ADTSStream =
/*#__PURE__*/
function (_Stream) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(ADTSStream, _Stream);

  function ADTSStream(psi) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ADTSStream);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(ADTSStream).call(this));
    /** @private {PSI} */

    _this.PSI = psi;
    /** @private {?Object} */

    _this.trackId = null;
    /** @private {ADTSCodec} */

    _this.codec = new _codec_adts__WEBPACK_IMPORTED_MODULE_7__["default"]();

    _this.codec.on('frame', function (frame) {
      _this.frames.push(frame);

      _this.frames.byteLength += frame.data.byteLength;
      _this.frames.trackId = _this.trackId;
    });

    _this._newFrames();

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ADTSStream, [{
    key: "push",
    value: function push(data) {
      if (data.stream_type === _enum_stream_types__WEBPACK_IMPORTED_MODULE_6__["default"].ADTS) {
        this.trackId = data.pid;
        this.codec.push(data);
      }
    }
  }, {
    key: "flush",
    value: function flush() {
      if (this.frames.length > 0) {
        var count = this.frames.length;
        var firstFrame = this.frames[0];
        var lastFrame = this.frames[count - 1];
        var lastDuration = lastFrame.sampleRate * lastFrame.sampleCount / 90000;
        this.frames.firstDTS = firstFrame.dts;
        this.frames.firstPTS = firstFrame.pts;

        if (count === 1) {
          this.frames.duration = lastDuration;
        } else {
          this.frames.duration = lastDuration + (lastFrame.pts - firstFrame.pts);
        } // To prevent information mismatch leading to next pipeline decoding errors
        // Every audio frame list assembly needs to update track meta.


        this._updateTrackMeta(firstFrame);

        this.emit('data', this.frames);
        this.reset();
        this.emit('done');
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this.trackId = null;

      this._newFrames();
    }
  }, {
    key: "_newFrames",
    value: function _newFrames() {
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

  }, {
    key: "_updateTrackMeta",
    value: function _updateTrackMeta(frame) {
      var track = this.PSI.findTrack(this.trackId);
      var config = Object(_codec_aac_aac_config__WEBPACK_IMPORTED_MODULE_8__["default"])(frame.audioObjectType, frame.samplingFrequencyIndex, frame.channelCount);
      track.config = config.config;
      track.sampleRate = config.sampleRate;
      track.inputTimeScale = track.inputTimeScale || track.timescale;
      track.timescale = config.sampleRate;
      track.channelCount = config.channelCount;
      track.codec = config.codec;
      track.realCodec = config.realCodec;
      track.isAAC = true;
    }
  }]);

  return ADTSStream;
}(_util_stream__WEBPACK_IMPORTED_MODULE_5__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (ADTSStream);

/***/ }),
/* 169 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(123);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(124);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(125);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(128);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(129);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _util_event_emitter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(144);






/**
 * @file: adts.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * ADTS codec
 * Wiki Refer: https://wiki.multimedia.cx/index.php?title=ADTS
 */

var ADTS_SAMPLING_FREQUENCIES = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];
/**
 * @extends EventEmitter
 */

var ADTSCodec =
/*#__PURE__*/
function (_EventEmitter) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(ADTSCodec, _EventEmitter);

  function ADTSCodec() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ADTSCodec);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(ADTSCodec).call(this));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(ADTSCodec, [{
    key: "push",
    value: function push(data) {
      var pesPacket = data.pes;
      var pts = pesPacket.PTS,
          dts = pesPacket.DTS;
      var pes_data_byte = pesPacket.data_byte;
      var data_byte;
      var i = 0,
          frameNum = 0,
          frameLength,
          protectionSkipBytes,
          frameEnd,
          sampleCount,
          adtsFrameDuration;
      data_byte = pes_data_byte;

      while (i + 5 < data_byte.length) {
        // Look for the start of an ADTS header..
        if (data_byte[i] !== 0xff || (data_byte[i + 1] & 0xf6) !== 0xf0) {
          // If a valid header was not found,  jump one forward and attempt to
          // find a valid ADTS header starting at the next byte
          i++;
          continue;
        } // The protection skip bit tells us if we have 2 bytes of CRC data at the
        // end of the ADTS header


        protectionSkipBytes = (~data_byte[i + 1] & 0x01) * 2; // Frame length is a 13 bit integer starting 16 bits from the
        // end of the sync sequence

        frameLength = (data_byte[i + 3] & 0x03) << 11 | data_byte[i + 4] << 3 | (data_byte[i + 5] & 0xe0) >> 5;
        sampleCount = ((data_byte[i + 6] & 0x03) + 1) * 1024;
        adtsFrameDuration = sampleCount * 90000 / ADTS_SAMPLING_FREQUENCIES[(data_byte[i + 2] & 0x3c) >>> 2];
        frameEnd = i + frameLength; // If we don't have enough data to actually finish this ADTS frame, return
        // and wait for more data

        if (data_byte.byteLength < frameEnd) {
          return;
        } // Otherwise, deliver the complete AAC frame


        this.emit('frame', {
          pts: pts + frameNum * adtsFrameDuration,
          dts: dts + frameNum * adtsFrameDuration,
          sampleCount: sampleCount,
          audioObjectType: (data_byte[i + 2] >>> 6 & 0x03) + 1,
          channelCount: (data_byte[i + 2] & 1) << 2 | (data_byte[i + 3] & 0xc0) >>> 6,
          sampleRate: ADTS_SAMPLING_FREQUENCIES[(data_byte[i + 2] & 0x3c) >>> 2],
          samplingFrequencyIndex: (data_byte[i + 2] & 0x3c) >>> 2,
          // assume ISO/IEC 14496-12 AudioSampleEntry default of 16
          sampleSize: 16,
          data: data_byte.subarray(i + 7 + protectionSkipBytes, frameEnd)
        }); // If the data_byte is empty, clear it and return

        if (data_byte.byteLength === frameEnd) {
          data_byte = undefined;
          this.emit('done');
          return;
        }

        frameNum++; // Remove the finished frame from the data_byte and start the process again

        data_byte = data_byte.subarray(frameEnd);
      }
    }
  }]);

  return ADTSCodec;
}(_util_event_emitter__WEBPACK_IMPORTED_MODULE_5__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (ADTSCodec);

/***/ }),
/* 170 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(171);
/* harmony import */ var _util_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(131);
/**
 * @file: aac-config.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * Audio Config Helper
 * Accord audioObjectType/samplingFrequencyIndex/channelCount, generate mimeType info.
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

var samplingRates = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];
/* harmony default export */ __webpack_exports__["default"] = (function (audioObjectType, samplingFrequencyIndex, channelCount) {
  var adtsExtensionSamplingIndex;
  var realAudioObjectType = audioObjectType;
  var config;

  if (samplingFrequencyIndex > samplingRates.length - 1) {
    _util_logger__WEBPACK_IMPORTED_MODULE_1__["default"].error("invalid sampling index:".concat(samplingFrequencyIndex));
    return;
  } // firefox: freq less than 24kHz = AAC SBR (HE-AAC)


  if (_util_platform__WEBPACK_IMPORTED_MODULE_0__["default"].browser.FIREFOX) {
    if (samplingFrequencyIndex >= 6) {
      audioObjectType = 5;
      config = new Array(4); // HE-AAC uses SBR (Spectral Band Replication) , high frequencies are constructed from low frequencies
      // there is a factor 2 between frame sample rate and output sample rate
      // multiply frequency by 2 (see table below, equivalent to substract 3)

      adtsExtensionSamplingIndex = samplingFrequencyIndex - 3;
    } else {
      audioObjectType = 2;
      config = new Array(2);
      adtsExtensionSamplingIndex = samplingFrequencyIndex;
    } // Android : always use AAC

  } else if (_util_platform__WEBPACK_IMPORTED_MODULE_0__["default"].os.android) {
    audioObjectType = 2;
    config = new Array(2);
    adtsExtensionSamplingIndex = samplingFrequencyIndex;
  } else {
    /*  for other browsers (Chrome/Vivaldi/Opera ...)
    		always force audio type to be HE-AAC SBR, as some browsers do not support audio codec switch properly (like Chrome ...)
    	*/
    audioObjectType = 5;
    config = new Array(4); // if (manifest codec is HE-AAC or HE-AACv2) OR (manifest codec not specified AND frequency less than 24kHz)

    if (samplingFrequencyIndex >= 6) {
      // HE-AAC uses SBR (Spectral Band Replication) , high frequencies are constructed from low frequencies
      // there is a factor 2 between frame sample rate and output sample rate
      // multiply frequency by 2 (see table below, equivalent to substract 3)
      adtsExtensionSamplingIndex = samplingFrequencyIndex - 3;
    } else {
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


  config[0] = audioObjectType << 3; // samplingFrequencyIndex

  config[0] |= (samplingFrequencyIndex & 0x0e) >> 1;
  config[1] |= (samplingFrequencyIndex & 0x01) << 7; // channelConfiguration

  config[1] |= channelCount << 3;

  if (audioObjectType === 5) {
    // adtsExtensionSamplingIndex
    config[1] |= (adtsExtensionSamplingIndex & 0x0e) >> 1;
    config[2] = (adtsExtensionSamplingIndex & 0x01) << 7; // audioObjectType (force to 2, chrome is checking that object type is less than 5 ???
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
});

/***/ }),
/* 171 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(172);
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(173);
/* harmony import */ var core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(175);
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(178);
/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_3__);





/**
 * @file: platform.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * @description device
 */
var os = {};
var browser = {};
var nav = navigator; // let platform = nav.platform;

var ua = nav.userAgent.toLowerCase();
var match = /(edge)\/([\w.]+)/.exec(ua) || /(opr)[/]([\w.]+)/.exec(ua) || /(chrome)[ /]([\w.]+)/.exec(ua) || /(firefox)[ /]([\w.]+)/.exec(ua) || /(iemobile)[/]([\w.]+)/.exec(ua) || /(version)(applewebkit)[ /]([\w.]+).*(safari)[ /]([\w.]+)/.exec(ua) || /(webkit)[ /]([\w.]+).*(version)[ /]([\w.]+).*(safari)[ /]([\w.]+)/.exec(ua) || /(webkit)[ /]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ /]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf('trident') >= 0 && /(rv)(?::| )([\w.]+)/.exec(ua) || ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
var platform_match = /(ipad)/.exec(ua) || /(ipod)/.exec(ua) || /(windows phone)/.exec(ua) || /(iphone)/.exec(ua) || /(kindle)/.exec(ua) || /(silk)/.exec(ua) || /(android)/.exec(ua) || /(win)/.exec(ua) || /(mac)/.exec(ua) || /(linux)/.exec(ua) || /(cros)/.exec(ua) || /(playbook)/.exec(ua) || /(bb)/.exec(ua) || /(blackberry)/.exec(ua) || [];
var result = {};
var matched = {
  browser: match[5] || match[3] || match[1] || '',
  version: match[2] || match[4] || '0',
  versionNumber: match[4] || match[2] || '0',
  platform: platform_match[0] || ''
};

if (matched.browser) {
  result[matched.browser] = true; // result.version = matched.version;
  // result.versionNumber = parseInt(matched.versionNumber, 10);

  var versionArray = matched.versionNumber.split('.');
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
} // -------------------------------------- browser --------------------------------------


browser.version = result.version;
browser.CHROME = !!result['chrome'];
browser.SAFARI = !!result['safari'] && !browser.CHROME;
browser.FIREFOX = !!result['firefox'];
browser.IE11 = /rv:11/.test(ua);
browser.IE = !!result['msie'] || browser.IE11;
browser.EDGE = !!result['edge'];
browser.WECHAT = /(wechat)|(micromessenger)/.test(ua); // -------------------------------------- os --------------------------------------

os.mac = !!matched.platform['mac'];
os.iphone = !!matched.platform['iphone'];
os.android = !!matched.platform['android'];
/* harmony default export */ __webpack_exports__["default"] = ({
  browser: browser,
  os: os
});

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(48);
var $indexOf = __webpack_require__(33).indexOf;
var arrayMethodIsStrict = __webpack_require__(109);
var arrayMethodUsesToLength = __webpack_require__(110);

var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('indexOf');
var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(48);
var parseIntImplementation = __webpack_require__(174);

// `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix
$({ global: true, forced: parseInt != parseIntImplementation }, {
  parseInt: parseIntImplementation
});


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(10);
var trim = __webpack_require__(163).trim;
var whitespaces = __webpack_require__(164);

var $parseInt = global.parseInt;
var hex = /^[+-]?0[Xx]/;
var FORCED = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22;

// `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix
module.exports = FORCED ? function parseInt(string, radix) {
  var S = trim(String(string));
  return $parseInt(S, (radix >>> 0) || (hex.test(S) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(48);
var exec = __webpack_require__(176);

$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpFlags = __webpack_require__(158);
var stickyHelpers = __webpack_require__(177);

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(5);

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

exports.UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(179);
var isRegExp = __webpack_require__(180);
var anObject = __webpack_require__(22);
var requireObjectCoercible = __webpack_require__(7);
var speciesConstructor = __webpack_require__(73);
var advanceStringIndex = __webpack_require__(181);
var toLength = __webpack_require__(34);
var callRegExpExec = __webpack_require__(183);
var regexpExec = __webpack_require__(176);
var fails = __webpack_require__(5);

var arrayPush = [].push;
var min = Math.min;
var MAX_UINT32 = 0xFFFFFFFF;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

// @@split logic
fixRegExpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output.length > lim ? output.slice(0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
}, !SUPPORTS_Y);


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__(175);
var redefine = __webpack_require__(51);
var fails = __webpack_require__(5);
var wellKnownSymbol = __webpack_require__(9);
var regexpExec = __webpack_require__(176);
var createNonEnumerableProperty = __webpack_require__(16);

var SPECIES = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  return 'a'.replace(/./, '$0') === '$0';
})();

var REPLACE = wellKnownSymbol('replace');
// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !(
      REPLACE_SUPPORTS_NAMED_GROUPS &&
      REPLACE_KEEPS_$0 &&
      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
};


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(21);
var classof = __webpack_require__(6);
var wellKnownSymbol = __webpack_require__(9);

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__(182).charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(35);
var requireObjectCoercible = __webpack_require__(7);

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(6);
var regexpExec = __webpack_require__(176);

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};



/***/ }),
/* 184 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(123);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(124);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(125);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(128);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(129);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _util_stream__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(151);
/* harmony import */ var _enum_stream_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(167);
/* harmony import */ var _enum_nalu_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(185);
/* harmony import */ var _codec_avc__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(186);
/* harmony import */ var _codec_avc_avc_config__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(197);
/* harmony import */ var _util_logger__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(131);






/**
 * @file: avc.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * H.264/AVC/HEVC Stream.
 */







var H264Stream =
/*#__PURE__*/
function (_Stream) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(H264Stream, _Stream);

  function H264Stream(psi) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, H264Stream);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(H264Stream).call(this));
    /** @private {PSI} */

    _this.PSI = psi;
    /** @private {?Object} */

    _this.trackId = null;
    /** @private {Array} */

    _this.currentFrame = []; // a group of nalu

    /** @private {AVCCodec} */

    _this.codec = new _codec_avc__WEBPACK_IMPORTED_MODULE_8__["default"]();

    _this._newGop();

    _this._newGops();

    _this.codec.on('nalu', function (nalu) {
      if (nalu.unit_type === _enum_nalu_types__WEBPACK_IMPORTED_MODULE_7__["default"].SPS) {
        var track = _this.PSI.findTrack(_this.trackId);

        var config = Object(_codec_avc_avc_config__WEBPACK_IMPORTED_MODULE_9__["default"])(nalu.sps); // write sps info to video track.

        track.codec = config.codec;
        track.width = nalu.sps.width;
        track.height = nalu.sps.height;
        track.profileIdc = nalu.sps.profile_idc;
        track.profileCompatibility = nalu.sps.profile_compatibility;
        track.levelIdc = nalu.sps.level_idc;
        track.pixelRatio = nalu.sps.pixelRatio;
        track.sps = [nalu.rawData];
      } else if (nalu.unit_type === _enum_nalu_types__WEBPACK_IMPORTED_MODULE_7__["default"].PPS) {
        var _track = _this.PSI.findTrack(_this.trackId);

        _track.pps = [nalu.rawData];
      }

      _this._grouping(nalu);
    });

    return _this;
  }
  /**
   * Push a complete pes
   * @param data
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(H264Stream, [{
    key: "push",
    value: function push(data) {
      if (data.stream_type === _enum_stream_types__WEBPACK_IMPORTED_MODULE_6__["default"].H264 || data.stream_type === _enum_stream_types__WEBPACK_IMPORTED_MODULE_6__["default"].HEVC) {
        this.trackId = data.pid;
        this.codec.push(data);
      }
    }
  }, {
    key: "flush",
    value: function flush() {
      // Push last frame into gop.
      if (this.currentFrame.length > 0) {
        // If the last frame has valid duration, use the duration of the previous frame
        if (!this.currentFrame.duration || this.currentFrame.duration <= 0) {
          this.currentFrame.duration = this.prevFrame.duration || 0;
        }

        this._pushFrameIntoGop();

        this.currentFrame = [];
      } // Push last gop.


      if (this.gop.length > 0) {
        this._pushGopIntoGroup();
      }
    }
  }, {
    key: "reset",
    value: function reset() {
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

  }, {
    key: "_grouping",
    value: function _grouping(currentNal) {
      if (currentNal.unit_type === _enum_nalu_types__WEBPACK_IMPORTED_MODULE_7__["default"].AUD) {
        if (this.currentFrame.length > 0) {
          this.currentFrame.duration = currentNal.dts - this.currentFrame.dts;

          if (this.gop.length > 0 && this.currentFrame.keyframe) {
            this.gop.trackId = this.trackId;

            this._pushGopIntoGroup();
          } // the gop should commence with a key frame,
          // or the frame will be dropped until finding one that contains a key frame.


          if (this.currentFrame.keyframe || this.gop.length > 0) {
            this._pushFrameIntoGop();
          } else {
            _util_logger__WEBPACK_IMPORTED_MODULE_10__["default"].warn("h264 codec drop frame");
          }
        }

        this.prevFrame = this.currentFrame; // end a frame.

        this.currentFrame = [];
        this.currentFrame.keyframe = false;
        this.currentFrame.byteLength = 0;
        this.currentFrame.naluCount = 0;
        this.currentFrame.pts = currentNal.pts;
        this.currentFrame.dts = currentNal.dts;
      } else {
        if (currentNal.unit_type === _enum_nalu_types__WEBPACK_IMPORTED_MODULE_7__["default"].IDR_SLICE) {
          this.currentFrame.keyframe = true;
        }

        this.currentFrame.byteLength += currentNal.rawData.byteLength;
        this.currentFrame.naluCount++;
        this.currentFrame.push(currentNal);
      }

      this.currentFrame.duration = currentNal.dts - this.currentFrame.dts;
    }
  }, {
    key: "_newGop",
    value: function _newGop() {
      this.gop = []; // a group of idr-start-frame sequence

      this.gop.duration = 0;
      this.gop.naluCount = 0;
      this.gop.byteLength = 0;
    }
  }, {
    key: "_pushFrameIntoGop",
    value: function _pushFrameIntoGop() {
      // Gop
      this.gop.push(this.currentFrame);
      this.gop.duration += this.currentFrame.duration;
      this.gop.byteLength += this.currentFrame.byteLength;
      this.gop.naluCount += this.currentFrame.naluCount;
    }
  }, {
    key: "_newGops",
    value: function _newGops() {
      this.gops = []; // a group of gop

      this.gops.type = 'video';
      this.gops.duration = 0;
      this.gops.naluCount = 0;
      this.gops.byteLength = 0;
      this.gops.frameLength = 0;
      this.gops.firstDTS = 0;
    }
  }, {
    key: "_pushGopIntoGroup",
    value: function _pushGopIntoGroup() {
      var firstFrame = this.gop[0]; // GOPs

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
  }]);

  return H264Stream;
}(_util_stream__WEBPACK_IMPORTED_MODULE_5__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (H264Stream);

/***/ }),
/* 185 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @file: nalu-types.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 * @overview nal_unit_type, defined in ISO/IEC 14496-10:Table 7-1 – NAL unit type codes
 */

/*
// nal_unit_type    Content of NAL unit and RBSP syntax structure                                   C
// 0                Unspecified
// 1                Coded slice of a non-IDR picture slice_layer_without_partitioning_rbsp( )       2, 3, 4
// 2                Coded slice data partition A slice_data_partition_a_layer_rbsp( )               2
// 3                Coded slice data partition B slice_data_partition_b_layer_rbsp( )               3
// 4                Coded slice data partition C slice_data_partition_c_layer_rbsp( )               4
// 5                Coded slice of an IDR picture slice_layer_without_partitioning_rbsp( )          2, 3
// 6                (SEI)Supplemental enhancement information sei_rbsp( )                           5
// 7                (SPS)Sequence parameter set seq_parameter_set_rbsp( )                           0
// 8                (PPS)Picture parameter set pic_parameter_set_rbsp( )                            1
// 9                (AUD)Access unit delimiter access_unit_delimiter_rbsp( )                        6
// 10               End of sequence end_of_seq_rbsp( )                                              7
// 11               End of stream end_of_stream_rbsp( )                                             8
// 12               Filler data filler_data_rbsp( )                                                 9
// 13..23           Reserved
// 24..31           Unspecified
*/

/**
 * @readonly
 * @enum {number}
 * @export
 */
/* harmony default export */ __webpack_exports__["default"] = ({
  NON_IDR_SLICE: 0x01,
  DPA_SLICE: 0x02,
  DPB_SLICE: 0x03,
  DPC_SLICE: 0x04,
  IDR_SLICE: 0x05,
  SEI: 0x06,
  SPS: 0x07,
  PPS: 0x08,
  AUD: 0x09,
  END_SEQUENCE: 0x0a,
  END_STREAM: 0x0b
});

/***/ }),
/* 186 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(132);
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_buffer_slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(65);
/* harmony import */ var core_js_modules_es_array_buffer_slice__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_buffer_slice__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(75);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_typed_array_uint8_array__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(79);
/* harmony import */ var core_js_modules_es_typed_array_uint8_array__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_uint8_array__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_typed_array_copy_within__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(95);
/* harmony import */ var core_js_modules_es_typed_array_copy_within__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_copy_within__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_typed_array_every__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(97);
/* harmony import */ var core_js_modules_es_typed_array_every__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_every__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_typed_array_fill__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(98);
/* harmony import */ var core_js_modules_es_typed_array_fill__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_fill__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_typed_array_filter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(99);
/* harmony import */ var core_js_modules_es_typed_array_filter__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_filter__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_typed_array_find__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(100);
/* harmony import */ var core_js_modules_es_typed_array_find__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_find__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_typed_array_find_index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(101);
/* harmony import */ var core_js_modules_es_typed_array_find_index__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_find_index__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_typed_array_for_each__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(102);
/* harmony import */ var core_js_modules_es_typed_array_for_each__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_for_each__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_typed_array_includes__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(103);
/* harmony import */ var core_js_modules_es_typed_array_includes__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_includes__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_typed_array_index_of__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(104);
/* harmony import */ var core_js_modules_es_typed_array_index_of__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_index_of__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_typed_array_iterator__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(105);
/* harmony import */ var core_js_modules_es_typed_array_iterator__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_iterator__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_typed_array_join__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(106);
/* harmony import */ var core_js_modules_es_typed_array_join__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_join__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_typed_array_last_index_of__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(107);
/* harmony import */ var core_js_modules_es_typed_array_last_index_of__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_last_index_of__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_typed_array_map__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(111);
/* harmony import */ var core_js_modules_es_typed_array_map__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_map__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_typed_array_reduce__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(112);
/* harmony import */ var core_js_modules_es_typed_array_reduce__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_reduce__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_typed_array_reduce_right__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(114);
/* harmony import */ var core_js_modules_es_typed_array_reduce_right__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_reduce_right__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_es_typed_array_reverse__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(115);
/* harmony import */ var core_js_modules_es_typed_array_reverse__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_reverse__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_es_typed_array_set__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(116);
/* harmony import */ var core_js_modules_es_typed_array_set__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_set__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_es_typed_array_slice__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(117);
/* harmony import */ var core_js_modules_es_typed_array_slice__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_slice__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_es_typed_array_some__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(118);
/* harmony import */ var core_js_modules_es_typed_array_some__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_some__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var core_js_modules_es_typed_array_sort__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(119);
/* harmony import */ var core_js_modules_es_typed_array_sort__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_sort__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var core_js_modules_es_typed_array_subarray__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(120);
/* harmony import */ var core_js_modules_es_typed_array_subarray__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_subarray__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var core_js_modules_es_typed_array_to_locale_string__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(121);
/* harmony import */ var core_js_modules_es_typed_array_to_locale_string__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_to_locale_string__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var core_js_modules_es_typed_array_to_string__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(122);
/* harmony import */ var core_js_modules_es_typed_array_to_string__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_to_string__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(123);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(124);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(125);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(128);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_31__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(129);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_32__);
/* harmony import */ var _util_event_emitter__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(144);
/* harmony import */ var _avc_nalu__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(187);


































/**
 * @file: avc.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * h.264/AVC codec
 */



var AVCCodec =
/*#__PURE__*/
function (_EventEmitter) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_32___default()(AVCCodec, _EventEmitter);

  function AVCCodec() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_28___default()(this, AVCCodec);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_30___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_31___default()(AVCCodec).call(this));
    _this.cachedBytes = null;
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_29___default()(AVCCodec, [{
    key: "push",
    value: function push(data) {
      var self = this;
      var i = 0,
          naluOffset = 0,
          lastStartCodeLength = 0;
      var pesPacket = data.pes;
      var pts = pesPacket.PTS,
          dts = pesPacket.DTS;
      var pes_data_byte = pesPacket.data_byte;
      var data_byte;

      if (this.cachedBytes) {
        try {
          data_byte = new Uint8Array(this.cachedBytes.byteLength + pes_data_byte.byteLength);
        } catch (e) {
          throw "h264 alloc mem error ".concat(this.cachedBytes.byteLength, "/").concat(pes_data_byte.byteLength);
        }

        data_byte.set(this.cachedBytes);
        data_byte.set(pes_data_byte, this.cachedBytes.byteLength);
      } else {
        data_byte = pes_data_byte;
      }
      /** 有naluSizeLength即以size+data结构解析 否则按照固定拆分解 */


      if (!pesPacket.hasOwnProperty('naluSizeLength')) {
        var j = data_byte.byteLength - 1;
        var dropZerosLength = 0; // Collect tailing zeros.
        // end with 0x000000 and more...

        do {
          if (data_byte[j] === 0x00) {
            dropZerosLength++;
          } else {
            break;
          }

          j--;
        } while (j > 0);

        if (dropZerosLength >= 3) {
          // drop tailing zeros.
          data_byte = data_byte.subarray(0, j + 1);
        }

        do {
          var uint32 = data_byte[i] << 24 | data_byte[i + 1] << 16 | data_byte[i + 2] << 8 | data_byte[i + 3];
          var start_code = data_byte.length - i >= 4 ? uint32 : -1;
          var start_code_length = 0;
          var isLastByte = i === data_byte.length - 1;

          if (start_code >> 8 === 1) {
            /*commence with 3 bytes*/
            start_code_length = 3;
          } else if (start_code === 1) {
            /*commence with 4 bytes*/
            start_code_length = 4;
          }

          if (start_code_length === 3 || start_code_length === 4 || isLastByte) {
            var startPos = naluOffset + lastStartCodeLength;
            var isNaluEndByte = isLastByte && dropZerosLength >= 3;

            if (i > naluOffset && (!isLastByte || isNaluEndByte)) {
              var bytes = data_byte.subarray(startPos, isNaluEndByte ? i + 1 : i);
              var nalu = new _avc_nalu__WEBPACK_IMPORTED_MODULE_34__["default"](bytes); // PES

              nalu.pts = pts;
              nalu.dts = dts;
              self.emit('nalu', nalu);
              naluOffset = i;
            }

            if (isLastByte) {
              if (dropZerosLength < 3) {
                this.cachedBytes = data_byte.subarray(naluOffset);
                this.cachedBytes.pts = pts;
                this.cachedBytes.dts = dts;
                this.cachedBytes.startCodeLength = lastStartCodeLength;
              } else {
                this.cachedBytes = null;
              }
            }

            if (i === naluOffset) {
              // record last start code length.
              lastStartCodeLength = start_code_length;
            }

            i += start_code_length || 1;
          } else {
            i++;
          }
        } while (i < data_byte.length);
      } else {
        var naluSizeLength = pesPacket.naluSizeLength;
        var _startPos = 0,
            size = 0,
            endPos = 0;

        do {
          size = 0;

          for (var k = 0; k < naluSizeLength; k++) {
            size = size | data_byte[_startPos + k] << (naluSizeLength - k - 1) * 8;
          } // size = (data_byte[i] << 24) | (data_byte[i + 1] << 16) | (data_byte[i + 2] << 8) | data_byte[i + 3];


          _startPos += naluSizeLength;
          endPos = _startPos + size;

          if (endPos > data_byte.length) {
            endPos = data_byte.length;
          }

          var _bytes = data_byte.subarray(_startPos, endPos);

          var _nalu = new _avc_nalu__WEBPACK_IMPORTED_MODULE_34__["default"](_bytes); // PES


          _nalu.pts = pts;
          _nalu.dts = dts;
          self.emit('nalu', _nalu);
          _startPos = endPos;
        } while (_startPos < data_byte.length);
      }

      if (this.cachedBytes) {
        var _nalu2 = new _avc_nalu__WEBPACK_IMPORTED_MODULE_34__["default"](this.cachedBytes.subarray(this.cachedBytes.startCodeLength));

        _nalu2.pts = this.cachedBytes.pts;
        _nalu2.dts = this.cachedBytes.dts;
        this.emit('nalu', _nalu2);
        this.cachedBytes = null;
      }

      this.emit('done');
    }
  }, {
    key: "reset",
    value: function reset() {
      this.cachedBytes = null;
    }
  }]);

  return AVCCodec;
}(_util_event_emitter__WEBPACK_IMPORTED_MODULE_33__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (AVCCodec);

/***/ }),
/* 187 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NALU; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(123);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(125);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(128);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(129);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _util_dv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(188);
/* harmony import */ var _enum_nalu_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(185);
/* harmony import */ var _ep3b__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(192);
/* harmony import */ var _sps__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(193);
/* harmony import */ var _pps__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(195);





/**
 * @file: nalu.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */





/**
 * decode (SEI)Supplemental enhancement information
 * @param payload
 * @returns {{}}
 * @private
 */

function _decodeSEI(payload) {
  return {};
}
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

var NALU =
/*#__PURE__*/
function (_DataViewReader) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(NALU, _DataViewReader);

  function NALU(buffer) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, NALU);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(NALU).call(this));
    _this.forbidden_zero_bit = buffer[0] >> 7; // nalu priority.

    _this.ref_idc = buffer[0] >> 5 & 0x03; // specifies the type of RBSP data structure. see in mux-nalu-types.js

    _this.unit_type = buffer[0] & 0x1f;
    _this.data = Object(_ep3b__WEBPACK_IMPORTED_MODULE_6__["default"])(buffer.subarray(1));
    _this.rawData = buffer;

    switch (_this.unit_type) {
      case _enum_nalu_types__WEBPACK_IMPORTED_MODULE_5__["default"].NON_IDR_SLICE:
        break;

      case _enum_nalu_types__WEBPACK_IMPORTED_MODULE_5__["default"].DPA_SLICE:
      case _enum_nalu_types__WEBPACK_IMPORTED_MODULE_5__["default"].DPB_SLICE:
      case _enum_nalu_types__WEBPACK_IMPORTED_MODULE_5__["default"].DPC_SLICE:
        // TODO decode A/B/C Partition Slice.
        break;

      case _enum_nalu_types__WEBPACK_IMPORTED_MODULE_5__["default"].IDR_SLICE:
        // this.data = decodeSlice(this.data).data;
        break;

      case _enum_nalu_types__WEBPACK_IMPORTED_MODULE_5__["default"].SPS:
        _this.sps = Object(_sps__WEBPACK_IMPORTED_MODULE_7__["default"])(_this.data);
        break;

      case _enum_nalu_types__WEBPACK_IMPORTED_MODULE_5__["default"].PPS:
        _this.pps = Object(_pps__WEBPACK_IMPORTED_MODULE_8__["default"])(_this.data);
        break;

      case _enum_nalu_types__WEBPACK_IMPORTED_MODULE_5__["default"].SEI:
        _this.sei = _decodeSEI(_this.data);
        break;

      case _enum_nalu_types__WEBPACK_IMPORTED_MODULE_5__["default"].AUD:
        _this.primary_pic_type = _decodeAUD(_this.data);
        break;
    }

    return _this;
  }

  return NALU;
}(_util_dv__WEBPACK_IMPORTED_MODULE_4__["default"]);



/***/ }),
/* 188 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_buffer_constructor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(189);
/* harmony import */ var core_js_modules_es_array_buffer_constructor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_buffer_constructor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_buffer_is_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(190);
/* harmony import */ var core_js_modules_es_array_buffer_is_view__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_buffer_is_view__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_buffer_slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(65);
/* harmony import */ var core_js_modules_es_array_buffer_slice__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_buffer_slice__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_data_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(191);
/* harmony import */ var core_js_modules_es_data_view__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_data_view__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(75);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(123);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(124);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__);








/**
 * @file: dv.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * Bit buffer reader like DataView.
 */
function read(buf) {
  var byteOffset = 0;

  if (ArrayBuffer.isView(buf)) {
    byteOffset = buf.byteOffset;
    buf = buf.buffer;
  }

  return new DataView(buf, byteOffset);
}

var DataViewReader =
/*#__PURE__*/
function () {
  function DataViewReader() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5___default()(this, DataViewReader);
  }
  /**
   * Gets an unsigned 8-bit integer (unsigned byte).
   * @param buffer
   * @param byteOffset    The offset, in byte, from the start of the view where to read the data.
   * @returns {number}    An unsigned 8-bit integer number.
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(DataViewReader, [{
    key: "readUint8",
    value: function readUint8(buffer, byteOffset) {
      return read(buffer).getUint8(byteOffset);
    }
    /**
     * Gets an unsigned 16-bit integer (unsigned long).
     * @param buffer
     * @param byteOffset     The offset, in byte, from the start of the view where to read the data.
     * @param littleEndian   Indicates whether the 16-bit int is stored in little- or big-endian format.
     * @returns {number}     An unsigned 16-bit integer number.
     */

  }, {
    key: "readUint16",
    value: function readUint16(buffer, byteOffset) {
      var littleEndian = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return read(buffer).getUint16(byteOffset, littleEndian);
    }
    /**
     * Gets an unsigned 32-bit integer (unsigned long).
     * @param buffer
     * @param byteOffset        The offset, in byte, from the start of the view where to read the data.
     * @param littleEndian      Indicates whether the 32-bit int is stored in little- or big-endian format.
     * @returns {number}        An unsigned 32-bit integer number.
     */

  }, {
    key: "readUint32",
    value: function readUint32(buffer, byteOffset) {
      var littleEndian = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return read(buffer).getUint32(byteOffset, littleEndian);
    }
  }]);

  return DataViewReader;
}();

/* harmony default export */ __webpack_exports__["default"] = (DataViewReader);

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(48);
var global = __webpack_require__(10);
var arrayBufferModule = __webpack_require__(66);
var setSpecies = __webpack_require__(93);

var ARRAY_BUFFER = 'ArrayBuffer';
var ArrayBuffer = arrayBufferModule[ARRAY_BUFFER];
var NativeArrayBuffer = global[ARRAY_BUFFER];

// `ArrayBuffer` constructor
// https://tc39.github.io/ecma262/#sec-arraybuffer-constructor
$({ global: true, forced: NativeArrayBuffer !== ArrayBuffer }, {
  ArrayBuffer: ArrayBuffer
});

setSpecies(ARRAY_BUFFER);


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(48);
var ArrayBufferViewCore = __webpack_require__(83);

var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;

// `ArrayBuffer.isView` method
// https://tc39.github.io/ecma262/#sec-arraybuffer.isview
$({ target: 'ArrayBuffer', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
  isView: ArrayBufferViewCore.isView
});


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(48);
var ArrayBufferModule = __webpack_require__(66);
var NATIVE_ARRAY_BUFFER = __webpack_require__(67);

// `DataView` constructor
// https://tc39.github.io/ecma262/#sec-dataview-constructor
$({ global: true, forced: !NATIVE_ARRAY_BUFFER }, {
  DataView: ArrayBufferModule.DataView
});


/***/ }),
/* 192 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return discardEP3B; });
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_buffer_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(65);
/* harmony import */ var core_js_modules_es_array_buffer_slice__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_buffer_slice__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(75);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_typed_array_uint8_array__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(79);
/* harmony import */ var core_js_modules_es_typed_array_uint8_array__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_uint8_array__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_typed_array_copy_within__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(95);
/* harmony import */ var core_js_modules_es_typed_array_copy_within__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_copy_within__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_typed_array_every__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(97);
/* harmony import */ var core_js_modules_es_typed_array_every__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_every__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_typed_array_fill__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(98);
/* harmony import */ var core_js_modules_es_typed_array_fill__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_fill__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_typed_array_filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(99);
/* harmony import */ var core_js_modules_es_typed_array_filter__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_filter__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_typed_array_find__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(100);
/* harmony import */ var core_js_modules_es_typed_array_find__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_find__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_typed_array_find_index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(101);
/* harmony import */ var core_js_modules_es_typed_array_find_index__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_find_index__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_typed_array_for_each__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(102);
/* harmony import */ var core_js_modules_es_typed_array_for_each__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_for_each__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_typed_array_includes__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(103);
/* harmony import */ var core_js_modules_es_typed_array_includes__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_includes__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_typed_array_index_of__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(104);
/* harmony import */ var core_js_modules_es_typed_array_index_of__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_index_of__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_typed_array_iterator__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(105);
/* harmony import */ var core_js_modules_es_typed_array_iterator__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_iterator__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_typed_array_join__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(106);
/* harmony import */ var core_js_modules_es_typed_array_join__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_join__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_typed_array_last_index_of__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(107);
/* harmony import */ var core_js_modules_es_typed_array_last_index_of__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_last_index_of__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_typed_array_map__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(111);
/* harmony import */ var core_js_modules_es_typed_array_map__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_map__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_typed_array_reduce__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(112);
/* harmony import */ var core_js_modules_es_typed_array_reduce__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_reduce__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_typed_array_reduce_right__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(114);
/* harmony import */ var core_js_modules_es_typed_array_reduce_right__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_reduce_right__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_typed_array_reverse__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(115);
/* harmony import */ var core_js_modules_es_typed_array_reverse__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_reverse__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_es_typed_array_set__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(116);
/* harmony import */ var core_js_modules_es_typed_array_set__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_set__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_es_typed_array_slice__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(117);
/* harmony import */ var core_js_modules_es_typed_array_slice__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_slice__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_es_typed_array_some__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(118);
/* harmony import */ var core_js_modules_es_typed_array_some__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_some__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_es_typed_array_sort__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(119);
/* harmony import */ var core_js_modules_es_typed_array_sort__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_sort__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var core_js_modules_es_typed_array_subarray__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(120);
/* harmony import */ var core_js_modules_es_typed_array_subarray__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_subarray__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var core_js_modules_es_typed_array_to_locale_string__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(121);
/* harmony import */ var core_js_modules_es_typed_array_to_locale_string__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_to_locale_string__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var core_js_modules_es_typed_array_to_string__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(122);
/* harmony import */ var core_js_modules_es_typed_array_to_string__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_to_string__WEBPACK_IMPORTED_MODULE_26__);




























/**
 * @file: ep3b.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * discard the emulation_prevention_three_byte
 * @param data
 * @returns {Uint8Array}
 */
function discardEP3B(data) {
  var length = data.byteLength,
      emulationPreventionBytesPositions = [],
      i = 1,
      newLength,
      newData = new Uint8Array(0); // Find all `Emulation Prevention Bytes`

  while (i < length - 2) {
    if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0x03) {
      emulationPreventionBytesPositions.push(i + 2);
      i += 2;
    } else {
      i++;
    }
  } // If no Emulation Prevention Bytes were found just return the original
  // array


  if (emulationPreventionBytesPositions.length === 0) {
    return data;
  } // Create a new array to hold the NAL unit data


  newLength = length - emulationPreventionBytesPositions.length;

  try {
    newData = new Uint8Array(newLength);
  } catch (e) {
    throw "epsb alloc mem error ".concat(newLength);
  }

  var sourceIndex = 0;

  for (i = 0; i < newLength; sourceIndex++, i++) {
    if (sourceIndex === emulationPreventionBytesPositions[0]) {
      // Skip this byte
      sourceIndex++; // Remove this position index

      emulationPreventionBytesPositions.shift();
    }

    newData[i] = data[sourceIndex];
  }

  return newData;
}

/***/ }),
/* 193 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(194);
/**
 * @file: sps.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

var bitOffset = 0;
/**
 * 7.3.2.1.1.1 Scaling list syntax
 * @param scalingList
 * @param size
 */

function scaling_list(scalingList, size) {
  var lastScale = 8;
  var nextScale = 8;
  var delta_scale;

  for (var j = 0; j < size; j++) {
    if (nextScale != 0) {
      delta_scale = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readUEV(scalingList, bitOffset);
      bitOffset += delta_scale.bitLength;
      nextScale = (lastScale + delta_scale.value + 256) % 256;
    }

    lastScale = scalingList[j];
  }
}
/**
 * decode (SPS)Sequence parameter set
 * @param payload
 * @returns {{}}
 */


/* harmony default export */ __webpack_exports__["default"] = (function (payload) {
  bitOffset = 0;
  var profile_idc = payload[0];
  var profile_compatibility = payload[1];
  var level_idc = payload[2];
  var golombBuffer = payload.subarray(3);
  var separate_colour_plane_flag = 0,
      qpprime_y_zero_transform_bypass_flag = 0,
      seq_scaling_matrix_present_flag = 0;
  var lmpoclmUEV;
  var delta_pic_order_always_zero_flag = 0,
      ofnrpSEV,
      ofttbfSEV,
      nrfipoccUEV;
  var pixelRatio = [1, 1],
      pixelScale = 1;
  var video_format;
  var fps = 0,
      num_units_in_tick,
      time_scale,
      fixed_frame_rate_flag = true; // seq_parameter_set_id

  var spsUEV = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readUEV(golombBuffer, bitOffset);
  bitOffset += spsUEV.bitLength;

  if (profile_idc == 100 || profile_idc == 110 || profile_idc == 122 || profile_idc == 244 || profile_idc == 44 || profile_idc == 83 || profile_idc == 86 || profile_idc == 118 || profile_idc == 128) {
    // chroma_format_idc
    var chromaFIUEV = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readUEV(golombBuffer, bitOffset);
    bitOffset += chromaFIUEV.bitLength;

    if (chromaFIUEV.value == 3) {
      // separate_colour_plane_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
      bitOffset += 1;
    } // bit_depth_luma_minus8


    var bitdlmUEV = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readUEV(golombBuffer, bitOffset);
    bitOffset += bitdlmUEV.bitLength; // bit_depth_chroma_minus8

    var bitdcmUEV = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readUEV(golombBuffer, bitOffset);
    bitOffset += bitdcmUEV.bitLength; // qpprime_y_zero_transform_bypass_flag
    // qpprime_y_zero_transform_bypass_flag = ExpGolomb.readBit(golombBuffer, bitOffset);

    bitOffset += 1; // seq_scaling_matrix_present_flag

    seq_scaling_matrix_present_flag = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readBit(golombBuffer, bitOffset);
    bitOffset += 1;

    if (seq_scaling_matrix_present_flag) {
      for (var i = 0; i < (chromaFIUEV.value != 3 ? 8 : 12); i++) {
        var seq_scaling_list_present_flag = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readBit(golombBuffer, bitOffset);
        bitOffset += 1;

        if (seq_scaling_list_present_flag) {
          if (i < 6) {
            scaling_list(golombBuffer, 16);
          } else {
            scaling_list(golombBuffer, 64);
          }
        }
      }
    }
  } // log2_max_frame_num_minus4


  var lmfnmUEV = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readUEV(golombBuffer, bitOffset);
  bitOffset += lmfnmUEV.bitLength; // pic_order_cnt_type

  var poctUEV = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readUEV(golombBuffer, bitOffset);
  var pic_order_cnt_type = poctUEV.value;
  bitOffset += poctUEV.bitLength;

  if (pic_order_cnt_type === 0) {
    // log2_max_pic_order_cnt_lsb_minus4
    lmpoclmUEV = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readUEV(golombBuffer, bitOffset);
    bitOffset += lmpoclmUEV.bitLength;
  } else if (pic_order_cnt_type === 1) {
    // delta_pic_order_always_zero_flag = ExpGolomb.readBit(golombBuffer, bitOffset);
    bitOffset += 1; // offset_for_non_ref_pic

    ofnrpSEV = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readSEV(golombBuffer, bitOffset);
    bitOffset += ofnrpSEV.bitLength; // offset_for_top_to_bottom_field

    ofttbfSEV = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readSEV(golombBuffer, bitOffset);
    bitOffset += ofttbfSEV.bitLength; // num_ref_frames_in_pic_order_cnt_cycle

    nrfipoccUEV = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readUEV(golombBuffer, bitOffset);
    bitOffset += nrfipoccUEV.bitLength; // let offset_for_ref_frames = [];

    for (var _i = 0, item; _i < nrfipoccUEV.value; _i++) {
      item = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readSEV(golombBuffer, bitOffset);
      bitOffset += item.bitLength; // offset_for_ref_frames.push(item);
    }
  } // max_num_ref_frames
  // 指定参考帧队列可能达到的最大长度，解码器依照这个句法元素的值开辟存储区，这个存储区用于存放已解码的参考帧，
  // H.264 规定最多可用 16 个参考帧，本句法元素的值最大为 16。值得注意的是这个长度以帧为单位，如果在场模式下，应该相应地扩展一倍


  var mnrfUEV = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readUEV(golombBuffer, bitOffset);
  bitOffset += mnrfUEV.bitLength; // gaps_in_frame_num_value_allowed_flag
  // let gaps_in_frame_num_value_allowed_flag = ExpGolomb.readBit(golombBuffer, bitOffset);

  bitOffset += 1; // pic_width_in_mbs_minus1

  var picWidthUEV = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readUEV(golombBuffer, bitOffset);
  bitOffset += picWidthUEV.bitLength; // pic_height_in_map_units_minus1

  var picHeightUEV = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readUEV(golombBuffer, bitOffset);
  bitOffset += picHeightUEV.bitLength; // frame_mbs_only_flag
  // 本句法元素等于 1 时, 表示本序列中所有图像的编码模式都是帧编码；
  // 本句法元素等于 0 时, 表示本序列中图像的编码模式可能是帧，也可能是场或帧场自适应，某个图像具体是哪一种要由其他句法元素决定。

  var frame_mbs_only_flag = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readBit(golombBuffer, bitOffset);
  bitOffset += 1;

  if (!frame_mbs_only_flag) {
    // mb_adaptive_frame_field_flag (Unused, Unnecessary to read it.)
    // ExpGolomb.readBit(golombBuffer, bitOffset);
    bitOffset += 1;
  } // direct_8x8_inference_flag,  用于指明 B 片的直接 和 skip 模式下运动矢量的预测方法
  // let direct_8x8_inference_flag = ExpGolomb.readBit(golombBuffer, bitOffset);


  bitOffset += 1; // frame_cropping_flag, 用于指明解码器是否要将图像裁剪后输出，如果是的话，后面紧跟着的四个句法元素分别指出左右、上下裁剪的宽度

  var frame_cropping_flag = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readBit(golombBuffer, bitOffset);
  bitOffset += 1;
  var cropLeft = 0,
      cropRight = 0,
      cropTop = 0,
      cropBottom = 0;

  if (frame_cropping_flag) {
    var fcloUEV = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readUEV(golombBuffer, bitOffset);
    bitOffset += fcloUEV.bitLength;
    cropLeft = fcloUEV.value;
    var fcroUEV = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readUEV(golombBuffer, bitOffset);
    bitOffset += fcroUEV.bitLength;
    cropRight = fcroUEV.value;
    var fctoUEV = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readUEV(golombBuffer, bitOffset);
    bitOffset += fctoUEV.bitLength;
    cropTop = fctoUEV.value;
    var fcboUEV = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readUEV(golombBuffer, bitOffset);
    bitOffset += fcboUEV.bitLength;
    cropBottom = fcboUEV.value;
  } // vui_parameters_present_flag


  var vui_parameters_present_flag = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readBit(golombBuffer, bitOffset);
  bitOffset += 1;

  if (vui_parameters_present_flag) {
    // Annex E, E.1.1 VUI parameters syntax
    // VUI 用以表征视频格式等额外信息
    // aspect_ratio, video_format
    var aspect_ratio_info_present_flag = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readBit(golombBuffer, bitOffset);
    bitOffset += 1;

    if (aspect_ratio_info_present_flag) {
      var aspectRatioIdc = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readByte(golombBuffer, bitOffset);
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

        case 255:
          {
            var width0 = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readByte(golombBuffer, bitOffset);
            bitOffset += 8;
            var width1 = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readByte(golombBuffer, bitOffset);
            bitOffset += 8;
            var height0 = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readByte(golombBuffer, bitOffset);
            bitOffset += 8;
            var height1 = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readByte(golombBuffer, bitOffset);
            bitOffset += 8;
            pixelRatio = [width0 << 8 | width1, height0 << 8 | height1];
            break;
          }
      }

      if (pixelRatio) {
        pixelScale = pixelRatio[0] / pixelRatio[1];
      }

      if (aspectRatioIdc === 255) {
        // sar_width
        bitOffset += 16; // sar_height

        bitOffset += 16;
      }
    }

    var overscan_info_present_flag = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readBit(golombBuffer, bitOffset);
    bitOffset += 1;

    if (overscan_info_present_flag) {
      bitOffset += 1; // overscan_appropriate_flag;
    }

    var video_signal_type_present_flag = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readBit(golombBuffer, bitOffset);
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
      video_format = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readBit(golombBuffer, bitOffset, 3);
      bitOffset += 3; // switch (video_format) {
      // }
      // let video_full_range_flag = ExpGolomb.readBit(golombBuffer, bitOffset);

      bitOffset += 1;
      var colour_description_present_flag = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readBit(golombBuffer, bitOffset);
      bitOffset += 1;

      if (colour_description_present_flag) {
        // colour_primaries            u(8)
        // transfer_characteristics    u(8)
        // matrix_coefficients         u(8)
        bitOffset += 24;
      }
    }

    var chroma_loc_info_present_flag = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readBit(golombBuffer, bitOffset);
    bitOffset += 1;

    if (chroma_loc_info_present_flag) {
      var chroma_sample_loc_type_top_field = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readUEV(golombBuffer, bitOffset);
      bitOffset += chroma_sample_loc_type_top_field.bitLength;
      var chroma_sample_loc_type_bottom_field = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readUEV(golombBuffer, bitOffset);
      bitOffset += chroma_sample_loc_type_bottom_field.bitLength;
    }

    var timing_info_present_flag = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readBit(golombBuffer, bitOffset);
    bitOffset += 1;

    if (timing_info_present_flag) {
      num_units_in_tick = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readBit(golombBuffer, bitOffset, 32);
      bitOffset += 32;
      time_scale = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readBit(golombBuffer, bitOffset, 32);
      bitOffset += 32;
      fixed_frame_rate_flag = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_0__["default"].readBit(golombBuffer, bitOffset);
      bitOffset += 1;
      fps = time_scale / (num_units_in_tick * 2);
    } // There is left VUI other's parameters to be decoded ...
    // For now, it is useless, so don't pass them.

  } // let FrameHeightInMbs = (2 - frame_mbs_only_flag) * (picHeightUEV.value + 1);
  // PicSizeInMapUnits = PicWidthInMbs * PicHeightInMapUnits


  return {
    profile_idc: profile_idc,
    profile_compatibility: profile_compatibility,
    level_idc: level_idc,
    sps_id: spsUEV.value,
    // ue(v)
    log2_max_frame_num_minus4: poctUEV.value,
    // ue(v)
    pic_order_cnt_type: pic_order_cnt_type,
    // ue(v)
    log2_max_pic_order_cnt_lsb_minus4: lmpoclmUEV ? lmpoclmUEV.value : 0,
    // ue(v)
    width: Math.ceil(((picWidthUEV.value + 1) * 16 - cropLeft * 2 - cropRight * 2) * pixelScale),
    // PicWidthInSamplesL = PicWidthInMbs * 16
    height: (2 - frame_mbs_only_flag) * (picHeightUEV.value + 1) * 16 - cropTop * 2 - cropBottom * 2,
    pixelRatio: pixelRatio,
    payload: golombBuffer,
    video_format: video_format,
    fps: fps,
    fixedFPS: fixed_frame_rate_flag
  };
});

/***/ }),
/* 194 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(173);
/* harmony import */ var core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_0__);


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
 * @param {number} bitOffset
 * @param {number} length
 * @returns {number}
 * @private
 */
function _readBit(buffer) {
  var bitOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var startByte = 0;
  var startByteBitPos = 0;
  var val = 0;
  var bitStr = '',
      bitVal = 0;

  for (var j = bitOffset; j < bitOffset + length; j++) {
    startByte = Math.floor(j / 8);
    startByteBitPos = 7 - j % 8;
    bitVal = buffer[startByte] >> startByteBitPos & 0x01;
    bitStr += bitVal;
  }

  val = parseInt(bitStr, 2);
  return val;
}
/**
 * read 1 byte.
 * @param buffer
 * @param {number} bitOffset
 * @returns {number}
 * @private
 */


function _readByte(buffer) {
  var bitOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return _readBit(buffer, bitOffset, 8);
}
/**
 * Unsigned Integer Exp-Golomb Coded.
 * @param buffer
 * @param {number} bitOffset
 * @private
 */


function _readUEV(buffer) {
  var bitOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var leadingZeros = [];
  var bitLength = buffer.byteLength * 8;
  var readBit1 = false;
  var startByte = 0;
  var startByteBitPos = 0;
  var bitVal = 0;
  var value = ''; // 1. 计算 leadingZeros

  for (var i = bitOffset; i < bitLength; i++) {
    startByte = Math.floor(i / 8);
    startByteBitPos = 7 - i % 8;
    bitVal = buffer[startByte] >> startByteBitPos & 0x01;

    if (!readBit1) {
      if (bitVal === 0) {
        leadingZeros.push(0);
      } else {
        readBit1 = true;
        bitOffset = i;
        break;
      }
    }
  }

  var codeNumLength = leadingZeros.length + 1; // 2. 计算有效位数值

  for (var j = bitOffset; j < bitOffset + codeNumLength; j++) {
    startByte = Math.floor(j / 8);
    startByteBitPos = 7 - j % 8;
    bitVal = buffer[startByte] >> startByteBitPos & 0x01;
    value += bitVal;
  }

  value = parseInt(value, 2) - 1;
  return {
    bitLength: leadingZeros.length + codeNumLength,
    value: value
  };
}
/**
 * Signed Integer Exp-Golomb Coded.
 * @param buffer
 * @param {number} bitOffset
 * @private
 */


function _readSEV(buffer) {
  var bitOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var uev = _readUEV(buffer, bitOffset);

  var codeNum = uev.value;
  var signedValue = Math.pow(-1, codeNum + 1) * Math.ceil(codeNum / 2);
  return {
    bitLength: uev.bitLength,
    value: signedValue
  };
}

/* harmony default export */ __webpack_exports__["default"] = ({
  readUEV: _readUEV,
  readSEV: _readSEV,
  readBit: _readBit,
  readByte: _readByte
});

/***/ }),
/* 195 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_math_log2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(196);
/* harmony import */ var core_js_modules_es_math_log2__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_math_log2__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_exp_golumb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(194);


/**
 * @file: pps.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * decode (PPS)Picture parameter set
 * @param payload
 * @returns {{}}
 */

/* harmony default export */ __webpack_exports__["default"] = (function (payload) {
  var bitOffset = 0;
  var golombBuffer = payload;
  var slice_group_change_direction_flag = 0,
      sliceGroupIds = [];
  var sgcdfUEV, picSizeUEV;
  var i = 0; // pic_parameter_set_id

  var ppsUEV = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_1__["default"].readUEV(golombBuffer, bitOffset);
  bitOffset += ppsUEV.bitLength; // seq_parameter_set_id

  var spsUEV = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_1__["default"].readUEV(golombBuffer, bitOffset);
  bitOffset += spsUEV.bitLength; // entropy_coding_mode_flag
  // 0: Exp-Golomb coded, see subclause 9.1 or CAVLC, see subclause 9.2
  // 1: CABAC, see subclause 9.3

  var entropy_coding_mode_flag = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_1__["default"].readBit(golombBuffer, bitOffset);
  bitOffset += 1; // bottom_field_pic_order_in_frame_present_flag

  var bottom_field_pic_order_in_frame_present_flag = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_1__["default"].readBit(golombBuffer, bitOffset);
  bitOffset += 1; // num_slice_groups_minus1,

  var sliceGroupUEV = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_1__["default"].readUEV(golombBuffer, bitOffset);
  bitOffset += sliceGroupUEV.bitLength;

  if (sliceGroupUEV.value > 0) {
    // slice_group_map_type
    var sgmtUEV = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_1__["default"].readUEV(golombBuffer, bitOffset);
    bitOffset += sgmtUEV.bitLength;
    var iGroup = 0,
        itemUev;

    switch (sgmtUEV.value) {
      case 0:
        for (iGroup = 0; iGroup <= sgmtUEV.value; iGroup++) {
          // run_length_minus1
          itemUev = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_1__["default"].readUEV(golombBuffer, bitOffset);
          bitOffset += itemUev.bitLength;
        }

        break;

      case 2:
        for (iGroup = 0; iGroup <= sgmtUEV.value; iGroup++) {
          // top_left
          itemUev = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_1__["default"].readUEV(golombBuffer, bitOffset);
          bitOffset += itemUev.bitLength; // bottom_right

          itemUev = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_1__["default"].readUEV(golombBuffer, bitOffset);
          bitOffset += itemUev.bitLength;
        }

        break;

      case 3:
      case 4:
      case 5:
        // slice_group_change_direction_flag
        slice_group_change_direction_flag = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_1__["default"].readBit(golombBuffer, bitOffset);
        bitOffset += 1; // slice_group_change_rate_minus1

        sgcdfUEV = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_1__["default"].readUEV(golombBuffer, bitOffset);
        bitOffset += sgcdfUEV.bitLength;
        break;

      case 6:
        {
          // pic_size_in_map_units_minus1
          picSizeUEV = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_1__["default"].readUEV(golombBuffer, bitOffset);
          bitOffset += picSizeUEV.bitLength;
          var length = Math.ceil(Math.log2(sliceGroupUEV.value + 1));

          for (i = 0; i <= picSizeUEV.value; i++) {
            // pic_size_in_map_units_minus1
            sliceGroupIds.push(_util_exp_golumb__WEBPACK_IMPORTED_MODULE_1__["default"].readBit(golombBuffer, bitOffset, length));
            bitOffset += length;
          }
        }
        break;
    }
  } // num_ref_idx_l0_default_active_minus1


  var nril0dcmUEV = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_1__["default"].readUEV(golombBuffer, bitOffset);
  bitOffset += nril0dcmUEV.bitLength; // num_ref_idx_l1_default_active_minus1

  var nril1dcmUEV = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_1__["default"].readUEV(golombBuffer, bitOffset);
  bitOffset += nril1dcmUEV.bitLength; // weighted_pred_flag

  var weighted_pred_flag = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_1__["default"].readBit(golombBuffer, bitOffset);
  bitOffset += 1; // weighted_bipred_idc

  var weighted_bipred_idc = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_1__["default"].readBit(golombBuffer, bitOffset, 2);
  bitOffset += 1; // pic_init_qp_minus26

  var piqpSEV = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_1__["default"].readSEV(golombBuffer, bitOffset);
  bitOffset += piqpSEV.bitLength; // pic_init_qs_minus26

  var piqsSEV = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_1__["default"].readSEV(golombBuffer, bitOffset);
  bitOffset += piqsSEV.bitLength; // chroma_qp_index_offset

  var cqioSEV = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_1__["default"].readSEV(golombBuffer, bitOffset);
  bitOffset += cqioSEV.bitLength;
  var deblocking_filter_control_present_flag = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_1__["default"].readBit(golombBuffer, bitOffset);
  bitOffset += 1;
  var constrained_intra_pred_flag = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_1__["default"].readBit(golombBuffer, bitOffset);
  bitOffset += 1;
  var redundant_pic_cnt_present_flag = _util_exp_golumb__WEBPACK_IMPORTED_MODULE_1__["default"].readBit(golombBuffer, bitOffset);
  bitOffset += 1; // if( more_rbsp_data( ) ) {
  //     // Unused data...
  // }

  return {
    sliceGroupNum: sliceGroupUEV.value + 1
  };
});

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(48);

var log = Math.log;
var LN2 = Math.LN2;

// `Math.log2` method
// https://tc39.github.io/ecma262/#sec-math.log2
$({ target: 'Math', stat: true }, {
  log2: function log2(x) {
    return log(x) / LN2;
  }
});


/***/ }),
/* 197 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(156);
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(75);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(157);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_2__);




/**
 * @file: avc-config.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * AVC Config Helper
 * Accord sps/pps, generate mimeType info.
 */
/* harmony default export */ __webpack_exports__["default"] = (function (sps, pps) {
  var profile_idc = sps.profile_idc;
  var profile_compatibility = sps.profile_compatibility;
  var level_idc = sps.level_idc;
  var codecString = 'avc1.';
  var arr = [profile_idc, profile_compatibility, level_idc];

  for (var j = 0; j < arr.length; j++) {
    var h = arr[j].toString(16);

    if (h.length < 2) {
      h = '0' + h;
    }

    codecString += h;
  }

  return {
    codec: codecString
  };
});

/***/ }),
/* 198 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(123);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(124);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(125);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(128);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(129);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _util_stream__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(151);
/* harmony import */ var _util_cache_buffer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(165);
/* harmony import */ var _structs_pes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(199);






/**
 * @file: pes.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * Packetized Elementary Stream.
 */




var PesStream =
/*#__PURE__*/
function (_Stream) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(PesStream, _Stream);

  function PesStream(ctx, psi) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, PesStream);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(PesStream).call(this));
    /**
     * @private
     */

    _this.context = ctx;
    /**
     * @type {PSI}
     * @private
     */

    _this.PSI = psi;
    /**
     * @type {?number}
     * @private
     */

    _this.PID = null;
    /**
     * @type {CacheBuffer}
     * @private
     */

    _this.cache_buffer = new _util_cache_buffer__WEBPACK_IMPORTED_MODULE_6__["default"]();
    return _this;
  }
  /**
   * @param {Packet} packet
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(PesStream, [{
    key: "push",
    value: function push(packet) {
      var self = this; // PES PID

      if (packet.PID > 0x00ff && packet.PID < 0x1fff) {
        if (this.PSI.currentProgramPID == -1) {
          self._pushPacket(packet);
        } else if (this.PSI.currentProgramPID !== packet.PID) {
          if (packet.payload_unit_start_indicator === 1) {
            self._assembleOnePES();
          }

          self._pushPacket(packet);
        }
      }
    }
  }, {
    key: "flush",
    value: function flush() {
      var self = this; // 组装最后一个PES

      self._assembleOnePES();

      self.emit('done');
    }
  }, {
    key: "reset",
    value: function reset() {
      this._clearCached();

      this.emit('reset');
    }
  }, {
    key: "_clearCached",
    value: function _clearCached() {
      this.PID = null;
      this.cache_buffer.clear();
    }
  }, {
    key: "_pushPacket",
    value: function _pushPacket(p) {
      var empty = this.cache_buffer.empty; // Make first packet in cache is start unit.

      if (empty && p.payload_unit_start_indicator === 0) {
        return;
      }

      if (empty) {
        this.PID = p.PID;
      }

      this.cache_buffer.append(p.payload);
    }
  }, {
    key: "_assembleOnePES",
    value: function _assembleOnePES() {
      var self = this;

      if (!this.cache_buffer.empty) {
        var bytes;

        try {
          bytes = this.cache_buffer.toNewBytes();
        } catch (e) {
          throw "pes alloc mem err ".concat(this.cache_buffer.byteLength);
        }

        var pesData = new _structs_pes__WEBPACK_IMPORTED_MODULE_7__["default"](bytes);
        var track = this.PSI.findTrack(this.PID); // console.log(`stream_id: ${pesData.stream_id}, PTS: ${pesData.PTS}, DTS: ${pesData.DTS}`);

        if (track) {
          // Assemble one pes packet, emit it to next stream.
          self.emit('data', {
            pid: track.id,
            stream_type: track.stream_type,
            pcr_pid: track.pcr_pid,
            pes: pesData
          });
        }

        self._clearCached();
      }
    }
  }]);

  return PesStream;
}(_util_stream__WEBPACK_IMPORTED_MODULE_5__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (PesStream);

/***/ }),
/* 199 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(123);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(124);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(125);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(128);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(129);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _util_dv__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(188);






/**
 * @file: pes.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * @extends DataViewReader
 */

var Pes =
/*#__PURE__*/
function (_DataViewReader) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(Pes, _DataViewReader);

  function Pes(buffer) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Pes);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Pes).call(this)); // The packet_start_code_prefix is a 24-bit code.

    _this.start_code_prefix = _this.readUint16(buffer, 0) << 8 | buffer[2]; // In Transport Streams,
    // the stream_id may be set to any valid value which correctly describes the elementary stream type.
    // the elementary stream type is specified in the PSI(Program Specific Information).

    _this.stream_id = buffer[3]; // A 16-bit field specifying the number of bytes in the PES packet.

    _this.packet_length = _this.readUint16(buffer, 4);
    _this.data_alignment_indicator = buffer[6] & 0x04;
    _this.copyright = buffer[6] & 0x02; // PTS (presentation time stamp)
    // DTS (decoding time stamp)

    _this.PTS_DTS_flags = buffer[7] >> 6; // ESCR (Elementary Stream Clock Reference system):
    // A time stamp in the PES Stream from which decoders of PES streams may derive timing.

    _this.ESCR_flag = buffer[7] & 0x20;
    _this.ES_rate_flag = buffer[7] & 0x10;
    _this.trick_mode_flag = buffer[7] & 0x08;
    _this.additional_copy_info_flag = buffer[7] & 0x04;
    _this.CRC_flag = buffer[7] & 0x02;
    _this.extension_flag = buffer[7] & 0x01;
    _this.header_data_length = buffer[8];
    _this.PTS = 0;

    if ((_this.PTS_DTS_flags & 0x02) == 0x02) {
      _this.PTS = _this._calcTimestamp(buffer, 9);
    } // if there is no dts, let DTS=PTS
    // See Annex D - D.0.2 Audio and Video Presentation Synchronization


    _this.DTS = _this.PTS;

    if ((_this.PTS_DTS_flags & 0x01) == 0x01) {
      _this.DTS = _this._calcTimestamp(buffer, 14);
    } // if (this.ESCR_flag === 1) {
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


    _this.data_byte = buffer.subarray(9 + _this.header_data_length); // this.isStartPes = (buffer[0] << 16 | buffer[1] << 8 | buffer[2]) & 0xffffff === 0x000001;

    return _this;
  }
  /**
   * @param {Uint8Array} buffer
   * @param {Number} start
   * @private
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Pes, [{
    key: "_calcTimestamp",
    value: function _calcTimestamp(buffer, start) {
      // PTS / DTS is 33 bit
      return (// JS Bitwise operators treat their operands as a sequence of 32 bits,
        // We cannot use bitwise operator in JS beyond 32bits
        (buffer[start] & 0x0e) * 536870912 + ( // Math.pow(2, 29) === 536870912
        buffer[start + 1] << 22) + (buffer[start + 2] >> 1 << 15) + (buffer[start + 3] << 7) + (buffer[start + 4] >> 1)
      );
    }
  }, {
    key: "valid",
    value: function valid() {
      var start_code_prefix = this.start_code_prefix;
      return start_code_prefix[0] === 0x00 && start_code_prefix[1] === 0x00 && start_code_prefix[2] === 0x01;
    }
  }]);

  return Pes;
}(_util_dv__WEBPACK_IMPORTED_MODULE_5__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Pes);

/***/ }),
/* 200 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(154);
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(147);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(123);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(124);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _structs_patSection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(201);
/* harmony import */ var _structs_pmtSection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(202);
/* harmony import */ var _structs_sdtSection__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(203);
/* harmony import */ var _enum_m2t_pid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(204);





/**
 * @file: psi.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * Packetized Elementary Stream.
 */



 // const MAX_PIDS_PER_PROGRAM = 64;

var PSI =
/*#__PURE__*/
function () {
  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(PSI, [{
    key: "currentProgramPID",

    /**
     * program PID
     * @returns {number}
     */
    get: function get() {
      var _pmtIds = [];

      for (var i = 0; i < this.pat_table.length; i++) {
        _pmtIds.push(this.pat_table[i].pid);
      }

      return _pmtIds.length > 0 ? _pmtIds[0] : -1;
    } // get pmtTable() {
    //     return this.pat_table;
    // }

  }]);

  function PSI(ctx) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, PSI);

    /**
     * @private
     */
    this.context = ctx;
    /**
     * Specify by SDT Packet
     * @type {Array}
     * @private
     */

    this.metadata = {};
    /**
     * Specify by PMT Packet
     * @type {Array}
     * @private
     */

    this.pat_table = [];
    /**
     * Specify by PES stream
     * @type {Array}
     * @private
     */

    this.pes_streams = [];
  }
  /**
   * 目前对于PSI的信息，持久化保留在内存中
   * 对于同一个片子，HLS规范会规定只能有一个 PMT/PAT 表
   * 所以一部片子的PSI信息应该是保持不变的，换片子后PSI信息的销毁通过 mux 重新实例化产生新的信息，不需要调用reset
   * 有些 TS 文件在HLS切片器切割的时候，没有带上PAT/PMT等表，需要相邻 TS 给定的表信息
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(PSI, [{
    key: "reset",
    value: function reset() {
      this.metadata = {};
      this.pat_table.splice(0, this.pat_table.length);
      this.pes_streams.splice(0, this.pes_streams.length);
    }
    /**
     * @param {Packet} packet
     */

  }, {
    key: "parse",
    value: function parse(packet) {
      var self = this; // ISO13818-1: Table 2-3 – PID table

      if (_enum_m2t_pid__WEBPACK_IMPORTED_MODULE_7__["PAT_PID"] === packet.PID) {
        /* PAT PID */
        this._parsePat(packet);
      } else if (_enum_m2t_pid__WEBPACK_IMPORTED_MODULE_7__["CAT_PID"] === packet.PID) {
        /* CAT PID */
      } else if (_enum_m2t_pid__WEBPACK_IMPORTED_MODULE_7__["TSDT_PID"] === packet.PID) {
        /* Transport Stream Description Table */
      } else if (0x0003 <= packet.PID && packet.PID <= 0x000f) {
        /* Reserved */
      } else if (_enum_m2t_pid__WEBPACK_IMPORTED_MODULE_7__["SDT_PID"] === packet.PID) {
        /* Service Description Table */
        this._parseSdt(packet);
      } else if (packet.PID === self.currentProgramPID) {
        /* PMT PID */
        this._parsePmt(packet);
      } // else if (this.findTrack(packet.PID)) {
      // 	/* Reserved */
      // } else {
      // 	logger.warn(`psi unknown packet PID ${packet.PID}`);
      // }

    } // findPmtProgram(PID) {
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
     * @param {number} PID
     * @returns {?Object}
     */

  }, {
    key: "findTrack",
    value: function findTrack(PID) {
      var program = null;
      var streams = this.pes_streams;

      for (var i = 0; i < streams.length; i++) {
        if (streams[i].id === PID) {
          program = streams[i];
          break;
        }
      }

      return program;
    }
    /**
     * Parse PAT Packet
     * @param {Packet} pack
     * @return {PATSection}
     * @private
     */

  }, {
    key: "_parsePat",
    value: function _parsePat(pack) {
      var data;

      if (pack.payload_unit_start_indicator) {
        // psi has pointer_field
        var pointer = pack.payload[0];
        data = pack.payload.subarray(pointer + 1);
      } else {
        data = pack.payload;
      }

      var pat = new _structs_patSection__WEBPACK_IMPORTED_MODULE_4__["default"](data); // https://tools.ietf.org/html/rfc8216#section-3.2
      // Transport Stream Segments MUST contain a single MPEG-2 Program;

      for (var i = 0; i < pat.pmtTable.length; i++) {
        this._add_pid_to_pmt(pat.pmtTable[i].programNum, pat.pmtTable[i].program_map_PID);
      }

      return pat;
    }
    /**
     * Associates Program Number and Program Map Table(PMT) PID
     * @param {number} programId
     * @param {number} pid
     * @private
     */

  }, {
    key: "_add_pid_to_pmt",
    value: function _add_pid_to_pmt(programId, pid) {
      var table = this.pat_table;

      function get_pmt(id) {
        for (var i = 0, item; i < table.length; i++) {
          item = table[i];

          if (item.id === id) {
            return {
              idx: i,
              item: item
            };
          }
        }

        return null;
      }

      var p = get_pmt(programId);

      if (!p) {
        table.push({
          id: programId,
          pid: pid
        });
      }
    }
    /**
     * Parse PMT Packet
     * @param {Packet} pack
     * @return {PMTSection}
     * @private
     */

  }, {
    key: "_parsePmt",
    value: function _parsePmt(pack) {
      var data;

      if (pack.payload_unit_start_indicator) {
        // psi has pointer_field
        var pointer = pack.payload[0];
        data = pack.payload.subarray(pointer + 1);
      } else {
        data = pack.payload;
      }

      var pmt = new _structs_pmtSection__WEBPACK_IMPORTED_MODULE_5__["default"](data);

      for (var i = 0; i < pmt.pes_table.length; i++) {
        this._add_pes_stream(pmt.pes_table[i], pmt);
      }

      return pmt;
    }
    /**
     * @param stream
     * @param pmt
     * @private
     */

  }, {
    key: "_add_pes_stream",
    value: function _add_pes_stream(stream, pmt) {
      var streams = this.pes_streams;

      function get_program(id) {
        for (var i = 0, item; i < streams.length; i++) {
          item = streams[i];

          if (item.id === id) {
            return {
              idx: i,
              item: item
            };
          }
        }

        return null;
      }

      var p = get_program(stream.id);

      if (!p) {
        streams.push({
          id: stream.PID,
          stream_type: stream.streamType,
          pcr_pid: pmt.PCR_PID,
          duration: 0,
          sps: [],
          pps: [],
          pixelRatio: 1,
          timescale: 90000,
          // (in TS timescale = 90kHz)
          width: 0,
          height: 0
        });
      }
    }
    /**
     * Parse SDT Packet
     * @param {Packet} pack
     * @returns {SDTSection}
     * @private
     */

  }, {
    key: "_parseSdt",
    value: function _parseSdt(pack) {
      var data;

      if (pack.payload_unit_start_indicator) {
        // psi has pointer_field
        var pointer = pack.payload[0];
        data = pack.payload.subarray(pointer + 1);
      } else {
        data = pack.payload;
      }

      var sdt = new _structs_sdtSection__WEBPACK_IMPORTED_MODULE_6__["default"](data);

      if (sdt.service_table.length > 0) {
        this.metadata.service_name = sdt.service_table[0].name;
        this.metadata.service_provider = sdt.service_table[0].provider_name;
      }

      return sdt;
    }
  }]);

  return PSI;
}();

/* harmony default export */ __webpack_exports__["default"] = (PSI);

/***/ }),
/* 201 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(123);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(124);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(125);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(128);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(129);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _util_dv__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(188);
/* harmony import */ var _util_logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(131);






/**
 * @file: patSection.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * Structure for pat.
 */


/**
 * @extends DataViewReader
 */

var PATSection =
/*#__PURE__*/
function (_DataViewReader) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(PATSection, _DataViewReader);

  function PATSection(buffer) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, PATSection);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(PATSection).call(this)); // program_association_section 0x00

    _this.table_id = buffer[0];
    _this.section_syntax_indicator = buffer[1] >> 7; // this.zero = (buffer[1] >> 6) & 0x1;
    // this.reserved_0 = (buffer[1] >> 4) & 0x3;
    // the number of bytes of the section
    // starting immediately following the section_length field, and including the CRC.

    _this.section_length = (buffer[1] & 0x0f) << 8 | buffer[2];
    _this.transport_stream_id = _this.readUint16(buffer, 3); // this.reserved_1 = buffer[5] >> 6;

    _this.version_number = buffer[5] >> 1 & 0x1f;
    _this.current_next_indicator = buffer[5] && 0x01; // The section_number of the first section in the Program Association Table shall be 0x00.
    // It shall be incremented by 1 with each additional section in the PAT.

    _this.section_number = buffer[6]; // The number of the last section (that is, the section with the highest section_number) of the complete PAT.

    _this.last_section_number = buffer[7];
    _this.network_PID = 0x00;
    var n = 0,
        program_num,
        reserved_3;
    var len = _this.section_length - 4 - 5; // 4: crc32, 5: bytes followed by section_length

    _this.pmtTable = [];
    /* loop by 4 bytes, during  */

    for (; n < len; n += 4) {
      program_num = _this.readUint16(buffer, 8 + n);
      reserved_3 = buffer[10 + n] >> 5;

      if (program_num == 0x00) {
        _this.network_PID = (buffer[10 + n] & 0x1f) << 8 | buffer[11 + n]; // 记录该TS流的网络PID
        // TS_network_Pid = this.network_PID;

        _util_logger__WEBPACK_IMPORTED_MODULE_6__["default"].log('packet->network_PID %0x /n/n', _this.network_PID);
      } else {
        _this.pmtTable.push({
          programNum: program_num,
          program_map_PID: (buffer[10 + n] & 0x1f) << 8 | buffer[11 + n]
        }); // TS_PAT_Program
        // PAT_program;
        // PAT_program.program_map_PID = (buffer[10 + n] & 0x1F) << 8 | buffer[11 + n];
        // PAT_program.program_number = program_num;
        // this.program.push_back(PAT_program);
        // TS_program.push_back(PAT_program);//向全局PAT节目数组中添加PAT节目信息

      }
    }

    var crcLength = _this.section_length + 3;
    _this.CRC_32 = (buffer[crcLength - 4] & 0x000000ff) << 24 | (buffer[crcLength - 3] & 0x000000ff) << 16 | (buffer[crcLength - 2] & 0x000000ff) << 8 | buffer[crcLength - 1] & 0x000000ff;
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(PATSection, [{
    key: "valid",
    value: function valid() {
      var start_code_prefix = this.start_code_prefix;
      return start_code_prefix[0] === 0x00 && start_code_prefix[1] === 0x00 && start_code_prefix[2] === 0x01;
    }
  }]);

  return PATSection;
}(_util_dv__WEBPACK_IMPORTED_MODULE_5__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (PATSection);

/***/ }),
/* 202 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(132);
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(123);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(124);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(125);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(128);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(129);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _util_dv__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(188);
/* harmony import */ var _util_logger__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(131);







/**
 * @file: pmtSection.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * Structure for pat.
 */


/**
 * @extends DataViewReader
 */

var PMTSection =
/*#__PURE__*/
function (_DataViewReader) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(PMTSection, _DataViewReader);

  function PMTSection(buffer) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, PMTSection);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(PMTSection).call(this)); // program_map_section  0x02

    _this.table_id = buffer[0];
    _this.section_syntax_indicator = buffer[1] >> 7; // this.zero = (buffer[1] >> 6) & 0x1;
    // this.reserved_0 = (buffer[1] >> 4) & 0x3;
    // the number of bytes of the section
    // starting immediately following the section_length field, and including the CRC.

    _this.section_length = (buffer[1] & 0x0f) << 8 | buffer[2]; // It specifies the program to which the program_map_PID is applicable.

    _this.program_number = _this.readUint16(buffer, 3); // this.reserved_1 = buffer[5] >> 6;

    _this.version_number = buffer[5] >> 1 & 0x1f;
    _this.current_next_indicator = buffer[5] && 0x01; // The section_number of the first section in the Program Association Table shall be 0x00.
    // It shall be incremented by 1 with each additional section in the PAT.

    _this.section_number = buffer[6]; // The number of the last section (that is, the section with the highest section_number) of the complete PAT.

    _this.last_section_number = buffer[7]; // contain the PCR fields valid for the program specified by program_number.

    _this.PCR_PID = (buffer[8] & 0x1f) << 8 | buffer[9]; // this.reserved_2 = buffer[10] >> 4;
    // The number of bytes of the descriptors immediately following the program_info_length field.

    _this.program_info_length = (buffer[10] & 0x0f) << 8 | buffer[11];

    if (_this.program_info_length < 0) {
      return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(_this);
    } else if (_this.program_info_length > 2) {
      var i = 0;

      while (i < _this.program_info_length) {
        // let descriptor_tag = buffer[12 + i];
        var descriptor_length = buffer[13 + i]; // 	logger.log('descriptor_tag', descriptor_tag, descriptor_length);

        i += descriptor_length;
      }
    }

    var es_section_pos = 12 + _this.program_info_length;
    var es_section_len = _this.section_length - _this.program_info_length - 9 - 4; // 9: bytes followed by section_length, 4: crc32

    var es_section_end = es_section_pos + es_section_len;

    if (es_section_pos >= es_section_end) {
      return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(_this, _util_logger__WEBPACK_IMPORTED_MODULE_7__["default"].warn("es_section_pos < es_section_end ".concat(es_section_pos, ", ").concat(es_section_end)));
    }

    _this.pes_table = [];
    var j = 0;

    while (j < es_section_len) {
      var stream_type = buffer[es_section_pos + j];
      var elementary_PID = _this.readUint16(buffer, es_section_pos + j + 1) & 0x1fff;
      var ES_info_length = _this.readUint16(buffer, es_section_pos + j + 3) & 0x0fff;

      _this.pes_table.push({
        streamType: stream_type,
        PID: elementary_PID
      });

      if (ES_info_length > 2) {
        var k = 0;
        var es_pos = es_section_pos + j + 5;

        while (k < ES_info_length) {
          // let descriptor_tag = buffer[es_pos + k];
          var _descriptor_length = buffer[es_pos + k]; // if (descriptor_tag === )

          k += _descriptor_length;
        }
      }

      j += ES_info_length + 5;
    }

    var crcLength = _this.section_length + 3;
    _this.CRC_32 = (buffer[crcLength - 4] & 0x000000ff) << 24 | (buffer[crcLength - 3] & 0x000000ff) << 16 | (buffer[crcLength - 2] & 0x000000ff) << 8 | buffer[crcLength - 1] & 0x000000ff;
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(PMTSection, [{
    key: "parse",
    value: function parse() {// let data = this.uint8;
    }
  }, {
    key: "valid",
    value: function valid() {
      var start_code_prefix = this.start_code_prefix;
      return start_code_prefix[0] === 0x00 && start_code_prefix[1] === 0x00 && start_code_prefix[2] === 0x01;
    }
  }]);

  return PMTSection;
}(_util_dv__WEBPACK_IMPORTED_MODULE_6__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (PMTSection);

/***/ }),
/* 203 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(137);
/* harmony import */ var core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(123);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(125);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(128);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(129);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _util_dv__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(188);
/* harmony import */ var _util_logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(131);






/**
 * @file: sdtSection.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * Structure for sdt.
 */


/**
 * @extends DataViewReader
 */

var SDTSection =
/*#__PURE__*/
function (_DataViewReader) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(SDTSection, _DataViewReader);

  function SDTSection(buffer) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, SDTSection);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(SDTSection).call(this)); // program_map_section  0x02

    _this.table_id = buffer[0];
    _this.section_syntax_indicator = buffer[1] >> 7; // this.reserved_0 = (buffer[1] >> 4) & 0x3;
    // the number of bytes of the section
    // starting immediately following the section_length field, and including the CRC.

    _this.section_length = (buffer[1] & 0x0f) << 8 | buffer[2]; // This is a 16-bit field which serves as a label for identification of the TS,
    // about which the SDT informs, from any other multiplex within the delivery system

    _this.transport_stream_id = _this.readUint16(buffer, 3); // this.reserved_1 = buffer[5] >> 6;

    _this.version_number = buffer[5] >> 1 & 0x1f;
    _this.current_next_indicator = buffer[5] & 0x01; // The section_number of the first section in the sub_table shall be "0x00".
    // The section_number shall be incremented by 1 with each additional section
    // with the same table_id, transport_stream_id, and original_network_id.

    _this.section_number = buffer[6]; // This 8-bit field specifies the number of the last section
    // (that is, the section with the highest section_number) of the sub_table of which this section is part

    _this.last_section_number = buffer[7]; // This field gives the label identifying the network_id of the originating delivery system.

    _this.original_network_id = _this.readUint16(buffer, 8); // this.reserved_2 = buffer[10];
    // section_length - (following the section_length field length) - crc32Length

    var sv_len = _this.section_length - 8 - 4; // 8: bytes followed by section_length, 4: crc32

    _this.service_table = [];
    var i = 0;

    while (i < sv_len) {
      var j = 0,
          service = {};
      service.service_id = _this.readUint16(buffer, 11);
      service.EIT_schedule_flag = buffer[13] & 0x02;
      service.EIT_present_following_flag = buffer[13] & 0x01;
      service.running_status = buffer[14] >> 5;
      service.free_CA_mode = buffer[14] >> 4 & 0x01;
      service.descriptors_loop_length = (buffer[14] & 0x0f) << 8 | buffer[15];

      while (j < service.descriptors_loop_length) {
        var start = 16 + j;
        var descriptor_tag = buffer[start];
        var descriptor_length = buffer[start + 1];

        switch (descriptor_tag) {
          case 0x48:
            // service_descriptor
            {
              var service_type = buffer[start + 2];
              var service_provider_name = [];
              var service_provider_name_length = buffer[start + 3];
              var k = 0,
                  l = 0,
                  nextPos = start + 4;

              for (k = 0; k < service_provider_name_length; k++) {
                service_provider_name.push(String.fromCharCode(buffer[nextPos]));
                nextPos += 1;
              }

              service.provider_name = service_provider_name.join('');
              var service_name = [];
              var service_name_length = buffer[nextPos];
              nextPos += 1;

              for (l = 0; l < service_name_length; l++) {
                service_name.push(String.fromCharCode(buffer[nextPos]));
                nextPos += 1;
              }

              service.name = service_name.join('');
            }
            break;

          default:
            _util_logger__WEBPACK_IMPORTED_MODULE_6__["default"].warn("sdt section unhandled descriptor_tag ".concat(descriptor_tag));
        }

        j += 2 + descriptor_length;
      }

      _this.service_table.push(service);

      i += 5 + service.descriptors_loop_length;
    }

    return _this;
  }

  return SDTSection;
}(_util_dv__WEBPACK_IMPORTED_MODULE_5__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (SDTSection);

/***/ }),
/* 204 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PAT_PID", function() { return PAT_PID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CAT_PID", function() { return CAT_PID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TSDT_PID", function() { return TSDT_PID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SDT_PID", function() { return SDT_PID; });
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
var PAT_PID = 0x0000;
var CAT_PID = 0x0001;
var TSDT_PID = 0x0002;
/* reserved 0x0003 to 0x000F */

var SDT_PID = 0x0011;

/***/ }),
/* 205 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(123);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(124);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(125);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(128);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(129);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _util_dv__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(188);






/**
 * @file: packet.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * packet structure.
 */

var SYNC_BYTE = 0x47; // The sync_byte is a fixed 8-bit field whose value is '0100 0111' (0x47).

/**
 * @extends DataViewReader
 */

var Packet =
/*#__PURE__*/
function (_DataViewReader) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(Packet, _DataViewReader);

  /**
   * @param {Uint8Array} buffer
   */
  function Packet(buffer) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Packet);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Packet).call(this));
    _this.sync_byte = buffer[0];
    _this.transport_error_indicator = buffer[1] >> 7; // Indicating transport stream packets carry PES packets or PSI data
    // PES: 1 -> commence with the first byte of a PES packet,  0 -> no PES packet shall start in this packet.
    // PSI: 1 -> carries the first byte of a PSI section, 0 -> no pointer_field in the payload.

    _this.payload_unit_start_indicator = buffer[1] >> 6 & 1;
    _this.transport_priority = buffer[1] >>> 5 & 1; // The PID(Packet ID) is a 13-bit field, indicating the type of the data stored in the packet payload.
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

    _this.PID = _this.readUint16(buffer, 1) & 0x1fff; // transport_scrambling_control

    _this.tsc = buffer[3] >> 6; // adaptation_field_control
    // Value  Description
    // 00     Reserved for future use by ISO/IEC
    // 01     No adaptation_field, payload only
    // 10     Adaptation_field only, no payload
    // 11     Adaptation_field followed by payload

    _this.afc = buffer[3] >> 4 & 3; // '1' indicates that the discontinuity state is true for the current Transport Stream packet.
    // continuity_counter

    _this.continuity_counter = buffer[3] & 0xf; // self defines.

    _this.has_payload = _this.afc & 1;
    _this.has_adaptation = _this.afc & 2;
    _this.is_discontinuity = _this.has_adaptation && buffer[4] != 0
    /* with length > 0 */
    && buffer[5] & 0x80;
    /* and discontinuity indicated */

    if (_this.has_payload) {
      if (_this.has_adaptation) {
        var adaptation_field_length = buffer[4];
        _this.payload = buffer.subarray(5 + adaptation_field_length);
      } else {
        _this.payload = buffer.subarray(4);
      }
    }

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Packet, [{
    key: "valid",
    value: function valid() {
      var val = this.sync_byte === SYNC_BYTE && this.has_payload;
      return val;
    }
  }]);

  return Packet;
}(_util_dv__WEBPACK_IMPORTED_MODULE_5__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Packet);

/***/ }),
/* 206 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @file: mux-error-code.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * @readonly
 * @enum {Number}
 * @export
 */
var counter = 0;
/* harmony default export */ __webpack_exports__["default"] = ({
  WORKER_EXCEPTION: counter++,
  WORKER_MSG_EXCEPTION: counter++,
  TS_SYNC_BYTE: counter++
});

/***/ }),
/* 207 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(123);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(124);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(125);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(128);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(129);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _util_stream__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(151);
/* harmony import */ var _util_logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(131);
/* harmony import */ var _mp4_inspector__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(208);






/**
 * @file: demux.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */



/**
 * mp4.
 */

var Demux =
/*#__PURE__*/
function (_stream) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(Demux, _stream);

  function Demux() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Demux);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Demux).call(this));
  }
  /**
   * This is end pipeline stream
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Demux, [{
    key: "push",

    /**
     * @param {Uint8Array} buffer
     */
    value: function push(buffer) {
      _util_logger__WEBPACK_IMPORTED_MODULE_6__["default"].log("mp4 demux received ".concat(buffer.byteLength, " bytes"));
      this.emit('data', _mp4_inspector__WEBPACK_IMPORTED_MODULE_7__["default"].mp4toJSON(buffer));
    }
  }, {
    key: "endStream",
    get: function get() {
      return this;
    }
  }]);

  return Demux;
}(_util_stream__WEBPACK_IMPORTED_MODULE_5__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Demux);

/***/ }),
/* 208 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_buffer_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(65);
/* harmony import */ var core_js_modules_es_array_buffer_slice__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_buffer_slice__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_data_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(191);
/* harmony import */ var core_js_modules_es_data_view__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_data_view__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(156);
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(147);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(75);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_regexp_flags__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(209);
/* harmony import */ var core_js_modules_es_regexp_flags__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_flags__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_typed_array_uint8_array__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(79);
/* harmony import */ var core_js_modules_es_typed_array_uint8_array__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_uint8_array__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_typed_array_uint32_array__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(210);
/* harmony import */ var core_js_modules_es_typed_array_uint32_array__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_uint32_array__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_typed_array_copy_within__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(95);
/* harmony import */ var core_js_modules_es_typed_array_copy_within__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_copy_within__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_typed_array_every__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(97);
/* harmony import */ var core_js_modules_es_typed_array_every__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_every__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_typed_array_fill__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(98);
/* harmony import */ var core_js_modules_es_typed_array_fill__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_fill__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_typed_array_filter__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(99);
/* harmony import */ var core_js_modules_es_typed_array_filter__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_filter__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_typed_array_find__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(100);
/* harmony import */ var core_js_modules_es_typed_array_find__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_find__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_typed_array_find_index__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(101);
/* harmony import */ var core_js_modules_es_typed_array_find_index__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_find_index__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_typed_array_for_each__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(102);
/* harmony import */ var core_js_modules_es_typed_array_for_each__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_for_each__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_typed_array_includes__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(103);
/* harmony import */ var core_js_modules_es_typed_array_includes__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_includes__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_typed_array_index_of__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(104);
/* harmony import */ var core_js_modules_es_typed_array_index_of__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_index_of__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_typed_array_iterator__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(105);
/* harmony import */ var core_js_modules_es_typed_array_iterator__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_iterator__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_typed_array_join__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(106);
/* harmony import */ var core_js_modules_es_typed_array_join__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_join__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_es_typed_array_last_index_of__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(107);
/* harmony import */ var core_js_modules_es_typed_array_last_index_of__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_last_index_of__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_es_typed_array_map__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(111);
/* harmony import */ var core_js_modules_es_typed_array_map__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_map__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_es_typed_array_reduce__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(112);
/* harmony import */ var core_js_modules_es_typed_array_reduce__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_reduce__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_es_typed_array_reduce_right__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(114);
/* harmony import */ var core_js_modules_es_typed_array_reduce_right__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_reduce_right__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var core_js_modules_es_typed_array_reverse__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(115);
/* harmony import */ var core_js_modules_es_typed_array_reverse__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_reverse__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var core_js_modules_es_typed_array_set__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(116);
/* harmony import */ var core_js_modules_es_typed_array_set__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_set__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var core_js_modules_es_typed_array_slice__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(117);
/* harmony import */ var core_js_modules_es_typed_array_slice__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_slice__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var core_js_modules_es_typed_array_some__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(118);
/* harmony import */ var core_js_modules_es_typed_array_some__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_some__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var core_js_modules_es_typed_array_sort__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(119);
/* harmony import */ var core_js_modules_es_typed_array_sort__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_sort__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var core_js_modules_es_typed_array_subarray__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(120);
/* harmony import */ var core_js_modules_es_typed_array_subarray__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_subarray__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var core_js_modules_es_typed_array_to_locale_string__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(121);
/* harmony import */ var core_js_modules_es_typed_array_to_locale_string__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_to_locale_string__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var core_js_modules_es_typed_array_to_string__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(122);
/* harmony import */ var core_js_modules_es_typed_array_to_string__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_to_string__WEBPACK_IMPORTED_MODULE_31__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(211);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_32__);


































/**
 * @file: mp4-inspector.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/* eslint-disable */
var
/**
* Returns the string representation of an ASCII encoded four byte buffer.
* @param buffer {Uint8Array} a four-byte buffer to translate
* @return {string} the corresponding string
*/
parseType = function parseType(buffer) {
  var result = '';
  result += String.fromCharCode(buffer[0]);
  result += String.fromCharCode(buffer[1]);
  result += String.fromCharCode(buffer[2]);
  result += String.fromCharCode(buffer[3]);
  return result;
},
    parseMp4Date = function parseMp4Date(seconds) {
  return new Date(seconds * 1000 - 2082844800000);
},
    parseSampleFlags = function parseSampleFlags(flags) {
  return {
    isLeading: (flags[0] & 0x0c) >>> 2,
    dependsOn: flags[0] & 0x03,
    isDependedOn: (flags[1] & 0xc0) >>> 6,
    hasRedundancy: (flags[1] & 0x30) >>> 4,
    paddingValue: (flags[1] & 0x0e) >>> 1,
    isNonSyncSample: flags[1] & 0x01,
    degradationPriority: flags[2] << 8 | flags[3]
  };
},
    nalParse = function nalParse(avcStream) {
  var avcView = new DataView(avcStream.buffer, avcStream.byteOffset, avcStream.byteLength),
      result = [],
      i,
      length;

  for (i = 0; i < avcStream.length; i += length) {
    length = avcView.getUint32(i);
    i += 4;

    switch (avcStream[i] & 0x1f) {
      case 0x01:
        result.push('NDR');
        break;

      case 0x05:
        result.push('IDR');
        break;

      case 0x06:
        result.push('SEI');
        break;

      case 0x07:
        result.push('SPS');
        break;

      case 0x08:
        result.push('PPS');
        break;

      case 0x09:
        result.push('AUD');
        break;

      default:
        result.push(avcStream[i] & 0x1f);
        break;
    }
  }

  return result;
},
    // registry of handlers for individual mp4 box types
parse = {
  // codingname, not a first-class box type. stsd entries share the
  // same format as real boxes so the parsing infrastructure can be
  // shared
  avc1: function avc1(data) {
    var view = new DataView(data.buffer, data.byteOffset, data.byteLength);
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
  avcC: function avcC(data) {
    var view = new DataView(data.buffer, data.byteOffset, data.byteLength),
        result = {
      configurationVersion: data[0],
      avcProfileIndication: data[1],
      profileCompatibility: data[2],
      avcLevelIndication: data[3],
      lengthSizeMinusOne: data[4] & 0x03,
      sps: [],
      pps: []
    },
        numOfSequenceParameterSets = data[5] & 0x1f,
        numOfPictureParameterSets,
        nalSize,
        offset,
        i; // iterate past any SPSs

    offset = 6;

    for (i = 0; i < numOfSequenceParameterSets; i++) {
      nalSize = view.getUint16(offset);
      offset += 2;
      result.sps.push(new Uint8Array(data.subarray(offset, offset + nalSize)));
      offset += nalSize;
    } // iterate past any PPSs


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
  btrt: function btrt(data) {
    var view = new DataView(data.buffer, data.byteOffset, data.byteLength);
    return {
      bufferSizeDB: view.getUint32(0),
      maxBitrate: view.getUint32(4),
      avgBitrate: view.getUint32(8)
    };
  },
  esds: function esds(data) {
    var view = new DataView(data.buffer, data.byteOffset, data.byteLength);
    return {
      version: data[0],
      flags: new Uint8Array(data.subarray(1, 4)),
      esId: data[6] << 8 | data[7],
      streamPriority: data[8] & 0x1f,
      decoderConfig: {
        objectProfileIndication: data[11],
        streamType: data[12] >>> 2 & 0x3f,
        bufferSize: data[13] << 16 | data[14] << 8 | data[15],
        maxBitrate: data[16] << 24 | data[17] << 16 | data[18] << 8 | data[19],
        avgBitrate: data[20] << 24 | data[21] << 16 | data[22] << 8 | data[23],
        decoderConfigDescriptor: {
          tag: data[24],
          length: data[25],
          // audioObjectType: (data[26] >>> 3) & 0x1f,
          // samplingFrequencyIndex: ((data[26] & 0x07) << 1) |
          //   ((data[27] >>> 7) & 0x01),
          // channelConfiguration: (data[27] >>> 3) & 0x0f,
          // FIXME
          audioObjectType: data[35] >>> 3 & 0x1f,
          samplingFrequencyIndex: (data[35] & 0x07) << 8 + (data[36] & 0x80) >> 7,
          channelConfiguration: (data[36] & 0x78) >> 3
        }
      }
    };
  },
  ftyp: function ftyp(data) {
    var view = new DataView(data.buffer, data.byteOffset, data.byteLength),
        result = {
      majorBrand: parseType(data.subarray(0, 4)),
      minorVersion: view.getUint32(4),
      compatibleBrands: []
    },
        i = 8;

    while (i < data.byteLength) {
      result.compatibleBrands.push(parseType(data.subarray(i, i + 4)));
      i += 4;
    }

    return result;
  },
  dinf: function dinf(data) {
    return {
      boxes: mp4toJSON(data)
    };
  },
  dref: function dref(data) {
    return {
      version: data[0],
      flags: new Uint8Array(data.subarray(1, 4)),
      dataReferences: mp4toJSON(data.subarray(8))
    };
  },
  hdlr: function hdlr(data) {
    var view = new DataView(data.buffer, data.byteOffset, data.byteLength),
        result = {
      version: view.getUint8(0),
      flags: new Uint8Array(data.subarray(1, 4)),
      handlerType: parseType(data.subarray(8, 12)),
      name: ''
    },
        i = 8; // parse out the name field

    for (i = 24; i < data.byteLength; i++) {
      if (data[i] === 0x00) {
        // the name field is null-terminated
        i++;
        break;
      }

      result.name += String.fromCharCode(data[i]);
    } // decode UTF-8 to javascript's internal representation
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
  mdhd: function mdhd(data) {
    var view = new DataView(data.buffer, data.byteOffset, data.byteLength),
        i = 4,
        language,
        result = {
      version: view.getUint8(0),
      flags: new Uint8Array(data.subarray(1, 4)),
      language: ''
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
    } else {
      result.creationTime = parseMp4Date(view.getUint32(i));
      i += 4;
      result.modificationTime = parseMp4Date(view.getUint32(i));
      i += 4;
      result.timescale = view.getUint32(i);
      i += 4;
      result.duration = view.getUint32(i);
    }

    i += 4; // language is stored as an ISO-639-2/T code in an array of three 5-bit fields
    // each field is the packed difference between its ASCII value and 0x60

    language = view.getUint16(i);
    result.language += String.fromCharCode((language >> 10) + 0x60);
    result.language += String.fromCharCode(((language & 0x03c0) >> 5) + 0x60);
    result.language += String.fromCharCode((language & 0x1f) + 0x60);
    return result;
  },
  mdia: function mdia(data) {
    return {
      boxes: mp4toJSON(data)
    };
  },
  mfhd: function mfhd(data) {
    return {
      version: data[0],
      flags: new Uint8Array(data.subarray(1, 4)),
      sequenceNumber: data[4] << 24 | data[5] << 16 | data[6] << 8 | data[7]
    };
  },
  minf: function minf(data) {
    return {
      boxes: mp4toJSON(data)
    };
  },
  // codingname, not a first-class box type. stsd entries share the
  // same format as real boxes so the parsing infrastructure can be
  // shared
  mp4a: function mp4a(data) {
    var view = new DataView(data.buffer, data.byteOffset, data.byteLength),
        result = {
      // 6 bytes reserved
      dataReferenceIndex: view.getUint16(6),
      // 4 + 4 bytes reserved
      channelcount: view.getUint16(16),
      samplesize: view.getUint16(18),
      // 2 bytes pre_defined
      // 2 bytes reserved
      samplerate: view.getUint16(24) + view.getUint16(26) / 65536
    }; // if there are more bytes to process, assume this is an ISO/IEC
    // 14496-14 MP4AudioSampleEntry and parse the ESDBox

    if (data.byteLength > 28) {
      result.streamDescriptor = mp4toJSON(data.subarray(28))[0];
    }

    return result;
  },
  moof: function moof(data) {
    return {
      boxes: mp4toJSON(data)
    };
  },
  moov: function moov(data) {
    return {
      boxes: mp4toJSON(data)
    };
  },
  mvex: function mvex(data) {
    return {
      boxes: mp4toJSON(data)
    };
  },
  mvhd: function mvhd(data) {
    var view = new DataView(data.buffer, data.byteOffset, data.byteLength),
        i = 4,
        result = {
      version: view.getUint8(0),
      flags: new Uint8Array(data.subarray(1, 4))
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
    } else {
      result.creationTime = parseMp4Date(view.getUint32(i));
      i += 4;
      result.modificationTime = parseMp4Date(view.getUint32(i));
      i += 4;
      result.timescale = view.getUint32(i);
      i += 4;
      result.duration = view.getUint32(i);
    }

    i += 4; // convert fixed-point, base 16 back to a number

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
  pdin: function pdin(data) {
    var view = new DataView(data.buffer, data.byteOffset, data.byteLength);
    return {
      version: view.getUint8(0),
      flags: new Uint8Array(data.subarray(1, 4)),
      rate: view.getUint32(4),
      initialDelay: view.getUint32(8)
    };
  },
  sdtp: function sdtp(data) {
    var result = {
      version: data[0],
      flags: new Uint8Array(data.subarray(1, 4)),
      samples: []
    },
        i;

    for (i = 4; i < data.byteLength; i++) {
      result.samples.push({
        dependsOn: (data[i] & 0x30) >> 4,
        isDependedOn: (data[i] & 0x0c) >> 2,
        hasRedundancy: data[i] & 0x03
      });
    }

    return result;
  },
  sidx: function sidx(data) {
    var view = new DataView(data.buffer, data.byteOffset, data.byteLength),
        result = {
      version: data[0],
      flags: new Uint8Array(data.subarray(1, 4)),
      references: [],
      referenceId: view.getUint32(4),
      timescale: view.getUint32(8),
      earliestPresentationTime: view.getUint32(12),
      firstOffset: view.getUint32(16)
    },
        referenceCount = view.getUint16(22),
        i;

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
  stbl: function stbl(data) {
    return {
      boxes: mp4toJSON(data)
    };
  },
  stco: function stco(data) {
    var view = new DataView(data.buffer, data.byteOffset, data.byteLength);
    var entryCount = view.getUint32(4);
    var result = {
      version: data[0],
      flags: new Uint8Array(data.subarray(1, 4)),
      entryCount: entryCount,
      chunkOffsets: []
    };

    for (var i = 8; entryCount; i += 4, entryCount--) {
      result.chunkOffsets.push(view.getUint32(i));
    }

    return result;
  },
  stsc: function stsc(data) {
    var view = new DataView(data.buffer, data.byteOffset, data.byteLength),
        entryCount = view.getUint32(4),
        result = {
      version: data[0],
      flags: new Uint8Array(data.subarray(1, 4)),
      sampleToChunks: []
    },
        i;

    for (i = 8; entryCount; i += 12, entryCount--) {
      result.sampleToChunks.push({
        firstChunk: view.getUint32(i),
        samplesPerChunk: view.getUint32(i + 4),
        sampleDescriptionIndex: view.getUint32(i + 8)
      });
    }

    return result;
  },
  stsd: function stsd(data) {
    return {
      version: data[0],
      flags: new Uint8Array(data.subarray(1, 4)),
      boxes: mp4toJSON(data.subarray(8))
    };
  },
  stsz: function stsz(data) {
    var view = new DataView(data.buffer, data.byteOffset, data.byteLength),
        result = {
      version: data[0],
      flags: new Uint8Array(data.subarray(1, 4)),
      sampleSize: view.getUint32(4),
      entries: []
    },
        i;

    for (i = 12; i < data.byteLength; i += 4) {
      result.entries.push(view.getUint32(i));
    }

    return result;
  },
  stts: function stts(data) {
    var view = new DataView(data.buffer, data.byteOffset, data.byteLength),
        result = {
      version: data[0],
      flags: new Uint8Array(data.subarray(1, 4)),
      timeToSamples: []
    },
        entryCount = view.getUint32(4),
        i;

    for (i = 8; entryCount; i += 8, entryCount--) {
      result.timeToSamples.push({
        sampleCount: view.getUint32(i),
        sampleDelta: view.getUint32(i + 4)
      });
    }

    return result;
  },
  styp: function styp(data) {
    return parse.ftyp(data);
  },
  tfdt: function tfdt(data) {
    return {
      version: data[0],
      flags: new Uint8Array(data.subarray(1, 4)),
      baseMediaDecodeTime: data[4] << 24 | data[5] << 16 | data[6] << 8 | data[7]
    };
  },
  tfhd: function tfhd(data) {
    var view = new DataView(data.buffer, data.byteOffset, data.byteLength),
        result = {
      version: data[0],
      flags: new Uint8Array(data.subarray(1, 4)),
      trackId: view.getUint32(4)
    },
        baseDataOffsetPresent = result.flags[2] & 0x01,
        sampleDescriptionIndexPresent = result.flags[2] & 0x02,
        defaultSampleDurationPresent = result.flags[2] & 0x08,
        defaultSampleSizePresent = result.flags[2] & 0x10,
        defaultSampleFlagsPresent = result.flags[2] & 0x20,
        i;
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
  tkhd: function tkhd(data) {
    var view = new DataView(data.buffer, data.byteOffset, data.byteLength),
        i = 4,
        result = {
      version: view.getUint8(0),
      flags: new Uint8Array(data.subarray(1, 4))
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
    } else {
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
    i += 2; // convert fixed-point, base 16 back to a number

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
  traf: function traf(data) {
    return {
      boxes: mp4toJSON(data)
    };
  },
  trak: function trak(data) {
    return {
      boxes: mp4toJSON(data)
    };
  },
  trex: function trex(data) {
    var view = new DataView(data.buffer, data.byteOffset, data.byteLength);
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
  trun: function trun(data) {
    var result = {
      version: data[0],
      flags: new Uint8Array(data.subarray(1, 4)),
      samples: []
    },
        view = new DataView(data.buffer, data.byteOffset, data.byteLength),
        dataOffsetPresent = result.flags[2] & 0x01,
        firstSampleFlagsPresent = result.flags[2] & 0x04,
        sampleDurationPresent = result.flags[1] & 0x01,
        sampleSizePresent = result.flags[1] & 0x02,
        sampleFlagsPresent = result.flags[1] & 0x04,
        sampleCompositionTimeOffsetPresent = result.flags[1] & 0x08,
        sampleCount = view.getUint32(4),
        offset = 8,
        sample;

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
  'url ': function url(data) {
    return {
      version: data[0],
      flags: new Uint8Array(data.subarray(1, 4))
    };
  },
  vmhd: function vmhd(data) {
    //let view = new DataView(data.buffer, data.byteOffset, data.byteLength);
    return {
      version: data[0],
      flags: new Uint8Array(data.subarray(1, 4)) //graphicsmode: view.getUint16(4),
      //opcolor: new Uint16Array([view.getUint16(6),
      //                          view.getUint16(8),
      //                          view.getUint16(10)])

    };
  }
};
/**
 * Return a javascript array of box objects parsed from an ISO base
 * media file.
 * @param data {Uint8Array} the binary data of the media to be inspected
 * @return {array} a javascript array of potentially nested box objects
 */


var mp4toJSON = function mp4toJSON(data) {
  var i = 0,
      result = [],
      view = new DataView(data.buffer, data.byteOffset, data.byteLength),
      size,
      type,
      end,
      box;

  while (i < data.byteLength) {
    // parse box data
    size = view.getUint32(i), type = parseType(data.subarray(i + 4, i + 8));
    end = size > 1 ? i + size : data.byteLength; // parse type-specific data

    box = (parse[type] || function (data) {
      return {
        data: data
      };
    })(data.subarray(i + 8, end));

    box.size = size;
    box.type = type; // store this box and move to the next

    result.push(box);
    i = end;
  }

  return result;
};

var MP4Inspect = {
  mp4toJSON: mp4toJSON
};
/* harmony default export */ __webpack_exports__["default"] = (MP4Inspect);

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(17);
var objectDefinePropertyModule = __webpack_require__(18);
var regExpFlags = __webpack_require__(158);
var UNSUPPORTED_Y = __webpack_require__(177).UNSUPPORTED_Y;

// `RegExp.prototype.flags` getter
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
if (DESCRIPTORS && (/./g.flags != 'g' || UNSUPPORTED_Y)) {
  objectDefinePropertyModule.f(RegExp.prototype, 'flags', {
    configurable: true,
    get: regExpFlags
  });
}


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

var createTypedArrayConstructor = __webpack_require__(80);

// `Uint32Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Uint32', function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(10);
var DOMIterables = __webpack_require__(212);
var ArrayIteratorMethods = __webpack_require__(2);
var createNonEnumerableProperty = __webpack_require__(16);
var wellKnownSymbol = __webpack_require__(9);

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}


/***/ }),
/* 212 */
/***/ (function(module, exports) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ })
/******/ ]);
});
//# sourceMappingURL=demuxer.js.map