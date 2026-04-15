import type { Meta, StoryObj } from '@storybook/react';
import './../../../styles/main.scss';
import KeyIcon from './KeyIcon';

const meta = {
  title: 'Components/Icons/KeyIcon',
  component: KeyIcon,
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
} satisfies Meta<typeof KeyIcon>;
export default meta;

type Story = StoryObj<typeof KeyIcon>;
export const component: Story = {
  args: {
    size: 'sm',
    type: 'fill',
    color: 'grey-light',
    hoverColor: 'grey',
  },
};
