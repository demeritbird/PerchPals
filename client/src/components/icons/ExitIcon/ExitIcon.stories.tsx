import type { Meta, StoryObj } from '@storybook/react';
import './../../../styles/main.scss';
import ExitIcon from './ExitIcon';

const meta = {
  title: 'Components/Icons/Exiticon',
  component: ExitIcon,
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
} satisfies Meta<typeof ExitIcon>;
export default meta;

type Story = StoryObj<typeof ExitIcon>;
export const component: Story = {
  args: {
    size: 'sm',
    type: 'fill',
    color: 'grey-light',
    hoverColor: 'grey',
  },
};
