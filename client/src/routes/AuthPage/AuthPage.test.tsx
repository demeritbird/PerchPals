import SnackbarProvider from '@/contexts/SnackbarProvider';
import { render, screen } from '../../utils/testing-library-utils';
import AuthPage from './AuthPage';

test('render label names for login and signup', () => {
  render(
    <SnackbarProvider>
      <AuthPage />
    </SnackbarProvider>
  );

  const loginTestText = screen.getByText(/log in/i);
  expect(loginTestText).toBeInTheDocument();

  const signupTestText = screen.getByText(/sign up/i);
  expect(signupTestText).toBeInTheDocument();
});
