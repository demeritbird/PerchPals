import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import LogoutButton from './LogoutButton';

export default {
  title: 'Components/LogoutButton',
  component: LogoutButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta<typeof LogoutButton>;

type Story = StoryObj<typeof LogoutButton>;

export const Component: Story = {};
