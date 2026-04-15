import type { Meta, StoryObj } from '@storybook/react';
import BackgroundImageWrapper from './BackgroundImageWrapper';
import './../../../styles/main.scss';

export default {
  title: 'Components/Wrapper/BackgroundImageWrapper',
  component: BackgroundImageWrapper,
  render: ({ ...args }) => (
    <BackgroundImageWrapper {...args}>
      <div
        style={{
          backgroundColor: 'white',
          height: '200px',
          width: '200px',
        }}
      ></div>
    </BackgroundImageWrapper>
  ),
} as Meta<typeof BackgroundImageWrapper>;
type Story = StoryObj<typeof BackgroundImageWrapper>;

export const Component: Story = {
  args: {
    active: true,
  },
};
