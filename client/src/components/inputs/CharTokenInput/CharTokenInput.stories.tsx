import { ComponentStory, ComponentMeta } from '@storybook/react';

import SixCharTokenInput from './CharTokenInput';

export default {
  title: 'Components/SixCharTokenInput',
  component: SixCharTokenInput,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof SixCharTokenInput>;

const Template: ComponentStory<typeof SixCharTokenInput> = (args) => <SixCharTokenInput />;

export const Component = Template.bind({});
