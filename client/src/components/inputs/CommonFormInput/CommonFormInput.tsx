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

/**
 * @desc
 * reusable input with different states
 *
 * @param {string} props.children placeholder shown in input
 * @param {boolean} props.showBackground shows white background when toggled on
 * @param {boolean} props.isError triggers error state of input (red styling) when toggled on
 * @param {React.ComponentType<IconProps>} props.icon placeholder shown in input
 * @param {React.RefObject<HTMLInputElement>} props.inputRef ref obj attached to input
 * @param {'text' | 'email' | 'password'} props.inputType type of input
 * @param {ChangeEventHandler<HTMLInputElement>} props.ChangeEventHandler
 * ref of function passed from parent to listen to any changes in component
 *
 * @example
 * const emailInputRef = useRef<HTMLInputElement>(null);
 * ...
 * <CommonFormInput
     icon={EmailIcon}
     inputType='email'
     inputRef={emailInputRef}
     showBackground={true}
     onChangeHandler={() => {}}
    >
    Email
   </CommonFormInput>
 */
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

  /**
   * @returns current state of input
   */
  function getInputStatus(): InputStatus {
    if (isInputActive || (inputRefCurrent && inputRefCurrent.value.length > 0))
      return InputStatus.ACTIVE;
    if (isError) return InputStatus.ERROR;
    return InputStatus.INACTIVE;
  }

  /**
   * @returns icon colour based on current state of input
   */
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
