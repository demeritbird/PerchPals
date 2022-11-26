import React, { Fragment, ChangeEventHandler } from 'react';

interface AuthFormInputProps {
  children: string;
  id: string;
  inputType: 'text' | 'email' | 'password';
  inputRef: React.RefObject<HTMLInputElement>;
  onChangeHandler: ChangeEventHandler<HTMLInputElement>;
}

function AuthFormInput(props: AuthFormInputProps) {
  const { children: labelName, id, inputType, inputRef, onChangeHandler } = props;

  return (
    <Fragment>
      <label htmlFor={id}>{labelName}</label>
      <input
        type={inputType}
        id={id}
        ref={inputRef}
        onChange={onChangeHandler}
        autoComplete='off'
        required
      />
    </Fragment>
  );
}

export default AuthFormInput;
