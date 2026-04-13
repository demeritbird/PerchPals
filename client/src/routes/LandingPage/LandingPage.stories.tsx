import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from './LandingPage';
import SnackbarProvider from '@/contexts/SnackbarProvider';

export default {
  title: 'Routes/LandingPage',
  component: LandingPage,
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
} as Meta<typeof LandingPage>;

type Story = StoryObj<typeof LandingPage>;

export const Component: Story = {};
