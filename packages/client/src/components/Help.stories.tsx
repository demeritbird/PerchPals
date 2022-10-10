import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Help from './Help';

export default {
  title: 'Example/Help',
  component: Help,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Help>;

const Template: ComponentStory<typeof Help> = (args) => <Help />;

export const normal = Template.bind({});
normal.args = {};
