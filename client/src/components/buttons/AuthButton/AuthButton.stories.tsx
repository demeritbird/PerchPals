import { ComponentStory, ComponentMeta } from '@storybook/react';

import AuthButton from './AuthButton';

export default {
  title: 'Example/AuthButton',
  component: AuthButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AuthButton>;

const Template: ComponentStory<typeof AuthButton> = (args) => <AuthButton {...args} />;

export const Component = Template.bind({});
