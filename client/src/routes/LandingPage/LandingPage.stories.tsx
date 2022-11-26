import { ComponentStory, ComponentMeta } from '@storybook/react';
// import { withRouter } from 'storybook-addon-react-router-v6';

import LandingPage from './LandingPage';

export default {
  title: 'Routes/LandingPage',
  component: LandingPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof LandingPage>;

const Template: ComponentStory<typeof LandingPage> = (args) => <LandingPage />;

export const Component = Template.bind({});
