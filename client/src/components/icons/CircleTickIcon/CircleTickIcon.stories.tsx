import type { Meta, StoryObj } from '@storybook/react';

import CircleTick from './CircleTickIcon';

const meta = {
  title: 'Components/Icons/CircleTick',
  component: CircleTick,
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
} satisfies Meta<typeof CircleTick>;
export default meta;

type Story = StoryObj<typeof CircleTick>;
export const component: Story = {
  args: {
    size: 'sm',
    type: 'fill',
    color: 'grey-light',
    hoverColor: 'grey',
  },
};
