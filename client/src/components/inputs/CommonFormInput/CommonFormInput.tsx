import React, { Fragment, ChangeEventHandler, useState, ReactElement } from 'react';
import styles from './CommonFormInput.module.scss';
import { IconColour, IconProps } from 'src/components/icons/IconWrapper';

interface CommonFormInputProps {
  children: string;
  showBackground?: boolean;
  isError?: boolean;
  icon?: React.ComponentType<IconProps>;
  inputRef: React.RefObject<HTMLInputElement>;
  inputType: 'text' | 'email' | 'password';
  onChangeHandler: ChangeEventHandler<HTMLInputElement>;
}

enum InputStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ERROR = 'error',
}

function CommonFormInput(props: CommonFormInputProps) {
  const {
    children: placeholder,
    showBackground,
    isError = false,
    icon: Icon,
    inputRef,
    inputType,
    onChangeHandler,
  } = props;

  const [isInputActive, setIsInputActive] = useState<boolean>(false);
  const inputRefCurrent = inputRef.current;

  function onFocusHandler(bool: boolean): void {
    setIsInputActive(bool);
  }

  function getInputStatus(): InputStatus {
    if (isInputActive || (inputRefCurrent && inputRefCurrent.value.length > 0))
      return InputStatus.ACTIVE;
    if (isError) return InputStatus.ERROR;
    return InputStatus.INACTIVE;
  }

  function getIconColour(): IconColour {
    const status: InputStatus = getInputStatus();

    switch (status) {
      case InputStatus.ACTIVE:
        return 'primary';
      case InputStatus.INACTIVE:
        return 'grey';
      case InputStatus.ERROR:
        return 'error';
      default:
        return 'primary';
    }
  }

  return (
    <div
      data-testid='container'
      className={`${styles.container} ${showBackground && styles['container__background']}
                  ${styles[`container--${getInputStatus()}`]}`}
    >
      <Fragment>
        {Icon && <Icon size='sm' type='fill' colour={getIconColour()}></Icon>}
      </Fragment>
      <input
        className={`${styles.input} ${styles['input__text']} ${styles['body-1']}`}
        placeholder={placeholder}
        type={inputType}
        ref={inputRef}
        onChange={onChangeHandler}
        onFocus={() => onFocusHandler(true)}
        onBlur={() => onFocusHandler(false)}
        autoComplete='off'
        required
      />
    </div>
  );
}

export default CommonFormInput;
