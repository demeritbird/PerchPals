import { fireEvent, render, screen, waitFor } from '../../../../utils/testing-library-utils';
import LoginPanel from './LoginPanel';
import inputStyles from '@/components/inputs/CommonFormInput/CommonFormInput.module.scss';
import btnStyles from '@/components/buttons/CommonButton/CommonButton.module.scss';
import SnackbarProvider from '@/contexts/SnackbarProvider';

const setup = () => {
  render(
    <SnackbarProvider>
      <LoginPanel setCurrentRegistrationHandler={vitest.fn()} />
    </SnackbarProvider>
  );
  const inputContainer = screen.getAllByTestId('input-container');
  const emailInput = screen.getByLabelText('email');
  const passwordInput = screen.getByLabelText('password');
  const logInBtn = screen.getByRole('button', { name: /Log In/i });

  return {
    inputContainer,
    emailInput,
    passwordInput,
    logInBtn,
  };
};

test('correct login credential', async () => {
  const { inputContainer, emailInput, passwordInput, logInBtn } = setup();
  expect(logInBtn).toHaveClass(btnStyles['btn--primary']);

  fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'test1234' } });
  fireEvent.click(logInBtn);

  // check if elements is still same color
  await waitFor(() => {
    for (const input of inputContainer) {
      expect(input).toHaveClass(inputStyles['container--active']);
    }
  });
  await waitFor(() => {
    expect(logInBtn).toHaveClass(btnStyles['btn--primary']);
  });
});

test('incorrect login credentials and client reject', async () => {
  const { inputContainer, emailInput, passwordInput, logInBtn } = setup();
  fireEvent.change(emailInput, { target: { value: 'admin.example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'test1234' } });
  fireEvent.click(logInBtn);

  // check if elements is in error state and has changed bgColor to red
  await waitFor(() => {
    for (const input of inputContainer) {
      expect(input).toHaveClass(inputStyles['container--error']);
    }
  });
  await waitFor(() => {
    expect(logInBtn).toHaveClass(btnStyles['btn--error']);
  });
});

test('incorrect login credentials and server reject', async () => {
  const { inputContainer, emailInput, passwordInput, logInBtn } = setup();
  fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
  fireEvent.click(logInBtn);

  // check if elements is in error state and has changed bgColor to red
  await waitFor(() => {
    for (const input of inputContainer) {
      expect(input).toHaveClass(inputStyles['container--error']);
    }
  });
  await waitFor(() => {
    expect(logInBtn).toHaveClass(btnStyles['btn--error']);
  });
});

test('attempting to retry validation should reset form input and button state', async () => {
  const { inputContainer, emailInput, passwordInput, logInBtn } = setup();

  // get error state first
  fireEvent.change(emailInput, { target: { value: 'wrong' } });
  fireEvent.change(passwordInput, { target: { value: 'wrong' } });
  fireEvent.click(logInBtn);

  // now if i input something new it should go back to primary color
  fireEvent.change(passwordInput, { target: { value: 'test1234' } });
  for (const input of inputContainer) {
    await waitFor(() => {
      expect(input).toHaveClass(inputStyles['container--active']);
    });
  }
  await waitFor(() => {
    expect(logInBtn).toHaveClass(btnStyles['btn--primary']);
  });
});
