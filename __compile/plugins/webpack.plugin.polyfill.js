/* eslint-env node */

var stripComments = require('../helpers/stripComments');
var webpack = require('webpack');

const pluginName = 'Webpack2Polyfill';

function comments(str) {
	return '/** ===== ' + str + ' ===== **/';
}

// A JavaScript class.
class Webpack2Polyfill {
	// Define `apply` as its prototype method which is supplied with compiler as its argument
	apply(compiler) {
		// Specify the event hook to attach to
		compiler.hooks.compilation.tap(pluginName, (compilation) => {
			// console.log(compilation.mainTemplate.hooks.bootstrap.tap);
			compilation.mainTemplate.hooks.bootstrap.tap('bootstrap', (prevSource) => {
				var snippets = [];

				/**
				 * 对于不支持基本特性的浏览器直接返回空模块
				 * 1. 不增加polyfill特性，代码会变的更加大。
				 * 2. 模块内容也不会运行，即使运行也没有意义。所以直接返回空模块
				 */
				snippets.push(
					webpack.Template.asString([
						comments('empty module export'),
						stripComments(`
					if (!Object.defineProperty || !Object.defineProperties || !Object.create 
						|| !window.ArrayBuffer || !window.Uint8Array) {
						return {};
					}
				`),
						comments('empty module export end')
					])
				);

				let polyfillSnippet = webpack.Template.asString([
					comments('Webpack2 Polyfill'),
					webpack.Template.indent(snippets),
					comments('Webpack2 Polyfill end')
				]);

				return polyfillSnippet + prevSource;
			});
		});
	}
}

module.exports = Webpack2Polyfill;
