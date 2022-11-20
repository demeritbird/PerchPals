import { render, screen } from '../../utils/testing-library-utils';
import EntryPage from './EntryPage';

test('render label names for login and signup', () => {
  render(<EntryPage />);

  const loginTestText = screen.getByText(/log in/i);
  expect(loginTestText).toBeInTheDocument();

  const signupTestText = screen.getByText(/sign up/i);
  expect(signupTestText).toBeInTheDocument();
});
