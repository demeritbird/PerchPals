import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import ActivatePanel from './ActivatePanel';

export default {
  title: 'Layouts/ActivatePanel',
  component: ActivatePanel,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta<typeof ActivatePanel>;

type Story = StoryObj<typeof ActivatePanel>;

export const Component: Story = {};
