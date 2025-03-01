import type { Meta, StoryObj } from '@storybook/react';

import BouncingCirclesLoading from './BouncingCirclesLoading';

export default {
  title: 'Components/BouncingCirclesLoading',
  component: BouncingCirclesLoading,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof BouncingCirclesLoading>;

type Story = StoryObj<typeof BouncingCirclesLoading>;

export const small: Story = {
  args: {
    size: 'small',
  },
};

export const medium: Story = {
  args: {
    size: 'medium',
  },
};

export const large: Story = {
  args: {
    size: 'large',
  },
};
