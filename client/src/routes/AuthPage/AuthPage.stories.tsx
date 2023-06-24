import { ComponentStory, ComponentMeta } from '@storybook/react';

import AuthPage from './AuthPage';

export default {
  title: 'Routes/AuthPage',
  component: AuthPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AuthPage>;

const Template: ComponentStory<typeof AuthPage> = (args) => <AuthPage />;

export const Component = Template.bind({});
