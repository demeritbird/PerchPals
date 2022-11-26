import { render, screen } from '../../../utils/testing-library-utils';
import LogoutButton from './LogoutButton';

test('render label names for logout button', () => {
  render(<LogoutButton />, {});

  const logoutButtonText = screen.getByText(/logout/i);
  expect(logoutButtonText).toBeInTheDocument();
});
