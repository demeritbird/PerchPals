import type { Meta, StoryObj } from '@storybook/react';

import EyeOpenIcon from './EyeOpenIcon';

const meta = {
  title: 'Components/Icons/EyeOpenIcon',
  component: EyeOpenIcon,
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
} satisfies Meta<typeof EyeOpenIcon>;
export default meta;

type Story = StoryObj<typeof EyeOpenIcon>;
export const component: Story = {
  args: {
    size: 'sm',
    type: 'fill',
    color: 'grey-light',
    hoverColor: 'grey',
  },
};
