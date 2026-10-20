import { defineConfig, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'

const config: UserConfig & {
  test: {
    environment: 'jsdom'
    setupFiles: string[]
    css: boolean
    testTimeout: number
    coverage: {
      provider: 'v8'
      reporter: Array<'text' | 'json-summary' | 'html'>
      include: string[]
      exclude: string[]
    }
  }
} = {
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    css: true,
    testTimeout: 15000,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.test.{ts,tsx}', 'src/setupTests.ts', 'src/test-utils.tsx', 'src/vite-env.d.ts'],
    },
  },
}

export default defineConfig(config)
