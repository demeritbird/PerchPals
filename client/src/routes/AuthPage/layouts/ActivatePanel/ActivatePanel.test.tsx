import { fireEvent, logRoles, render, screen, waitFor } from '@/utils/testing-library-utils';
import ActivatePanel from './ActivatePanel';
import inputStyles from '@/components/inputs/PinTokenInput/PintokenInputs.module.scss';
import btnStyles from '@/components/buttons/CommonButton/CommonButton.module.scss';
import AuthContext from '@/contexts/AuthProvider';
import { AccountStatus, UserRoles } from '@backend/types';

const setup = () => {
  render(
    <AuthContext.Provider
      value={{
        authUser: {
          id: '123',
          email: 'newuser@example.com',
          name: 'newuser',
          photo: 'default-user-base64.jpeg',
          role: UserRoles.USER,
          token: 'token',
          active: AccountStatus.PENDING,
        },
        setAuthUser: vi.fn(),
        persist: 'true',
        setPersist: vi.fn(),
      }}
    >
      <ActivatePanel setCurrentRegistrationHandler={vitest.fn()} />
    </AuthContext.Provider>
  );
  const inputs = screen.getAllByRole('textbox');
  const confirmActivateBtn = screen.getByRole('button', { name: /Verify Account/i });

  return {
    inputs,
    confirmActivateBtn,
  };
};

test('correct activation token provided', async () => {
  const { inputs, confirmActivateBtn } = setup();

  fireEvent.change(inputs[0], { target: { value: 'a' } });
  fireEvent.change(inputs[1], { target: { value: 'l' } });
  fireEvent.change(inputs[2], { target: { value: 'y' } });
  fireEvent.change(inputs[3], { target: { value: 's' } });
  fireEvent.change(inputs[4], { target: { value: 's' } });
  fireEvent.change(inputs[5], { target: { value: 'a' } });

  // check if elements is still same color after input
  for (const input of inputs) {
    await waitFor(() => {
      expect(input).toHaveClass(inputStyles['input--primary']);
    });
  }

  fireEvent.click(confirmActivateBtn);
  // check if elements is still same color after mock api
  for (const input of inputs) {
    await waitFor(() => {
      expect(input).toHaveClass(inputStyles['input--primary']);
    });
  }
  expect(confirmActivateBtn).toHaveClass(btnStyles['btn--primary']);
});

test('incorrect activation token provided', async () => {
  const { inputs, confirmActivateBtn } = setup();

  fireEvent.change(inputs[0], { target: { value: 'w' } });
  fireEvent.change(inputs[1], { target: { value: 'r' } });
  fireEvent.change(inputs[2], { target: { value: 'o' } });
  fireEvent.change(inputs[3], { target: { value: 'n' } });
  fireEvent.change(inputs[4], { target: { value: 'g' } });
  fireEvent.change(inputs[5], { target: { value: 'g' } });

  // check if elements is still same color after input

  await waitFor(() => {
    for (const input of inputs) {
      expect(input).toHaveClass(inputStyles['input--primary']);
    }
  });
  fireEvent.click(confirmActivateBtn);
  // check if elements change color to error state once btn clicked
  await waitFor(() => {
    for (const input of inputs) {
      expect(input).toHaveClass(inputStyles['input--red']);
    }
  });
});

test('reset pin token input states once new changes are made', async () => {
  const { inputs, confirmActivateBtn } = setup();

  fireEvent.change(inputs[0], { target: { value: 'w' } });
  fireEvent.change(inputs[1], { target: { value: 'r' } });
  fireEvent.change(inputs[2], { target: { value: 'o' } });
  fireEvent.change(inputs[3], { target: { value: 'n' } });
  fireEvent.change(inputs[4], { target: { value: 'g' } });
  fireEvent.change(inputs[5], { target: { value: 'g' } });

  fireEvent.click(confirmActivateBtn);
  // new input was made, that should change the state of input to default
  inputs[4].focus();
  fireEvent.input(inputs[4], { target: { value: 'a' } });
  fireEvent.keyUp(inputs[4], { key: 'a', code: 'KeyA' });
  fireEvent.change(inputs[4], { target: { value: 'a' } });

  await waitFor(() => {
    inputs.forEach((input) => {
      expect(input).toHaveClass(inputStyles['input--primary']);
    });
  });
  // FIXME: I should not have to click the btn to have it return to original state
  fireEvent.click(confirmActivateBtn);
  await waitFor(() => {
    expect(confirmActivateBtn).toHaveClass(btnStyles['btn--primary']);
  });
});
