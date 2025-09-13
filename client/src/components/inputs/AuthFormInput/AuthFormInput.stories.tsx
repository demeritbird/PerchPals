import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import AuthFormInput from './AuthFormInput';
import { useRef } from 'react';

export default {
  title: 'Components/AuthFormInput',
  component: AuthFormInput,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof AuthFormInput>;

type Story = StoryObj<typeof AuthFormInput>;

export const Component: Story = {
  render: (args) => {
    const Wrapper = () => {
      const inputRef = useRef<HTMLInputElement>(null);
      return <AuthFormInput {...args} inputRef={inputRef} />;
    };
    return <Wrapper />;
  },
};
