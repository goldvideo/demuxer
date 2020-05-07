import typescript from 'rollup-plugin-typescript2';
import path from 'path';

const getPlugins = function () {
	return [
		typescript({
			tsconfig: path.resolve(__dirname, 'tsconfig.json')
		})
	];
};

let configs = [];
let formatMaps = [
	{
		entry: 'index',
		outputName: 'all'
	},
	{
		entry: 'ts-only',
		outputName: 'ts'
	},
	{
		entry: 'mp4-only',
		outputName: 'mp4'
	}
	// {
	// 	entry: 'ts-only',
	// 	outputName: 'ts'
	// }
];

formatMaps.forEach((item, index) => {
	configs.push({
		input: [`./src/${item.entry}.ts`],
		output: [
			{
				file: `dist/demuxer.${item.outputName}.umd.js`,
				format: 'umd',
				name: 'Demuxer'
			},
			{
				file: `dist/demuxer.${item.outputName}.esm.js`,
				format: 'esm'
			},
			{
				file: `dist/demuxer.${item.outputName}.cjs.js`,
				format: 'cjs'
			}
		],
		plugins: getPlugins()
	});
});

export default configs;
