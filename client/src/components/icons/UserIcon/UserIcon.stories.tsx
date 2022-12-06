import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IconSize, IconStyle } from '../IconWrapper';

import UserIcon from './UserIcon';

export default {
  title: 'Icons/UserIcon',
  component: UserIcon,
} as ComponentMeta<typeof UserIcon>;

const Template: ComponentStory<typeof UserIcon> = (args) => <UserIcon {...args} />;

export const Component = Template.bind({});
Component.args = {
  size: IconSize.SMALL,
  type: IconStyle.FILL,
  colour: 'black',
};
