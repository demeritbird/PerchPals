import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import ActivatePanel from './ActivatePanel';
import SnackbarProvider from '@/contexts/SnackbarProvider';

export default {
  title: 'Layouts/ActivatePanel',
  component: ActivatePanel,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <SnackbarProvider>
          <Story />
        </SnackbarProvider>
      </MemoryRouter>
    ),
  ],
} as Meta<typeof ActivatePanel>;

type Story = StoryObj<typeof ActivatePanel>;

export const Component: Story = {};
