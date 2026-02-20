import type { Meta, StoryObj } from '@storybook/react';
import BouncingCirclesLoading from './BouncingCirclesLoading';
import './../../../styles/main.scss';

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
    size: 'sm',
  },
};

export const medium: Story = {
  args: {
    size: 'md',
  },
};

export const large: Story = {
  args: {
    size: 'lg',
  },
};
