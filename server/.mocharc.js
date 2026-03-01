module.exports = {
  require: 'ts-node/register',
  file: ['utils/setupTests.ts'],
  spec: '**/*.test.ts',
  reporter: 'spec',
  timeout: 10000,
  exit: true,
};
