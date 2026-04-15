import type { Meta, StoryObj } from '@storybook/react';
import './../../../styles/main.scss';
import CameraIcon from './CameraIcon';

const meta = {
  title: 'Components/Icons/CameraIcon',
  component: CameraIcon,
  parameters: {
    controls: {
      exclude: [],
    },
  },
  argTypes: {
    size: {
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
} satisfies Meta<typeof CameraIcon>;
export default meta;

type Story = StoryObj<typeof CameraIcon>;
export const component: Story = {
  args: {
    size: 'sm',
    type: 'fill',
    color: 'grey-light',
    hoverColor: 'grey',
  },
};
