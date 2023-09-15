import { ComponentStory, ComponentMeta } from '@storybook/react';
import EmailIcon from './EmailIcon';

export default {
  title: 'Icons/EmailIcon',
  component: EmailIcon,
} as ComponentMeta<typeof EmailIcon>;

const Template: ComponentStory<typeof EmailIcon> = (args) => <EmailIcon {...args} />;

export const Component = Template.bind({});
Component.args = {
  size: 'small',
  type: 'fill',
  colour: 'black',
};
