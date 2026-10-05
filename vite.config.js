import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // Hashed output lives apart from public/assets so only it gets the immutable cache rule in _headers
    assetsDir: 'build',
  },
})
