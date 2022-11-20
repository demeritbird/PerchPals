import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
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
    { wrapper: BrowserRouter }
  );

  const authButtonInput = screen.getByLabelText('testvalue');
  expect(authButtonInput).toBeInTheDocument();
});
