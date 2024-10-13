import path from "path"
import { defineConfig } from "vite"
import viteReact from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    viteReact(),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server:{
    proxy:{
      "/api":{
        target: 'https://clanderbackend.up.railway.app',
        changeOrigin: true,
      }
    }
  },
  build: {
    rollupOptions: {
      external: ['zod',"drizzle-orm/mysql-core"],
    },
  },
})