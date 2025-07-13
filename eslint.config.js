import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
	tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		plugins: { js },
		extends: ['js/recommended'],
		rules: {
			'react/react-in-jsx-scope': 'off',
			'react/no-unescaped-entities': 'off',
			'react/prop-types': 'off',
			'comma-dangle': 0,
			quotes: [
				1,
				'single',
				{
					avoidEscape: true,
				},
			],
			'no-undef': 'off',
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
]);
