import type { Meta, StoryObj } from '@storybook/react';
import ScrollOverflowFadeWrapper from './ScrollOverflowFadeWrapper';
import './../../../styles/main.scss';

const PARENT_HEIGHT = '400px'; // smaller height than children total height
const CHILD_HEIGHT = '200px';
const ELEMENT_WIDTH = '100%';

export default {
  title: 'Components/Wrapper/ScrollOverflowFadeWrapper',
  component: ScrollOverflowFadeWrapper,
  render: () => (
    <div
      style={{
        backgroundColor: 'black',
        height: PARENT_HEIGHT,
        width: ELEMENT_WIDTH,
      }}
    >
      <ScrollOverflowFadeWrapper>
        <div
          style={{
            backgroundColor: 'blue',
            height: CHILD_HEIGHT,
            width: ELEMENT_WIDTH,
          }}
        ></div>
        <div
          style={{
            backgroundColor: 'green',
            height: CHILD_HEIGHT,
            width: ELEMENT_WIDTH,
          }}
        ></div>
        <div
          style={{
            backgroundColor: 'red',
            height: CHILD_HEIGHT,
            width: ELEMENT_WIDTH,
          }}
        ></div>
      </ScrollOverflowFadeWrapper>
    </div>
  ),
} as Meta<typeof ScrollOverflowFadeWrapper>;
type Story = StoryObj<typeof ScrollOverflowFadeWrapper>;

export const Component: Story = {};
