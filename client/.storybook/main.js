const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],

  async viteFinal(config, { configType }) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@backend': path.resolve(__dirname, '../../server/utils/types/shared-types.ts'),
    };
    return config;
  },

  core: {
    builder: '@storybook/builder-vite',
  },
  // https://storybook.js.org/docs/html/builders/vite
};
