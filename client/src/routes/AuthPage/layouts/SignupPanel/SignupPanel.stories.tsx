import { ComponentStory, ComponentMeta } from '@storybook/react';

import SignupPanel from './SignupPanel';

export default {
  title: 'Layouts/LoginForm',
  component: SignupPanel,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof SignupPanel>;

const Template: ComponentStory<typeof SignupPanel> = (args) => <SignupPanel />;

export const Component = Template.bind({});
