import type { Meta, StoryObj } from '@storybook/react';

import SignupPanel from './SignupPanel';

export default {
  title: 'Layouts/LoginForm',
  component: SignupPanel,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof SignupPanel>;

type Story = StoryObj<typeof SignupPanel>;

export const Component: Story = {};
