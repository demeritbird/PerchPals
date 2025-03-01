import type { Meta, StoryObj } from '@storybook/react';

import CameraIcon from './CameraIcon';

export default {
  title: 'Icons/CameraIcon',
  component: CameraIcon,
} as Meta<typeof CameraIcon>;

type Story = StoryObj<typeof CameraIcon>;

export const Component: Story = {
  args: {
    size: 'small',
    type: 'fill',
    colour: 'black',
  },
};
