import type { Meta, StoryObj } from '@storybook/react';

import UserIcon from './UserIcon';

export default {
  title: 'Icons/UserIcon',
  component: UserIcon,
} as Meta<typeof UserIcon>;

type Story = StoryObj<typeof UserIcon>;

export const Component: Story = {
  args: {
    size: 'small',
    type: 'fill',
    colour: 'black',
  },
};
