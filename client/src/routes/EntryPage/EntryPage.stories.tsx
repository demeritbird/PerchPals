import { ComponentStory, ComponentMeta } from '@storybook/react';

import EntryPage from './EntryPage';

export default {
  title: 'Routes/EntryPage',
  component: EntryPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof EntryPage>;

const Template: ComponentStory<typeof EntryPage> = (args) => <EntryPage />;

export const Component = Template.bind({});
