import type { Meta, StoryObj } from '@storybook/react';
import './../../../styles/main.scss';
import DisplayPhoto from './DisplayPhoto';

const meta = {
  title: 'Components/Images/DisplayPhoto',
  component: DisplayPhoto,
  parameters: {
    docs: {
      description: {
        component: 'Displays profile image with uploading new image function',
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
    edit: {
      control: { type: 'boolean' },
      if: { arg: 'size', neq: 'xs' },
    },
  },
} satisfies Meta<typeof DisplayPhoto>;
export default meta;

type Story = StoryObj<typeof DisplayPhoto>;
export const component: Story = {
  args: {
    src: '/img/default-user.jpeg',
    size: 'md',
    edit: undefined,
  },
};
