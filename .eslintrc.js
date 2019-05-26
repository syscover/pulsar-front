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
		'brace-style': ['error', 'stroustrup'],
		'indent': ['error', 4],
		'linebreak-style': ['error', 'unix'],
		'quotes': ['error', 'single'],
		'semi': ['error', 'always'],
		'padded-blocks': ['error', 'always']
	}
};
