import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	envPrefix: 'MATH_NOTES',
	resolve: {
		alias: {
			'@': '/src',
		},
	},
});
