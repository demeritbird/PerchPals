import React, { createRef } from 'react';
import { render, screen } from '../../../utils/testing-library-utils';
import AuthFormInput from './AuthFormInput';

test('render authform input', () => {
  const testRef = createRef();

  render(
    <AuthFormInput
      id='testId'
      inputType='text'
      inputRef={testRef as React.RefObject<HTMLInputElement>}
      onChangeHandler={vitest.fn()}
    >
      testvalue
    </AuthFormInput>,
    {}
  );

  const authPrimaryButtonInput = screen.getByLabelText('testvalue');
  expect(authPrimaryButtonInput).toBeInTheDocument();
});
