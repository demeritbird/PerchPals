import type { Meta, StoryObj } from '@storybook/react';

import CircleCross from './CircleCrossIcon';

const meta = {
  title: 'Components/Icons/CircleCross',
  component: CircleCross,
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
} satisfies Meta<typeof CircleCross>;
export default meta;

type Story = StoryObj<typeof CircleCross>;
export const component: Story = {
  args: {
    size: 'sm',
    type: 'fill',
    color: 'grey-light',
    hoverColor: 'grey',
  },
};
