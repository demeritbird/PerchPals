import type { Meta, StoryObj } from '@storybook/react';

import LandingPage from './LandingPage';

export default {
  title: 'Routes/LandingPage',
  component: LandingPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof LandingPage>;

type Story = StoryObj<typeof LandingPage>;

export const Component: Story = {};
