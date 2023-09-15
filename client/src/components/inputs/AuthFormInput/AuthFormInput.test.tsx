import React, { createRef } from 'react';
import { render, screen } from '../../../utils/testing-library-utils';
import AuthFormInput from './AuthFormInput';

test('render authform input', () => {
  const testRef = createRef();
  const TEST_VALUE = 'testvalue';

  render(
    <AuthFormInput
      id='testId'
      inputType='text'
      inputRef={testRef as React.RefObject<HTMLInputElement>}
      onChangeHandler={vitest.fn()}
    >
      {TEST_VALUE}
    </AuthFormInput>
  );

  const authPrimaryButtonInput = screen.getByPlaceholderText(TEST_VALUE);
  expect(authPrimaryButtonInput).toBeInTheDocument();
});
