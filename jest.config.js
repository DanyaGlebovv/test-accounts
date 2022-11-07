module.exports = {
  preset: 'ts-jest',
  verbose: false,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testMatch: [
    '**/*.test.ts',
  ],
  collectCoverage: false,
  forceExit: true,
  testEnvironment: 'node',
  notify: true,
  globalSetup: './jest.setup.js',
  globalTeardown: './jest.teardown.js',
  notifyMode: 'change',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    [
      'jest-watch-repeat',
      {
        key: 'r',
        prompt: 'repeat test runs.',
      },
    ],
    'jest-watch-master',
    [
      'jest-watch-toggle-config',
      {
        setting: 'verbose',
      },
    ],
    [
      'jest-watch-toggle-config',
      {
        setting: 'collectCoverage',
      },
    ],
  ],
}
