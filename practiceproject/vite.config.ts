import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {nodePolyfills} from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(),
        nodePolyfills({
            // Whether to polyfill certain Node.js modules
            crypto: true,
            path: true,
            // Add other Node.js modules you need to polyfill here
        })    ],
})
