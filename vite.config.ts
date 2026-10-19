import { defineConfig, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'

const config: UserConfig & {
  test: {
    environment: 'jsdom'
    setupFiles: string[]
    css: boolean
  }
} = {
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    css: true,
  },
}

export default defineConfig(config)
