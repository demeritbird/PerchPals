import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignupForm from './SignupForm';

test('render label names for signup', () => {
  render(<SignupForm />, { wrapper: BrowserRouter });

  const signupTestText = screen.getByText(/sign up/i);
  expect(signupTestText).toBeInTheDocument();
});
