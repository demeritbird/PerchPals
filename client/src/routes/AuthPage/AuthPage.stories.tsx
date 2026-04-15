import type { Meta, StoryObj } from '@storybook/react';

import AuthPage from './AuthPage';

export default {
  title: 'Routes/AuthPage',
  component: AuthPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof AuthPage>;

type Story = StoryObj<typeof AuthPage>;

export const Component: Story = {};
