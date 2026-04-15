import type { Meta, StoryObj } from '@storybook/react';
import ProfilePage from './ProfilePage';
import './../../styles/main.scss';

export default {
  title: 'Routes/ProfilePage',
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ProfilePage>;

type Story = StoryObj<typeof ProfilePage>;

export const Component: Story = {};
