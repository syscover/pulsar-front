module.exports = {
	'parser': '@typescript-eslint/parser',
	'plugins': ['@typescript-eslint/eslint-plugin'],
	'env': {
		'browser': true,
		'es6': true,
		'node': true
	},
	// 'extends': 'eslint:recommended',
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parserOptions': {
		'ecmaVersion': 2018,
		'sourceType': 'module'
	},
	'rules': {
		'brace-style': ['error', 'allman', { "allowSingleLine": true }],
		'indent': ['error', 4],
		'quotes': ['error', 'single'],
		'semi': ['error', 'always']
	}
};
