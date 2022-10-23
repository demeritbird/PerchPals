/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  verbose: true,
  forceExit: true,
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
};
