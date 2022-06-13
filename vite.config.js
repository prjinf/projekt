import { fileURLToPath, URL } from 'url';
import autoImportComponents from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), autoImportComponents(), createHtmlPlugin()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	build: {
		cssCodeSplit: false,
		rollupOptions: {
			output: {
				chunkFileNames: '[hash].js'
			}
		}
	}
});
