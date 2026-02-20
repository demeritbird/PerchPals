import type { Meta, StoryObj } from '@storybook/react';

import ProfileImage from './ProfileImage';

const meta = {
  title: 'Components/Images/ProfileImage',
  component: ProfileImage,
  parameters: {
    docs: {
      description: {
        component: 'Displays profile image of user with uploading new image function',
      },
    },
    controls: {
      exclude: ['src'],
    },
  },
  argTypes: {
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: {
        type: 'select',
        labels: {
          xs: 'tiny',
          sm: 'small',
          md: 'medium',
          lg: 'large',
          xl: 'huge',
        },
      },
    },
    isEdit: {
      control: { type: 'boolean' },
      if: { arg: 'size', neq: 'xs' },
    },
  },
} satisfies Meta<typeof ProfileImage>;
export default meta;

type Story = StoryObj<typeof ProfileImage>;
export const component: Story = {
  args: {
    src: '/img/default-user.jpeg',
    size: 'md',
    isEdit: false,
  },
};
