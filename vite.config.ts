import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'
import path from "path"
import fs from "fs"

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, "certs/192.168.43.218-key.pem")),
  //     cert: fs.readFileSync(path.resolve(__dirname, "certs/192.168.43.218.pem")),
  //   },
  //   host: true,
  // },
  plugins: [react(),
    VitePWA({
      registerType: 'autoUpdate',

      manifest: {
        name: 'SparPlay',
        short_name: 'SparPlay',
        description: 'Online multiplayer Spar card game',

        theme_color: '#111827',
        background_color: '#111827',

        display: 'standalone',

        icons: [
          {
            src: '/cards.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/cards.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
})
