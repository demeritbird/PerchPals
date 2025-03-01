import type { Meta, StoryObj } from '@storybook/react';

import ProfileImage from './ProfileImage';

export default {
  title: 'Components/ProfileImage',
  component: ProfileImage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ProfileImage>;

type Story = StoryObj<typeof ProfileImage>;

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
