/* eslint-env node */
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// const Webpack2Polyfill = require("./plugins/webpack.plugin.polyfill");
const Webpack2Polyfill = require('./plugins/webpack.plugin.polyfill');
const pkgJson = require('../package.json');

const basePath = path.resolve(__dirname, '../');
const distPath = path.resolve(basePath, './dist');

module.exports = {
	entry: path.resolve(basePath, './src/index'), // string | object | array
	// Here the application starts executing
	// and webpack starts bundling

	output: {
		// options related to how webpack emits results

		path: distPath, // string
		// the target directory for all output files
		// must be an absolute path (use the Node.js path module)

		filename: 'demuxer.js', // string
		// the filename template for entry chunks

		library: 'Demuxer', // string,
		// the name of the exported library

		libraryTarget: 'umd' // universal module definition
		// the type of the exported library

		/* Advanced output configuration (click to show) */
	},

	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						comments: true,
						presets: [['@babel/preset-env', {useBuiltIns: 'usage', corejs: 3}]],
						plugins: ['@babel/plugin-transform-runtime']
					}
				}
			}
		]
	},

	// performance: {
	// 	hints: "warning", // enum
	// 	maxAssetSize: 200000, // int (in bytes),
	// 	maxEntrypointSize: 800000, // int (in bytes)
	// 	assetFilter: function(assetFilename) {
	// 		// Function predicate that provides asset filenames
	// 		return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
	// 	}
	// },

	devtool: 'source-map', // enum
	// enhance debugging by adding meta info for the browser devtools
	// source-map most detailed at the expense of build speed.

	context: __dirname, // string (absolute path!)
	// the home directory for webpack
	// the entry and module.rules.loader option
	//   is resolved relative to this directory

	target: 'web', // enum
	// the environment in which the bundle should run
	// changes chunk loading behavior and available modules

	// externals: ["react", /^@angular\//],
	// // Don't follow/bundle these modules, but request them at runtime from the environment

	stats: 'normal',
	// lets you precisely control what bundle information gets displayed

	// devServer: {
	// 	// proxy: { // proxy URLs to backend development server
	// 	// 	'/api': 'http://localhost:3000'
	// 	// },
	// 	contentBase: path.join(__dirname), // boolean | string | array, static file location
	// 	compress: true, // enable gzip compression
	// 	historyApiFallback: true, // true for index.html upon 404, object for multiple paths
	// 	hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
	// 	https: false, // true for self-signed, object for cert authority
	// 	noInfo: true, // only errors & warns on hot reload
	// 	// ...
	// },

	plugins: [
		new CleanWebpackPlugin(['dist'], {
			root: basePath
		}),

		new webpack.DefinePlugin({
			__VERSION__: JSON.stringify(pkgJson.version)
		}),

		new Webpack2Polyfill(),

		new webpack.BannerPlugin('qvs built @' + new Date().toLocaleString())
	]
	// list of additional plugins

	/* Advanced configuration (click to show) */
};
