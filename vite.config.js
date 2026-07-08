import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'

  return {
    base: isProduction ? '/evil-invaders-svite/' : '/',
    plugins: [svelte()],
  }
})
