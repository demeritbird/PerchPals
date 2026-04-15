import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router-dom';

import ResetPasswordPanel from './ResetPasswordPanel';
import SnackbarProvider from '@/contexts/SnackbarProvider';
import './../../../../styles/main.scss';

export default {
  title: 'Layouts/ResetPasswordPanel',
  component: ResetPasswordPanel,
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
} as Meta<typeof ResetPasswordPanel>;

type Story = StoryObj<typeof ResetPasswordPanel>;

export const Component: Story = {
  render: () => {
    const Wrapper = () => {
      return (
        <ResetPasswordPanel
          setCurrentRegistrationHandler={action('setCurrentRegistrationHandler')}
        ></ResetPasswordPanel>
      );
    };
    return <Wrapper />;
  },
};
