import type { Meta, StoryObj } from '@storybook/react';
import './../../../styles/main.scss';
import EmailIcon from './EmailIcon';

const meta = {
  title: 'Components/Icons/EmailIcon',
  component: EmailIcon,
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
} satisfies Meta<typeof EmailIcon>;
export default meta;

type Story = StoryObj<typeof EmailIcon>;
export const component: Story = {
  args: {
    size: 'sm',
    type: 'fill',
    color: 'grey-light',
    hoverColor: 'grey',
  },
};
