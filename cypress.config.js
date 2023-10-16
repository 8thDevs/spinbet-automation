const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1200,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("file:preprocessor", cucumber());
      return require('./cypress/plugins/index.js')(on,config)
    },
    baseUrl: "https://stage.spinbet.com/en-nz",
    specPattern:
      "**/*.{cy.js,feature}",
    defaultCommandTimeout: 30000
  },
});
