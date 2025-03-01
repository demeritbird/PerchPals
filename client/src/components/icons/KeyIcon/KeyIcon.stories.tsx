import type { Meta, StoryObj } from '@storybook/react';

import KeyIcon from './KeyIcon';

export default {
  title: 'Icons/KeyIcon',
  component: KeyIcon,
} as Meta<typeof KeyIcon>;

type Story = StoryObj<typeof KeyIcon>;

export const Component: Story = {
  args: {
    size: 'small',
    type: 'fill',
    colour: 'black',
  },
};
