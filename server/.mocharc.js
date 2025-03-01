module.exports = {
  require: 'ts-node/register',
  spec: 'tests/**/*.test.ts',
  reporter: 'spec',
  timeout: 10000,
  exit: true,
};
