import type { Meta } from '@storybook/react';
import ProfilePage from './ProfilePage';

const meta: Meta<typeof ProfilePage> = {
  component: ProfilePage,
  decorators: [(Story) => <Story />],
};

export default meta;
