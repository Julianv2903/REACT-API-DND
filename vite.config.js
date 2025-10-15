import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // <- permite que el servidor sea accesible externamente
    port: 5173,      // <- usa el puerto 5173
    strictPort: true // <- evita que cambie de puerto
  }
})
