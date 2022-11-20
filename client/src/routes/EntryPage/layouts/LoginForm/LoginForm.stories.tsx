import { ComponentStory, ComponentMeta } from '@storybook/react';

import LoginForm from './LoginForm';

export default {
  title: 'Layouts/LoginForm',
  component: LoginForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm />;

export const Component = Template.bind({});
