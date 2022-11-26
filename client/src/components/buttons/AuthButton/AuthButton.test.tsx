import { render, screen } from '../../../utils/testing-library-utils';
import AuthButton from './AuthButton';

test('render label names for login and signup', () => {
  render(<AuthButton>test value</AuthButton>, {});

  const authButtonText = screen.getByText(/test value/i);
  expect(authButtonText).toBeInTheDocument();
});
