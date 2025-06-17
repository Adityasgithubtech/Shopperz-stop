import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import eslint from 'vite-plugin-eslint'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    eslint({
      failOnWarning: false,
      failOnError: false, // 👈 this line makes ESLint errors non-blocking
    }),
  ],
})
