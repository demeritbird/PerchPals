import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EntryPage from './EntryPage';

test('render label names for login and signup', () => {
  render(<EntryPage />, { wrapper: BrowserRouter });

  const loginTestText = screen.getByText(/log in/i);
  expect(loginTestText).toBeInTheDocument();

  const signupTestText = screen.getByText(/sign up/i);
  expect(signupTestText).toBeInTheDocument();
});
