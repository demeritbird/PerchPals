import type { Meta, StoryObj } from '@storybook/react';

import LogoutButton from './LogoutButton';

export default {
  title: 'Components/LogoutButton',
  component: LogoutButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof LogoutButton>;

type Story = StoryObj<typeof LogoutButton>;

export const Component: Story = {};
