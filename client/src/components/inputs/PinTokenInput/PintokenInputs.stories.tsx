import type { Meta, StoryObj } from '@storybook/react';
import PinTokenInputs from './PinTokenInputs';
import './../../../styles/main.scss';
import { useState } from 'react';

export default {
  title: 'Components/Inputs/PinTokenInputs',
  component: PinTokenInputs,
  parameters: {
    docs: {
      description: {
        component: 'Input for 6 character pintokens with different states',
      },
    },
    controls: {
      exclude: ['token', 'setToken', 'onChangeHandler'],
    },
  },
} as Meta<typeof PinTokenInputs>;

type Story = StoryObj<typeof PinTokenInputs>;

export const Component: Story = {
  args: {
    isError: false,
  },

  render: (args) => {
    const Wrapper = () => {
      const [token, setToken] = useState('');

      return (
        <PinTokenInputs
          token={token}
          setToken={setToken}
          isError={args.isError}
          onChangeHandler={() => {
            args.isError = false;
          }}
        ></PinTokenInputs>
      );
    };
    return <Wrapper />;
  },
};
