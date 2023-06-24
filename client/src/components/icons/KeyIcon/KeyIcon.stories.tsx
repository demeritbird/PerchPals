import { ComponentStory, ComponentMeta } from '@storybook/react';
import KeyIcon from './KeyIcon';

export default {
  title: 'Icons/KeyIcon',
  component: KeyIcon,
} as ComponentMeta<typeof KeyIcon>;

const Template: ComponentStory<typeof KeyIcon> = (args) => <KeyIcon {...args} />;

export const Component = Template.bind({});
Component.args = {
  size: 'small',
  type: 'fill',
  colour: 'black',
};
