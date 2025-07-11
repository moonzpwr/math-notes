import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		plugins: { js },
		extends: [
			'js/recommended',
			'eslint:recommended',
			'plugin:@typescript-eslint/eslint-recommended',
			'plugin:@typescript-eslint/recommended',
		],
		rules: {
			'comma-dangle': 0,
			quotes: [
				1,
				'single',
				{
					avoidEscape: true,
				},
			],
			'no-undef': 2,
			'global-strict': 0,
			'no-extra-semi': 1,
			'no-underscore-dangle': 0,
			'no-console': 1,
			'no-debugger': 'warn',
			'no-trailing-spaces': [
				1,
				{
					skipBlankLines: true,
				},
			],
			'no-unreachable': 1,
			'no-alert': 0,
			'@typescript-eslint/no-non-null-assertion': 0,
			'@typescript-eslint/no-unused-vars': 'warn',
			'no-unused-vars': 'off',
			'no-warning-comments': [1, { terms: ['debug'], location: 'anywhere' }],
		},
	},
	{ files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'], languageOptions: { globals: globals.browser } },
	tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
]);
