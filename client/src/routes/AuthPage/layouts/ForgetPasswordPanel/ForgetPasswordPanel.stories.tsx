import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router-dom';

import ForgetPasswordPanel from './ForgetPasswordPanel';
import SnackbarProvider from '@/contexts/SnackbarProvider';

export default {
  title: 'Layouts/ForgetPasswordPanel',
  component: ForgetPasswordPanel,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <SnackbarProvider>
          <Story />
        </SnackbarProvider>
      </MemoryRouter>
    ),
  ],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ForgetPasswordPanel>;

type Story = StoryObj<typeof ForgetPasswordPanel>;

export const Component: Story = {
  render: (args) => {
    const Wrapper = () => {
      return (
        <ForgetPasswordPanel
          setCurrentRegistrationHandler={action('setCurrentRegistrationHandler')}
        ></ForgetPasswordPanel>
      );
    };
    return <Wrapper />;
  },
};
