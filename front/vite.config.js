import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import CompressionPlugin from 'vite-plugin-compression';  // Correct import

export default defineConfig({
    plugins: [
        react(),
        CompressionPlugin({
            algorithm: 'brotliCompress',
        }),
    ],
    server: {
        port: 3000,
        open: true,
    },
    build: {
        outDir: 'build',
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],  // Example: Split libraries
                }
            }
        }
    },
    esbuild: {
        loader: 'tsx',
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts',
    },
    // resolve: {
    //     alias: {
    //         '@': path.resolve(__dirname, './src'),
    //     },
    // }
});
