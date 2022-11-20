import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './LoginForm';

test('render label names for signup', () => {
  render(<LoginForm />, { wrapper: BrowserRouter });

  const loginTestText = screen.getByText(/log in/i);
  expect(loginTestText).toBeInTheDocument();
});
