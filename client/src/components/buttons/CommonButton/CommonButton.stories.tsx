import type { Meta, StoryObj } from '@storybook/react';
import CommonButton from './CommonButton';
import './../../../styles/main.scss';

const meta = {
  title: 'Components/Buttons/CommonButton',
  component: CommonButton,
  parameters: {
    docs: {
      description: {
        component: 'Reusable button with different states',
      },
    },
    controls: {
      exclude: ['isForForm', 'onClickHandler'],
    },
  },
  argTypes: {
    children: {
      name: 'textContent',
      control: 'text',
    },
    size: {
      options: ['md', 'lg'],
      control: {
        type: 'select',
        labels: {
          md: 'medium',
          lg: 'large',
        },
      },
    },
    color: {
      options: ['primary', 'secondary', 'grey'],
      control: {
        type: 'select',
        labels: {
          primary: 'primary',
          secondary: 'secondary',
          grey: 'grey',
        },
      },
    },
  },
} satisfies Meta<typeof CommonButton>;
export default meta;

type Story = StoryObj<typeof CommonButton>;

export const component: Story = {
  args: {
    isError: false,
    isLoading: false,
    size: 'md',
    color: 'primary',
    children: 'Some Value',
  },

  render: (args) => {
    const Wrapper = () => {
      return <CommonButton {...args}>{args.children}</CommonButton>;
    };
    return <Wrapper />;
  },
};
