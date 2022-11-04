module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-create-react-app',
  ],
  core: {
    builder: '@storybook/builder-vite', // 👈 The builder enabled here.
  },
  // https://storybook.js.org/docs/html/builders/vite
};
