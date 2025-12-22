import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
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
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
})
