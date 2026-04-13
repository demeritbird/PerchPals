import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import SignupPanel from './SignupPanel';
import SnackbarProvider from '@/contexts/SnackbarProvider';

export default {
  title: 'Layouts/SignupPanel',
  component: SignupPanel,
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
} as Meta<typeof SignupPanel>;

type Story = StoryObj<typeof SignupPanel>;

export const Component: Story = {};
