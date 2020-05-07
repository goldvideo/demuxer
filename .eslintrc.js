// https://eslint.org/docs/user-guide/configuring
module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true
	},
	globals: {},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
		sourceType: 'module' // Allows for the use of imports
	},
	plugins: ['@typescript-eslint'],
	// https://eslint.org/docs/rules/
	rules: {
		// 'no-unused-vars': [
		// 	'warn',
		// 	{
		// 		vars: 'all',
		// 		args: 'after-used',
		// 		ignoreRestSiblings: false,
		// 		caughtErrors: 'none'
		// 	}
		// ],
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 'warn',
		'no-empty': 0,
		'no-prototype-builtins': 1
	}
};
