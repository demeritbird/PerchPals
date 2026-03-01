import React, { Fragment, ChangeEventHandler, useState } from 'react';
import styles from './CommonFormInput.module.scss';
import { IconColor, IconProps } from 'src/components/icons/IconWrapper';
import { Status } from 'src/utils/types';
import EyeOpenIcon from 'src/components/icons/EyeOpenIcon';
import EyeCloseIcon from 'src/components/icons/EyeCloseIcon';

interface CommonFormInputProps {
  children: string;
  showBackground?: boolean;
  isError?: boolean;
  icon?: React.ComponentType<IconProps>;
  inputRef: React.RefObject<HTMLInputElement>;
  inputType: 'text' | 'password';
  onChangeHandler: ChangeEventHandler<HTMLInputElement>;
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
     inputType='text'
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
  const [visibilityToggleValue, setVisibilityToggleValue] = useState<boolean>(false);
  const inputRefCurrent = inputRef.current;

  const isShowInputValue = (): boolean => {
    return !(inputType === 'password' && !visibilityToggleValue);
  };

  function onFocusHandler(bool: boolean): void {
    setIsInputActive(bool);
  }

  /**
   * @returns current state of input
   */
  function getInputStatus(): Status {
    if (isError) return Status.ERROR;
    if (isInputActive || (inputRefCurrent && inputRefCurrent.value.length > 0))
      return Status.ACTIVE;

    return Status.INACTIVE;
  }

  /**
   * @returns icon colour based on current state of input
   */
  function getIconColour(): IconColor {
    const status: Status = getInputStatus();

    switch (status) {
      case Status.ACTIVE:
        return 'primary';
      case Status.INACTIVE:
        return 'grey';
      case Status.ERROR:
        return 'red';
      default:
        return 'primary';
    }
  }

  function toggleVisiblityValue(): void {
    setVisibilityToggleValue(!visibilityToggleValue);
  }

  return (
    <div
      data-testid='input-container'
      className={`${styles.container} ${showBackground && styles.container__background}
                  ${styles[`container--${getInputStatus()}`]}`}
    >
      <Fragment>
        {Icon && <Icon size='sm' type='fill' color={getIconColour()}></Icon>}
      </Fragment>
      <input
        aria-label={`${placeholder.toLowerCase()}`}
        className={`${styles.input} ${styles.input__text} ${styles['body-1']}`}
        placeholder={placeholder}
        type={isShowInputValue() ? 'text' : 'password'}
        ref={inputRef}
        onChange={onChangeHandler}
        onFocus={() => onFocusHandler(true)}
        onBlur={() => onFocusHandler(false)}
        autoComplete='off'
        required
      />
      {inputType === 'password' && (
        <div onClick={toggleVisiblityValue}>
          {isShowInputValue() ? (
            <EyeOpenIcon size='sm' type='fill' color='grey-light' hoverColor='grey' />
          ) : (
            <EyeCloseIcon size='sm' type='fill' color='grey-light' hoverColor='grey' />
          )}
        </div>
      )}
    </div>
  );
}

export default CommonFormInput;
