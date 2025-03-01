import type { Meta, StoryObj } from '@storybook/react';

import LoginPanel from './LoginPanel';

export default {
  title: 'Layouts/LoginPanel',
  component: LoginPanel,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof LoginPanel>;

type Story = StoryObj<typeof LoginPanel>;

export const Component: Story = {};
