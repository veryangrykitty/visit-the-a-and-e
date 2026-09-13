import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// Repo name, so asset URLs resolve under github.io/<repo>/.
const BASE = '/visit-the-a-and-e/'

export default defineConfig(({ mode }) => {
  // envPrefix below exposes GAS_* to client code, so .env keeps its
  // existing GAS_URL name and the Actions secret maps across 1:1.
  const env = loadEnv(mode, process.cwd(), ['VITE_', 'GAS_'])

  if (mode === 'production' && !env.GAS_URL) {
    throw new Error(
      'GAS_URL is not set. Locally: add it to .env. ' +
      'In CI: check the GAS_URL repo secret is present and exported to the build step.'
    )
  }

  return {
    plugins: [vue()],
    base: BASE,
    envPrefix: ['VITE_', 'GAS_'],
  }
})
