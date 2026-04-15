import { fireEvent, render, screen, waitFor } from '../../../../utils/testing-library-utils';
import ResetPasswordPanel from './ResetPasswordPanel';
import inputStyles from '@/components/inputs/CommonFormInput/CommonFormInput.module.scss';
import btnStyles from '@/components/buttons/CommonButton/CommonButton.module.scss';
import SnackbarProvider from '@/contexts/SnackbarProvider';

const setup = () => {
  render(
    <SnackbarProvider>
      <ResetPasswordPanel setCurrentRegistrationHandler={vitest.fn()} />
    </SnackbarProvider>
  );

  const inputContainer = screen.getAllByTestId('input-container');
  const passwordInput = screen.getByLabelText('password');
  const passwordConfirmInput = screen.getByLabelText('confirm password');
  const resetPasswordBtn = screen.getByRole('button', { name: /Reset Password/i });

  return {
    inputContainer,
    passwordInput,
    passwordConfirmInput,
    resetPasswordBtn: resetPasswordBtn,
  };
};

test('correct email used for reset password', async () => {
  const { inputContainer, passwordInput, passwordConfirmInput, resetPasswordBtn } = setup();
  expect(resetPasswordBtn).toHaveClass(btnStyles['btn--primary']);

  fireEvent.change(passwordInput, { target: { value: 'password' } });
  fireEvent.change(passwordConfirmInput, { target: { value: 'password' } });
  fireEvent.click(resetPasswordBtn);

  // check if elements is still same color
  await waitFor(() => {
    for (const input of inputContainer) {
      expect(input).toHaveClass(inputStyles['container--active']);
    }
  });
  await waitFor(() => {
    expect(resetPasswordBtn).toHaveClass(btnStyles['btn--primary']);
  });
});

test('invalid password and client reject', async () => {
  const { inputContainer, passwordInput, passwordConfirmInput, resetPasswordBtn } = setup();
  fireEvent.change(passwordInput, { target: { value: 'pass' } }); // too short, need 8 characters
  fireEvent.change(passwordConfirmInput, { target: { value: 'pass' } });
  fireEvent.click(resetPasswordBtn);

  // check if elements is in error state and has changed bgColor to red
  await waitFor(() => {
    for (const input of inputContainer) {
      expect(input).toHaveClass(inputStyles['container--error']);
    }
  });
  await waitFor(() => {
    expect(resetPasswordBtn).toHaveClass(btnStyles['btn--error']);
  });
});

test('password and passwordConfirm are not the same and client reject', async () => {
  const { inputContainer, passwordInput, passwordConfirmInput, resetPasswordBtn } = setup();
  fireEvent.change(passwordInput, { target: { value: 'password' } });
  fireEvent.change(passwordConfirmInput, { target: { value: 'wrongpassword' } });
  fireEvent.click(resetPasswordBtn);

  // check if elements is in error state and has changed bgColor to red
  await waitFor(() => {
    for (const input of inputContainer) {
      expect(input).toHaveClass(inputStyles['container--error']);
    }
  });
  await waitFor(() => {
    expect(resetPasswordBtn).toHaveClass(btnStyles['btn--error']);
  });
});

test('attempting to retry validation should reset form input and button state', async () => {
  const { inputContainer, passwordInput, passwordConfirmInput, resetPasswordBtn } = setup();

  // get error state first
  fireEvent.change(passwordInput, { target: { value: 'password' } });
  fireEvent.change(passwordConfirmInput, { target: { value: 'wrongpassword' } });
  fireEvent.click(resetPasswordBtn);

  // now if i input something new it should go back to primary color
  fireEvent.change(passwordConfirmInput, { target: { value: 'password' } });

  await waitFor(() => {
    for (const input of inputContainer) {
      expect(input).toHaveClass(inputStyles['container--active']);
    }
  });
  await waitFor(() => {
    expect(resetPasswordBtn).toHaveClass(btnStyles['btn--primary']);
  });
});
