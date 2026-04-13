import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import ProfilePage from './ProfilePage';
import SnackbarProvider from '@/contexts/SnackbarProvider';

export default {
  title: 'Routes/ProfilePage',
  component: ProfilePage,
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
} as Meta<typeof ProfilePage>;

type Story = StoryObj<typeof ProfilePage>;

export const Component: Story = {};
