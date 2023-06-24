import { render, screen } from '../../../utils/testing-library-utils';
import AuthPrimaryButton from './AuthPrimaryButton';

test('render label names for login and signup', () => {
  render(<AuthPrimaryButton>test value</AuthPrimaryButton>, {});

  const authPrimaryButtonText = screen.getByText(/test value/i);
  expect(authPrimaryButtonText).toBeInTheDocument();
});
