import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/My_Portfolio/', // <-- set this to /REPO_NAME/ for repo GitHub Pages
  plugins: [react()],
})


