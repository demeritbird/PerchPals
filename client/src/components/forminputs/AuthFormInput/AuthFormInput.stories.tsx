import { ComponentStory, ComponentMeta } from '@storybook/react';

import AuthFormInput from './AuthFormInput';

export default {
  title: 'Example/AuthFormInput',
  component: AuthFormInput,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AuthFormInput>;

const Template: ComponentStory<typeof AuthFormInput> = (args) => <AuthFormInput {...args} />;

export const Component = Template.bind({});
