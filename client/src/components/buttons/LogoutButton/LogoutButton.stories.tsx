import { ComponentStory, ComponentMeta } from '@storybook/react';

import LogoutButton from './LogoutButton';

export default {
  title: 'Components/LogoutButton',
  component: LogoutButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof LogoutButton>;

const Template: ComponentStory<typeof LogoutButton> = (args) => <LogoutButton />;

export const Component = Template.bind({});
