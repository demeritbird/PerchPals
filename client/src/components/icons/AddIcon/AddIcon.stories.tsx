import type { Meta, StoryObj } from '@storybook/react';
import './../../../styles/main.scss';
import AddIcon from './AddIcon';

const meta = {
  title: 'Components/Icons/AddIcon',
  component: AddIcon,
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
} satisfies Meta<typeof AddIcon>;
export default meta;

type Story = StoryObj<typeof AddIcon>;
export const component: Story = {
  args: {
    size: 'sm',
    type: 'fill',
    color: 'grey-light',
    hoverColor: 'grey',
  },
};
