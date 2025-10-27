import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    build: {
        dev: {

        },
        lib: {
            entry: path.resolve(__dirname, 'src/lib.ts'), // 入口文件
            name: 'Univer', // 库的名字，它将作为全局变量的名称
            formats: ['iife'],
            fileName: (format) => `univer.${format}.js`, // 输出文件名格式
        },
    },
    rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖（比如 vue, react 等）
        external: [], // 如果有依赖第三方库且不想打包进去，可以在这里指定，如 ['vue']
        output: {
            // 当使用 iife/umd 时，可以通过 globals 指定外部依赖的全局变量名
            // 比如如果依赖了 lodash，并且外部化了，那么可以在这里写：lodash: '_'
            globals: {},
        },
    },
    define: {
        // 关键：将 process.env.NODE_ENV 替换为当前模式
        'process.env.NODE_ENV': '"production"',
    },
    plugins: [
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});
