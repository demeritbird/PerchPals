import { render, screen } from '../../../../utils/testing-library-utils';
import SignupPanel from './SignupPanel';

test('render label names for signup', () => {
  render(<SignupPanel setCurrentRegistrationHandler={vitest.fn()} />);

  const signupTestText = screen.getByText(/sign up/i);
  expect(signupTestText).toBeInTheDocument();
});

test('correct sign in', async () => {});
