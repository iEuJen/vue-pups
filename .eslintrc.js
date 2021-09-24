module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'plugin:vue/vue3-essential',
		'@vue/standard',
		'@vue/typescript/recommended'
	],
	parserOptions: {
		ecmaVersion: 2020
	},
	globals: {
		Poups: true
	},
  	rules: {
		'no-console': 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'prefer-const': 'off',
		'indent': 'off',
		'@typescript-eslint/indent': ['error', 'tab'],
		'no-tabs': 'off',
		'no-mixed-spaces-and-tabs': 'off',
		'eol-last': 'off',
		'@typescript-eslint/no-explicit-any': ['off'],
		'no-unused-expressions': 'off',
		'@typescript-eslint/no-this-alias': 'off',
		'prefer-promise-reject-errors': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'no-useless-return': 'off',
		'no-useless-constructor': 'off',
		'@typescript-eslint/no-useless-constructor': ['error'],
		'comma-dangle': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		"@typescript-eslint/ban-types": ["error", {
			"types": {
				"Function": false,
			},
			"extendDefaults": true
		}],
 	}
}
