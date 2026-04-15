import type { Meta, StoryObj } from '@storybook/react';
import GlassContainerWrapper from './GlassContainerWrapper';
import './../../../styles/main.scss';

export default {
  title: 'Components/Wrapper/GlassContainerWrapper',
  component: GlassContainerWrapper,
  render: ({ ...args }) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        padding: '20px',
        background: 'linear-gradient(to bottom, rgba(41, 83, 128, 1), rgba(74, 75, 113, 1))',
      }}
    >
      <GlassContainerWrapper {...args}>
        <div
          style={{
            height: '200px',
            width: '200px',
          }}
        >
          <p
            style={{
              color: 'white',
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </GlassContainerWrapper>
    </div>
  ),
} as Meta<typeof GlassContainerWrapper>;
type Story = StoryObj<typeof GlassContainerWrapper>;

export const Component: Story = {};
