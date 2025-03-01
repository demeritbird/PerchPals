import type { Meta, StoryObj } from '@storybook/react';

import EmailIcon from './EmailIcon';

export default {
  title: 'Icons/EmailIcon',
  component: EmailIcon,
} as Meta<typeof EmailIcon>;

type Story = StoryObj<typeof EmailIcon>;

export const Component: Story = {
  args: {
    size: 'small',
    type: 'fill',
    colour: 'black',
  },
};
