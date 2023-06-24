import { ComponentStory, ComponentMeta } from '@storybook/react';
import CameraIcon from './CameraIcon';

export default {
  title: 'Icons/CameraIcon',
  component: CameraIcon,
} as ComponentMeta<typeof CameraIcon>;

const Template: ComponentStory<typeof CameraIcon> = (args) => <CameraIcon {...args} />;

export const Component = Template.bind({});
Component.args = {
  size: 'small',
  type: 'fill',
  colour: 'black',
};
