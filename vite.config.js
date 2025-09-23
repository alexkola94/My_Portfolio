import { defineConfig } from 'vite';

export default defineConfig({
	root: '.',
	server: {
		port: 5173,
		open: true
	},
	preview: {
		port: 5500
	},
	build: {
		outDir: 'dist',
		emptyOutDir: true
	}
});


