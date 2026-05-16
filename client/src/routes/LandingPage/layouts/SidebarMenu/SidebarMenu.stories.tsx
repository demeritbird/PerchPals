import type { Meta, StoryObj } from '@storybook/react';

import SidebarMenu from './SidebarMenu';

export default {
  title: 'Routes/LandingPage/Layouts/SidebarMenu',
  component: SidebarMenu,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof SidebarMenu>;

type Story = StoryObj<typeof SidebarMenu>;

export const Component: Story = {};
