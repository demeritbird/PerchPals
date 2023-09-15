import { ComponentStory, ComponentMeta } from '@storybook/react';

import LoginPanel from './LoginPanel';

export default {
  title: 'Layouts/LoginPanel',
  component: LoginPanel,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof LoginPanel>;

const Template: ComponentStory<typeof LoginPanel> = (args) => <LoginPanel />;

export const Component = Template.bind({});
