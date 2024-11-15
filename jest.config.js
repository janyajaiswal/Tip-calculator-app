/**
 * Jest configuration
 */

/** @type {import('jest').Config} */
const config = {
  // Automatically clear mock calls, instances, contexts, and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // Use the jsdom test environment to simulate a browser-like environment
  testEnvironment: "jest-environment-jsdom",

  // Transform JavaScript files using Babel
  transform: {
    "^.+\\.js$": "babel-jest",
  },

  // Mock SCSS/CSS files to prevent Jest from attempting to process them
  moduleNameMapper: {
    "\\.(scss|css)$": "identity-obj-proxy",
  },

  // Ignore specific files or folders during transformation
  transformIgnorePatterns: [
    "/node_modules/", // Ignore node_modules
    "\\.pnp\\.[^\\/]+$", // Ignore specific package manager files
  ],
};

module.exports = config;
