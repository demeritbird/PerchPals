import type { Meta, StoryObj } from '@storybook/react';
import CommonFormInput from './CommonFormInput';
import { useRef } from 'react';
import UserIcon from 'src/components/icons/UserIcon';
import KeyIcon from 'src/components/icons/KeyIcon';

const meta = {
  title: 'Components/Inputs/CommonFormInput',
  component: CommonFormInput,
  parameters: {
    docs: {
      description: {
        component: 'Sample input',
      },
    },
    controls: {
      exclude: ['icon', 'inputRef', 'onChangeHandler'],
    },
  },
} satisfies Meta<typeof CommonFormInput>;
export default meta;

type Story = StoryObj<typeof CommonFormInput>;

export const textInputComponent: Story = {
  args: {
    inputType: 'text',
    showBackground: true,
    isError: false,
  },

  render: (args) => {
    const Wrapper = () => {
      const inputRef = useRef<HTMLInputElement>(null);

      return (
        <CommonFormInput {...args} icon={UserIcon} inputRef={inputRef}>
          Name
        </CommonFormInput>
      );
    };
    return <Wrapper />;
  },
};
export const passwordInputComponent: Story = {
  args: {
    inputType: 'password',
    showBackground: false,
    isError: false,
  },

  render: (args) => {
    const Wrapper = () => {
      const inputRef = useRef<HTMLInputElement>(null);

      return (
        <CommonFormInput {...args} icon={KeyIcon} inputRef={inputRef}>
          Password
        </CommonFormInput>
      );
    };
    return <Wrapper />;
  },
};
