import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import LoginPanel from './LoginPanel';

export default {
  title: 'Layouts/LoginPanel',
  component: LoginPanel,
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
} as Meta<typeof LoginPanel>;

type Story = StoryObj<typeof LoginPanel>;

export const Component: Story = {};
