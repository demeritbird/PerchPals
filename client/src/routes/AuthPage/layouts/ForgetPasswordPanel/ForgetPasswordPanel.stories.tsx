import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ForgetPasswordPanel from './ForgetPasswordPanel';
import './../../../../styles/main.scss';

export default {
  title: 'Layouts/ForgetPasswordPanel',
  component: ForgetPasswordPanel,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ForgetPasswordPanel>;

type Story = StoryObj<typeof ForgetPasswordPanel>;

export const Component: Story = {
  render: (args) => {
    const Wrapper = () => {
      return (
        <ForgetPasswordPanel
          setCurrentRegistrationHandler={action('setCurrentRegistrationHandler')}
        ></ForgetPasswordPanel>
      );
    };
    return <Wrapper />;
  },
};
