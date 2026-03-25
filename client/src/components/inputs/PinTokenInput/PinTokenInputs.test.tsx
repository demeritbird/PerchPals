import React from 'react';
import { fireEvent, render, screen, waitFor } from '../../../utils/testing-library-utils';
import PinTokenInputs from './PinTokenInputs';
import inputStyles from './PintokenInputs.module.scss';

// detached from main component for additional confirmation
const TOKEN_MAX_LENGTH = 6;

const setup = ({ isError } = { isError: false }) => {
  const RenderedComponent = ({ error } = { error: false }) => {
    const [token, setToken] = React.useState('');

    return (
      <PinTokenInputs
        token={token}
        setToken={setToken}
        isError={error}
        onChangeHandler={vitest.fn()}
      />
    );
  };
  render(<RenderedComponent error={isError} />);

  const inputs = screen.getAllByRole('textbox'); // all inputs
  return { inputs };
};

test('display correct input default neutral state', async () => {
  const { inputs } = setup();

  for (const input of inputs) {
    await waitFor(() => {
      // correct neutral color
      expect(input).toHaveClass(inputStyles['input--grey']);
    });
    await waitFor(() => {
      // no initial content
      expect(input).toHaveTextContent('');
    });
  }
});

test('correct inputs are focused when user clicks into inputs', async () => {
  const { inputs } = setup();

  // clicking at start, should focus on first input
  inputs[0].focus();
  await waitFor(() => {
    expect(inputs[0]).toHaveFocus();
  });
  // clicking at a different starting point should redirect
  // focus to correct focus point that is first input
  inputs[TOKEN_MAX_LENGTH - 1].focus();
  await waitFor(() => {
    expect(inputs[0]).toHaveFocus();
  });
  await waitFor(() => {
    expect(inputs[TOKEN_MAX_LENGTH - 1]).not.toHaveFocus();
  });
});

test('correct inputs are filled when user types into inputs', async () => {
  const { inputs } = setup();

  // writing into input should change its current style and should focus next
  fireEvent.change(inputs[0], { target: { value: '0' } });
  await waitFor(() => {
    expect(inputs[0]).toHaveClass(inputStyles['input--primary']);
  });
  await waitFor(() => {
    expect(inputs[0]).toHaveClass(inputStyles['input--fill']);
  });
  await waitFor(() => {
    expect(inputs[1]).toHaveFocus();
  });
  await waitFor(() => {
    // only inputs with content have this class.
    expect(inputs[1]).not.toHaveClass(inputStyles['input--fill']);
  });
});

test('correct inputs are emptied and un-focused when user deletes from inputs', async () => {
  const { inputs } = setup();

  // writing into input should change its current style and should focus next
  fireEvent.change(inputs[0], { target: { value: '0' } });
  fireEvent.change(inputs[1], { target: { value: '1' } });
  fireEvent.keyDown(inputs[2], { key: 'Backspace', code: 'Backspace', charCode: 8 });

  await waitFor(() => {
    expect(inputs[0]).toHaveClass(inputStyles['input--primary']);
  });
  await waitFor(() => {
    expect(inputs[0]).toHaveClass(inputStyles['input--fill']);
  });
  await waitFor(() => {
    expect(inputs[1]).toHaveFocus();
  });
  await waitFor(() => {
    // only inputs with content have this class.
    expect(inputs[2]).not.toHaveClass(inputStyles['input--fill']);

    // TODO: to have the above but for inputs[1] as well.
  });
});

test('only last inputs are changed when user focuses on an earlier input', async () => {
  const { inputs } = setup();

  const INITIAL_INPUT = '1';
  const UPDATED_INPUT = '2';

  fireEvent.change(inputs[0], { target: { value: INITIAL_INPUT } });
  fireEvent.change(inputs[1], { target: { value: INITIAL_INPUT } });
  inputs[0].focus();
  // get current focused element and mock change text
  const focused = screen
    .getAllByRole('textbox')
    .find((input) => input.matches(':focus')) as Element;
  fireEvent.change(focused, { target: { value: UPDATED_INPUT } });

  // should be focused on input after last character
  await waitFor(() => {
    expect(inputs[2]).toHaveFocus();
  });
  // any change when focus is not on last character is made on
  // last character instead.
  await waitFor(() => {
    expect(inputs[1]).toHaveValue(UPDATED_INPUT);
  });
});

test('all inputs filled out when 6 characters are copied and pasted', async () => {
  const { inputs } = setup();

  const FIRST_SAMPLE_CLIPBOARD_TEXT = 'alyssa';
  const SECOND_SAMPLE_CLIPBOARD_TEXT = 'wolfey';

  // paste on first input
  fireEvent.paste(inputs[0], {
    clipboardData: { getData: () => FIRST_SAMPLE_CLIPBOARD_TEXT },
  });
  await waitFor(() => {
    expect(inputs[3]).toHaveValue('s');
  });
  // paste on non-first input
  fireEvent.paste(inputs[3], {
    clipboardData: { getData: () => SECOND_SAMPLE_CLIPBOARD_TEXT },
  });
  await waitFor(() => {
    // value should have changed as well
    expect(inputs[3]).toHaveValue('f');
  });
});

test('nothing happens when NOT 6 characters are copied and pasted', async () => {
  const { inputs } = setup();

  const SAMPLE_OVERFLOW_CLIPBOARD_TEXT = 'demeritbird';

  fireEvent.paste(inputs[0], {
    clipboardData: { getData: () => SAMPLE_OVERFLOW_CLIPBOARD_TEXT },
  });
  await waitFor(() => {
    expect(inputs[3]).toHaveValue('e');
  });
  // last character should just be the 6th character of the pasted string
  await waitFor(() => {
    expect(inputs[5]).toHaveValue('i');
  });
});

test('error state causes inputs to change color', async () => {
  const { inputs } = setup({ isError: true });

  for (const input of inputs) {
    await waitFor(() => {
      expect(input).toHaveClass(inputStyles['input--red']);
    });
  }
});
