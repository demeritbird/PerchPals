import type { Meta, StoryObj } from '@storybook/react';

import EyeCloseIcon from './EyeCloseIcon';

const meta = {
  title: 'Components/Icons/EyeCloseIcon',
  component: EyeCloseIcon,
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
} satisfies Meta<typeof EyeCloseIcon>;
export default meta;

type Story = StoryObj<typeof EyeCloseIcon>;
export const component: Story = {
  args: {
    size: 'sm',
    type: 'fill',
    color: 'grey-light',
    hoverColor: 'grey',
  },
};
