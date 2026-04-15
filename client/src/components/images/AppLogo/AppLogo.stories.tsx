import type { Meta, StoryObj } from '@storybook/react';
import './../../../styles/main.scss';
import AppLogo from './AppLogo';

const meta = {
  title: 'Components/Images/AppLogo',
  component: AppLogo,
  argTypes: {
    size: {
      description: 'size of display image',
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'select',
        labels: {
          sm: 'small',
          md: 'medium',
          lg: 'large',
        },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Main image of this application, Perchpals!',
      },
    },
  },
} satisfies Meta<typeof AppLogo>;
export default meta;

type Story = StoryObj<typeof AppLogo>;

export const component: Story = {
  args: {
    size: 'md',
  },
};
