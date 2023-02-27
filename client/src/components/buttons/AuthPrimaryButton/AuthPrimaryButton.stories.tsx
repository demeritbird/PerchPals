import { ComponentStory, ComponentMeta } from '@storybook/react';

import AuthPrimaryButton from './AuthPrimaryButton';

export default {
  title: 'Components/AuthPrimaryButton',
  component: AuthPrimaryButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AuthPrimaryButton>;

const Template: ComponentStory<typeof AuthPrimaryButton> = (args) => (
  <AuthPrimaryButton {...args}>Test Value</AuthPrimaryButton>
);

export const Component = Template.bind({});
