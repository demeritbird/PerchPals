import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProfileImage from './ProfileImage';

export default {
  title: 'Components/ProfileImage',
  component: ProfileImage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileImage>;

const Template: ComponentStory<typeof ProfileImage> = (args) => <ProfileImage {...args} />;

export const Small = Template.bind({});
Small.args = {
  size: 'small',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'medium',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
};
