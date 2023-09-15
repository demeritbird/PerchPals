import { render, screen } from '../../../../utils/testing-library-utils';
import SignupPanel from './SignupPanel';

test('render label names for signup', () => {
  render(<SignupPanel />);

  const signupTestText = screen.getByText(/sign up/i);
  expect(signupTestText).toBeInTheDocument();
});
