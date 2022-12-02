import { ComponentStory, ComponentMeta } from '@storybook/react';

import BouncingCirclesLoading from './BouncingCirclesLoading';

export default {
  title: 'Components/BouncingCirclesLoading',
  component: BouncingCirclesLoading,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof BouncingCirclesLoading>;

const Template: ComponentStory<typeof BouncingCirclesLoading> = (args) => (
  <BouncingCirclesLoading {...args} />
);

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
