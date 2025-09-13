import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import SignupPanel from './SignupPanel';

export default {
  title: 'Layouts/LoginForm',
  component: SignupPanel,
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
} as Meta<typeof SignupPanel>;

type Story = StoryObj<typeof SignupPanel>;

export const Component: Story = {};
