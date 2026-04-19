import type { Meta, StoryObj } from '@storybook/react';
import './../../../styles/main.scss';
import HouseIcon from './HouseIcon';

const meta = {
  title: 'Components/Icons/HouseIcon',
  component: HouseIcon,
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
} satisfies Meta<typeof HouseIcon>;
export default meta;

type Story = StoryObj<typeof HouseIcon>;
export const component: Story = {
  args: {
    size: 'sm',
    type: 'fill',
    color: 'grey-light',
    hoverColor: 'grey',
  },
};
