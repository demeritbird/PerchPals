import React, { Fragment, ChangeEventHandler, useState } from 'react';

import EmailIcon from '../../icons/EmailIcon';
import UserIcon from '../../icons/UserIcon';
import KeyIcon from '../../icons/KeyIcon';

import styles from './AuthFormInput.module.scss';

interface AuthFormInputProps {
  children: string;
  id: string;
  inputType: 'text' | 'email' | 'password';
  inputRef: React.RefObject<HTMLInputElement>;
  onChangeHandler: ChangeEventHandler<HTMLInputElement>;
}

function AuthFormInput(props: AuthFormInputProps) {
  const { children: labelName, id, inputType, inputRef, onChangeHandler } = props;

  const [isInputActive, setIsInputActive] = useState<boolean>(false);
  const inputRefCurrent = inputRef.current;

  function onFocusHandler() {
    setIsInputActive(true);
  }

  function onBlurHandler() {
    setIsInputActive(false);
  }

  const userIcon: JSX.Element = (
    <UserIcon
      size='medium'
      type='fill'
      colour={
        isInputActive || (inputRefCurrent && inputRefCurrent.value.length > 0)
          ? 'grey-dark'
          : 'grey-light'
      }
    />
  );
  const emailIcon: JSX.Element = (
    <EmailIcon
      size='medium'
      type='fill'
      colour={
        isInputActive || (inputRefCurrent && inputRefCurrent.value.length > 0)
          ? 'grey-dark'
          : 'grey-light'
      }
    />
  );
  const passwordIcon: JSX.Element = (
    <KeyIcon
      size='medium'
      type='fill'
      colour={
        isInputActive || (inputRefCurrent && inputRefCurrent.value.length > 0)
          ? 'grey-dark'
          : 'grey-light'
      }
    />
  );

  const iconState = {
    text: userIcon,
    email: emailIcon,
    password: passwordIcon,
  };

  return (
    <div>
      <div
        className={`${styles.container} u-margin-btm-small
                    ${
                      isInputActive || (inputRefCurrent && inputRefCurrent.value.length > 0)
                        ? styles['container--active']
                        : styles['container--inactive']
                    }`}
      >
        <div className={styles.container__icon}>
          <Fragment>{iconState[inputType]}</Fragment>
        </div>
        <div className={styles.container__input}>
          <input
            className={`${styles.container__input} ${styles['input-text']}`}
            placeholder={labelName}
            type={inputType}
            id={id}
            ref={inputRef}
            onChange={onChangeHandler}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            autoComplete='off'
            required
          />
        </div>
      </div>
    </div>
  );
}

export default AuthFormInput;
