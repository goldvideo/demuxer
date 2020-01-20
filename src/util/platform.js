/**
 * @file: platform.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * @description device
 */
const os = {};
const browser = {};

let nav = navigator;
// let platform = nav.platform;
let ua = nav.userAgent.toLowerCase();

var match =
	/(edge)\/([\w.]+)/.exec(ua) ||
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

var platform_match =
	/(ipad)/.exec(ua) ||
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

var result = {};
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

export default {
	browser: browser,
	os: os
};
