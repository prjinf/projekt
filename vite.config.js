import { fileURLToPath, URL } from 'url';
import ViteComponents from 'vite-plugin-components';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), ViteComponents()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	}
});
