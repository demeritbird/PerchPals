import type { Meta, StoryObj } from '@storybook/react';
import AuthFormInput from './AuthFormInput';

export default {
  title: 'Components/AuthFormInput',
  component: AuthFormInput,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof AuthFormInput>;

type Story = StoryObj<typeof AuthFormInput>;

export const Component: Story = {};
