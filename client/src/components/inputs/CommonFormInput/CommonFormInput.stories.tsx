import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import CommonFormInput from './CommonFormInput';
import { useRef } from 'react';

export default {
  title: 'Components/CommonFormInput',
  component: CommonFormInput,
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
} as Meta<typeof CommonFormInput>;

type Story = StoryObj<typeof CommonFormInput>;

export const Component: Story = {
  render: (args) => {
    const Wrapper = () => {
      const inputRef = useRef<HTMLInputElement>(null);
      return <CommonFormInput {...args} inputRef={inputRef} />;
    };
    return <Wrapper />;
  },
};
