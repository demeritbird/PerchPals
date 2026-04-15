import type { Meta, StoryObj } from '@storybook/react';
import SignupPanel from './SignupPanel';
import './../../../../styles/main.scss';

export default {
  title: 'Layouts/SignupPanel',
  component: SignupPanel,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof SignupPanel>;

type Story = StoryObj<typeof SignupPanel>;

export const Component: Story = {};
