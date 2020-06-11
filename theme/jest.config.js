// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ['src/**/*(.js|!(*.spec.js|*.scss|*.json|*.snap))'],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  globals: {
    __PATH_PREFIX__: ``
  },

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'json', 'jsx'],

  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`
  },

  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: ['<rootDir>/enzyme.config.js'],

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],

  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  testURL: 'http://localhost',

  transform: {
    '^.+\\.jsx?$': `<rootDir>/jest-preprocess.js`
  },

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],

  // Indicates whether each individual test should be reported during the run
  verbose: false
}
