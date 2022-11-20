import { ComponentStory, ComponentMeta } from '@storybook/react';

import SignupForm from './SignupForm';

export default {
  title: 'Layouts/LoginForm',
  component: SignupForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof SignupForm>;

const Template: ComponentStory<typeof SignupForm> = (args) => <SignupForm />;

export const Component = Template.bind({});
