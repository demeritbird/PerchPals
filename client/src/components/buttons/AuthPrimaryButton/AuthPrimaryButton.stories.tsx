import type { Meta, StoryObj } from '@storybook/react';

import AuthPrimaryButton from './AuthPrimaryButton';

export default {
  title: 'Components/AuthPrimaryButton',
  component: AuthPrimaryButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof AuthPrimaryButton>;
type Story = StoryObj<typeof AuthPrimaryButton>;

export const Component: Story = {};
