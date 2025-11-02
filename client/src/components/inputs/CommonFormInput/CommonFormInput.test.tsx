import React, { createRef } from 'react';
import { render, screen } from '../../../utils/testing-library-utils';
import CommonFormInput from './CommonFormInput';

test('render Common Form Input', () => {
  const testRef = createRef();
  const TEST_VALUE = 'testvalue';

  render(
    <CommonFormInput
      inputType='text'
      inputRef={testRef as React.RefObject<HTMLInputElement>}
      onChangeHandler={vitest.fn()}
    >
      {TEST_VALUE}
    </CommonFormInput>
  );

  const authPrimaryButtonInput = screen.getByPlaceholderText(TEST_VALUE);
  expect(authPrimaryButtonInput).toBeInTheDocument();
});
