import typescript from 'rollup-plugin-typescript2';
import path from 'path';

const getPlugins = function () {
	return [
		typescript({
			tsconfig: path.resolve(__dirname, 'tsconfig.json')
		})
	];
};

export default [
	{
		input: './src/index.ts',
		output: [
			{
				file: 'dist/demuxer.umd.js',
				format: 'umd',
				name: 'Demuxer'
			},
			{
				file: 'dist/demuxer.esm.js',
				format: 'esm'
			},
			{
				file: 'dist/demuxer.cjs.js',
				format: 'cjs'
			}
		],
		plugins: getPlugins()
	},
	{
		input: './src/ts-only.ts',
		output: [
			{
				file: 'dist/demuxer.ts.umd.js',
				format: 'umd',
				name: 'Demuxer'
			},
			{
				file: 'dist/demuxer.ts.esm.js',
				format: 'esm'
			},
			{
				file: 'dist/demuxer.ts.cjs.js',
				format: 'cjs'
			}
		],
		plugins: getPlugins()
	}
];
