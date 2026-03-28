import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

// https://vite.dev/config/
export default defineConfig({
    base: './',
    plugins: [
        vue(),
        AutoImport({
            resolvers: [VantResolver()],
        }),
        Components({
            resolvers: [VantResolver()],
        }),
    ],
    resolve: {
        alias: { '@': new URL('./src', import.meta.url).pathname },
    },
    server: {
        // 开发环境配置
        port: 3000,
        open: true,
        headers: {
            'cache-control': 'no-cache, no-store, must-revalidate',
        },
    },
})
