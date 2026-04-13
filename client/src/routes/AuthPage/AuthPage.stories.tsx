import type { Meta, StoryObj } from '@storybook/react';

import AuthPage from './AuthPage';
import { MemoryRouter } from 'react-router-dom';
import SnackbarProvider from '@/contexts/SnackbarProvider';

export default {
  title: 'Routes/AuthPage',
  component: AuthPage,
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
} as Meta<typeof AuthPage>;

type Story = StoryObj<typeof AuthPage>;

export const Component: Story = {};
