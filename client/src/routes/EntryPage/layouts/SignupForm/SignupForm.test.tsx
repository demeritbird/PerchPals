import { render, screen } from '../../../../utils/testing-library-utils';
import SignupForm from './SignupForm';

test('render label names for signup', () => {
  render(<SignupForm />);

  const signupTestText = screen.getByText(/sign up/i);
  expect(signupTestText).toBeInTheDocument();
});
