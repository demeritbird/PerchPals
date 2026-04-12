import { fireEvent, render, screen, waitFor } from '../../../../utils/testing-library-utils';
import SignupPanel from './SignupPanel';
import inputStyles from '@/components/inputs/CommonFormInput/CommonFormInput.module.scss';
import btnStyles from '@/components/buttons/CommonButton/CommonButton.module.scss';
import SnackbarProvider from '@/contexts/SnackbarProvider';

const setup = () => {
  render(
    <SnackbarProvider>
      <SignupPanel setCurrentRegistrationHandler={vitest.fn()} />
    </SnackbarProvider>
  );
  const inputContainer = screen.getAllByTestId('input-container');
  const emailInput = screen.getByLabelText('email');
  const usernameInput = screen.getByLabelText('username');
  const passwordInput = screen.getByLabelText('password');
  const passwordConfirmInput = screen.getByLabelText('confirm password');
  const signupBtn = screen.getByRole('button', { name: /Sign Up/i });

  return {
    inputContainer,
    emailInput,
    usernameInput,
    passwordInput,
    passwordConfirmInput,
    signupBtn,
  };
};

test('correct signup credential', async () => {
  const {
    inputContainer,
    emailInput,
    usernameInput,
    passwordInput,
    passwordConfirmInput,
    signupBtn,
  } = setup();
  expect(signupBtn).toHaveClass(btnStyles['btn--primary']);

  // valid credentials
  fireEvent.change(emailInput, { target: { value: 'newuser@example.com' } });
  fireEvent.change(usernameInput, { target: { value: 'newuser' } });
  fireEvent.change(passwordInput, { target: { value: 'test1234' } });
  fireEvent.change(passwordConfirmInput, { target: { value: 'test1234' } });
  fireEvent.click(signupBtn);

  // check if elements is still same color
  await waitFor(() => {
    for (const input of inputContainer) {
      expect(input).toHaveClass(inputStyles['container--active']);
    }
  });
  await waitFor(() => {
    expect(signupBtn).toHaveClass(btnStyles['btn--primary']);
  });
});

test('incorrect signup credential - password inputs are not the same', async () => {
  const {
    inputContainer,
    emailInput,
    usernameInput,
    passwordInput,
    passwordConfirmInput,
    signupBtn,
  } = setup();
  expect(signupBtn).toHaveClass(btnStyles['btn--primary']);

  fireEvent.change(emailInput, { target: { value: 'newuser@example.com' } });
  fireEvent.change(usernameInput, { target: { value: 'newuser' } });
  // password and confirmPassword fields are not the same
  fireEvent.change(passwordInput, { target: { value: 'test1234' } });
  fireEvent.change(passwordConfirmInput, { target: { value: 'notTheSamePassword' } });
  fireEvent.click(signupBtn);

  await waitFor(() => {
    for (const input of inputContainer) {
      expect(input).toHaveClass(inputStyles['container--error']);
    }
  });
  await waitFor(() => {
    expect(signupBtn).toHaveClass(btnStyles['btn--error']);
  });
});

test('incorrect signup credential - invalid password length condition', async () => {
  const {
    inputContainer,
    emailInput,
    usernameInput,
    passwordInput,
    passwordConfirmInput,
    signupBtn,
  } = setup();
  expect(signupBtn).toHaveClass(btnStyles['btn--primary']);

  fireEvent.change(emailInput, { target: { value: 'newuser@example.com' } });
  fireEvent.change(usernameInput, { target: { value: 'newuser' } });
  // password and confirmPassword fields are not the same
  fireEvent.change(passwordInput, { target: { value: 'test' } });
  fireEvent.change(passwordConfirmInput, { target: { value: 'test' } });
  fireEvent.click(signupBtn);

  await waitFor(() => {
    for (const input of inputContainer) {
      expect(input).toHaveClass(inputStyles['container--error']);
    }
  });
  await waitFor(() => {
    expect(signupBtn).toHaveClass(btnStyles['btn--error']);
  });
});

test('incorrect signup credential - invalid email input', async () => {
  const {
    inputContainer,
    emailInput,
    usernameInput,
    passwordInput,
    passwordConfirmInput,
    signupBtn,
  } = setup();
  expect(signupBtn).toHaveClass(btnStyles['btn--primary']);

  // invalid email, does not have '@'
  fireEvent.change(emailInput, { target: { value: 'newuserexample.com' } });
  fireEvent.change(usernameInput, { target: { value: 'newuser' } });
  fireEvent.change(passwordInput, { target: { value: 'test' } });
  fireEvent.change(passwordConfirmInput, { target: { value: 'test' } });
  fireEvent.click(signupBtn);

  await waitFor(() => {
    for (const input of inputContainer) {
      expect(input).toHaveClass(inputStyles['container--error']);
    }
  });
  await waitFor(() => {
    expect(signupBtn).toHaveClass(btnStyles['btn--error']);
  });
});

test('attempting to retry validation should reset form input and button state', async () => {
  const {
    inputContainer,
    emailInput,
    usernameInput,
    passwordInput,
    passwordConfirmInput,
    signupBtn,
  } = setup();
  expect(signupBtn).toHaveClass(btnStyles['btn--primary']);

  // invalid email, does not have '@'
  fireEvent.change(emailInput, { target: { value: 'newuserexample.com' } });
  fireEvent.change(usernameInput, { target: { value: 'newuser' } });
  fireEvent.change(passwordInput, { target: { value: 'wrong' } });
  fireEvent.change(passwordConfirmInput, { target: { value: 'wrong' } });
  fireEvent.click(signupBtn);

  // now if i input something new it should go back to primary color
  fireEvent.change(passwordInput, { target: { value: 'test1234' } });
  await waitFor(() => {
    for (const input of inputContainer) {
      // either primary or inactive as password / confirmPassword fields are emptied
      expect(input).not.toHaveClass(inputStyles['container--error']);
    }
  });
  await waitFor(() => {
    expect(signupBtn).toHaveClass(btnStyles['btn--primary']);
  });
});
