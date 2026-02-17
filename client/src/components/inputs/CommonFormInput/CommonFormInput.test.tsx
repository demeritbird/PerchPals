import React, { createRef } from 'react';
import { fireEvent, logRoles, render, screen } from '../../../utils/testing-library-utils';
import CommonFormInput from './CommonFormInput';
import KeyIcon from 'src/components/icons/KeyIcon';
import styles from './CommonFormInput.module.scss';
import iconStyles from 'src/components/icons/IconWrapper.module.scss';

const TEST_VALUE = 'testvalue';
const testRef = createRef();

describe('CommonFormInput', () => {
  test('input shows correct text', () => {
    render(
      <CommonFormInput
        inputType='text'
        inputRef={testRef as React.RefObject<HTMLInputElement>}
        onChangeHandler={vitest.fn()}
      >
        {TEST_VALUE}
      </CommonFormInput>
    );

    const input = screen.getByRole('textbox');
    const placeholder = screen.getByPlaceholderText(TEST_VALUE);
    expect(input).toBeInTheDocument();
    expect(placeholder).toBeInTheDocument();
    expect(screen.queryByTestId(/icon/i)).not.toBeInTheDocument();
  });

  test('input shows correct icon when specified', () => {
    render(
      <CommonFormInput
        icon={KeyIcon}
        inputType='text'
        inputRef={testRef as React.RefObject<HTMLInputElement>}
        onChangeHandler={vitest.fn()}
      >
        {TEST_VALUE}
      </CommonFormInput>
    );

    const icon = screen.getByTestId('icon');
    expect(icon).toHaveClass(iconStyles['icon--sm']);
  });

  test('input activates on click', () => {
    render(
      <CommonFormInput
        icon={KeyIcon}
        inputType='text'
        inputRef={testRef as React.RefObject<HTMLInputElement>}
        onChangeHandler={vitest.fn()}
      >
        {TEST_VALUE}
      </CommonFormInput>
    );

    const container = screen.getByTestId('container');
    const input = screen.getByRole('textbox');
    const icon = screen.getByTestId('icon');
    expect(icon).toHaveClass(iconStyles['icon--grey']);
    expect(container).toHaveClass(styles[`container--inactive`]);

    fireEvent.focusIn(input);
    expect(icon).toHaveClass(iconStyles['icon--primary']);
    expect(container).toHaveClass(styles[`container--active`]);
  });
});
