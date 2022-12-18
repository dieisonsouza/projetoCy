const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        viewportHeight: 1080,
        viewportWidth: 1920,
        baseUrl: 'http://localhost:3000',
        // eslint-disable-next-line
        setupNodeEvents(on, config) {
        // implement node event listeners here
        },
    },
});