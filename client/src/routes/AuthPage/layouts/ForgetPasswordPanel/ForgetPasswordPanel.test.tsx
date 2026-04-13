import { fireEvent, render, screen, waitFor } from '../../../../utils/testing-library-utils';
import ForgetPasswordPanel from './ForgetPasswordPanel';
import inputStyles from '@/components/inputs/CommonFormInput/CommonFormInput.module.scss';
import btnStyles from '@/components/buttons/CommonButton/CommonButton.module.scss';
import SnackbarProvider from '@/contexts/SnackbarProvider';

const setup = () => {
  render(
    <SnackbarProvider>
      <ForgetPasswordPanel setCurrentRegistrationHandler={vitest.fn()} />
    </SnackbarProvider>
  );

  const inputContainer = screen.getAllByTestId('input-container');
  const emailInput = screen.getByLabelText('email');
  const forgetPasswordBtn = screen.getByRole('button', { name: /Recover Account/i });

  return {
    inputContainer,
    emailInput,
    forgetPasswordBtn,
  };
};

test('correct email used for forget password', async () => {
  const { inputContainer, emailInput, forgetPasswordBtn } = setup();
  expect(forgetPasswordBtn).toHaveClass(btnStyles['btn--primary']);

  fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
  fireEvent.click(forgetPasswordBtn);

  // check if elements is still same color
  await waitFor(() => {
    for (const input of inputContainer) {
      expect(input).toHaveClass(inputStyles['container--active']);
    }
  });
  await waitFor(() => {
    expect(forgetPasswordBtn).toHaveClass(btnStyles['btn--primary']);
  });
});

test('incorrect email and client reject', async () => {
  const { inputContainer, emailInput, forgetPasswordBtn } = setup();
  fireEvent.change(emailInput, { target: { value: 'admin.example.com' } });
  fireEvent.click(forgetPasswordBtn);

  // check if elements is in error state and has changed bgColor to red
  await waitFor(() => {
    for (const input of inputContainer) {
      expect(input).toHaveClass(inputStyles['container--error']);
    }
  });
  await waitFor(() => {
    expect(forgetPasswordBtn).toHaveClass(btnStyles['btn--error']);
  });
});

test('incorrect email and server reject', async () => {
  const { inputContainer, emailInput, forgetPasswordBtn } = setup();
  fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
  fireEvent.click(forgetPasswordBtn);

  // check if elements is in error state and has changed bgColor to red
  await waitFor(() => {
    for (const input of inputContainer) {
      expect(input).toHaveClass(inputStyles['container--error']);
    }
  });
  await waitFor(() => {
    expect(forgetPasswordBtn).toHaveClass(btnStyles['btn--error']);
  });
});

test('attempting to retry validation should reset form input and button state', async () => {
  const { inputContainer, emailInput, forgetPasswordBtn } = setup();

  // get error state first
  fireEvent.change(emailInput, { target: { value: 'wrong@wrong.com' } });
  fireEvent.click(forgetPasswordBtn);

  // now if i input something new it should go back to primary color
  fireEvent.change(emailInput, { value: 'admin@example.com' });

  await waitFor(() => {
    for (const input of inputContainer) {
      expect(input).toHaveClass(inputStyles['container--active']);
    }
  });
  await waitFor(() => {
    expect(forgetPasswordBtn).toHaveClass(btnStyles['btn--primary']);
  });
});
