import { TEST_STRING } from 'src/utils/constants';
import { render, screen } from '../../../utils/testing-library-utils';
import CommonButton from './CommonButton';
import styles from './CommonButton.module.scss';

test('show button with text', () => {
  render(
    <CommonButton size='md' color='primary' onClickHandler={vitest.fn()}>
      {TEST_STRING}
    </CommonButton>
  );

  const component = screen.getByText(/testvalue/i);
  expect(component).toBeInTheDocument();
});

test('button should remain blue even when there is error', () => {
  const btnColor = 'primary';

  render(
    <CommonButton
      isLoading={true}
      isError={true}
      size='md'
      color={btnColor}
      onClickHandler={vitest.fn()}
    >
      {TEST_STRING}
    </CommonButton>
  );

  const component = screen.getByRole('button');
  expect(component).toHaveClass(styles[`btn--${btnColor}`]);
});
