import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuthButton from './AuthButton';

test('render label names for login and signup', () => {
  render(<AuthButton>test value</AuthButton>, { wrapper: BrowserRouter });

  const authButtonText = screen.getByText(/test value/i);
  expect(authButtonText).toBeInTheDocument();
});
