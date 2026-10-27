import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The Base44 preview reaches this dev server through a proxy that sends
// `<port>-<sandbox id>.<sandbox domain>` as the Host header and serves the page
// from https, so both the host allowlist and the HMR socket need to know about it.
const previewMode = process.env.BASE44_PREVIEW_MODE === '1'
const sandboxDomain = process.env.BASE44_SANDBOX_HOST_DOMAIN

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: previewMode && sandboxDomain ? [`.${sandboxDomain}`] : undefined,
    hmr: previewMode ? { protocol: 'wss', clientPort: 443 } : undefined,
    proxy: {
      '/api': {
        target: process.env.API_URL ?? 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
