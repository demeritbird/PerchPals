import type { Meta, StoryObj } from '@storybook/react';
import Snackbar from './Snackbar';
import './../../../styles/main.scss';

import { SuccessStatus } from '@/utils/types';
import { SnackbarProvider, SnackbarVisibility } from '@/contexts/SnackbarProvider';
import { TEST_STRING } from '@/utils/constants';

const meta = {
  title: 'Components/Modals/Snackbar',
  component: Snackbar,
  parameters: {
    docs: {
      description: {
        component: 'common snackbar with success and error status',
      },
    },
    controls: {
      exclude: [],
    },
  },
  argTypes: {},
} satisfies Meta<typeof Snackbar>;
export default meta;

type Story = StoryObj<typeof Snackbar>;

export const component: Story = {
  args: {
    show: SnackbarVisibility.SHOW,
    message: TEST_STRING,
    status: SuccessStatus.ERROR,
  },

  render: (args) => {
    const Wrapper = () => {
      return (
        <SnackbarProvider>
          <Snackbar {...args}></Snackbar>
        </SnackbarProvider>
      );
    };
    return <Wrapper />;
  },
};
