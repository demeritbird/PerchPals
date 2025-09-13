import type { Meta, StoryObj } from '@storybook/react';

import AuthPage from './AuthPage';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Routes/AuthPage',
  component: AuthPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof AuthPage>;

type Story = StoryObj<typeof AuthPage>;

export const Component: Story = {};
