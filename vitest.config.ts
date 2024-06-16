import { defineVitestConfig } from '@nuxt/test-utils/config'
import path from 'path';

export default defineVitestConfig({
  test: {
    environment: 'nuxt'
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, "./")
    }
  }
})
