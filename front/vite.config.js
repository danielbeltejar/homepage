import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react(), ],
    server: {
        port: 3000,
        open: true,
    },
    build: {
        outDir: 'build',
    },
    esbuild: {
        loader: 'tsx',
    },
    // resolve: {
    //     alias: {
    //         '@': path.resolve(__dirname, './src'),
    //     },
    // }
});
