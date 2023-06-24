import { render, screen } from '../../../../utils/testing-library-utils';
import LoginForm from './LoginForm';

test('render label names for signup', () => {
  render(<LoginForm />);

  const loginTestText = screen.getByText(/log in/i);
  expect(loginTestText).toBeInTheDocument();
});
