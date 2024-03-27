import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: '2purtr',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
