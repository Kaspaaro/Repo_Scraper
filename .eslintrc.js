module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	overrides: [],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': 'off',
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-explicit-any': 'error',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-duplicate-imports': 'error',
	},
};
