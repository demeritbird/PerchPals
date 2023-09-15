import { render, screen } from '../../../../utils/testing-library-utils';
import LoginPanel from './LoginPanel';

test('render label names for signup', () => {
  render(<LoginPanel />);

  const loginTestText = screen.getByText(/log in/i);
  expect(loginTestText).toBeInTheDocument();
});
