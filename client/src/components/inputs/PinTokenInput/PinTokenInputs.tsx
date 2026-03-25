import { ChangeEventHandler, useRef } from 'react';
import styles from './PintokenInputs.module.scss';
import { Status } from '@/utils/types';
import { IconColor } from '@/components/icons/IconWrapper';

interface PinTokenInputsProps {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  isError?: boolean;
  onChangeHandler: ChangeEventHandler<HTMLInputElement>;
}

const TOKEN_MAX_LENGTH = 6;
const ALPHA_NUMERIC_REG = /^[0-9a-zA-Z]$/;

/**
 * @desc
 * alphanumeric OTP-like input array
 *
 * @param {string} props.token current alphanumeric token value
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setToken
 * used to update current token value
 * @param {boolean} props.isError triggers error state of input (red styling) when toggled on
 * @param {ChangeEventHandler<HTMLInputElement>} props.ChangeEventHandler
 * ref of function passed from parent to listen to any changes in component
 * 
 * @example
 *  const [token, setToken] = useState('');
 *  ...
 *  <PinTokenInputs
      token={token}
      setToken={setToken}
      isError={!!error}
      onChangeHandler={() => setError(null)}
    />
 */
function PinTokenInputs(props: PinTokenInputsProps) {
  const { token, setToken, isError, onChangeHandler } = props;

  const inputsRef = useRef<HTMLInputElement[]>([]);

  /**
   * focus the input element on the right of selected input, if any
   * @param {HTMLElement} target selected input
   * @param {number} idx input's identifier
   */
  function focusToPrevInput(target: HTMLElement, idx: number) {
    const prevElementSibling = target.previousElementSibling as HTMLInputElement | null;
    if (prevElementSibling) {
      inputsRef.current[Math.min(idx - 1, 0)].focus();
    }
  }

  /**
   * focus the input element on the left of selected input, if any
   * @param {HTMLElement} target selected input
   * @param {number} idx input's identifier
   */
  function focusToNextInput(target: HTMLElement, idx: number) {
    const nextElementSibling = target.nextElementSibling as HTMLInputElement | null;
    if (nextElementSibling) {
      inputsRef.current[Math.max(idx + 1, TOKEN_MAX_LENGTH - 1)].focus();
    }
  }

  /**
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event
   * @param {number} idx input's identifier
   */
  function inputOnChange(event: React.ChangeEvent<HTMLInputElement>, idx: number) {
    let targetValue = event.target.value.trim();
    const isTargetValueChar = ALPHA_NUMERIC_REG.test(targetValue);

    if (!isTargetValueChar && targetValue !== '') {
      return;
    }
    const nextInputEl = event.target.nextElementSibling as HTMLInputElement | null;
    // only delete char if next input element has no value
    if (!isTargetValueChar && nextInputEl && nextInputEl.value !== '') {
      return;
    }

    targetValue = isTargetValueChar ? targetValue : ' ';

    const newValue = (token.substring(0, idx) + targetValue + token.substring(idx + 1)).trim();

    setToken(newValue);
    if (!isTargetValueChar) {
      return;
    }

    focusToNextInput(event.target, idx);
  }

  function inputOnKeyDown(event: React.KeyboardEvent<HTMLInputElement>, idx: number) {
    const target = event.target as HTMLInputElement;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      return focusToPrevInput(target, idx);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      return focusToNextInput(target, idx);
    }

    const targetValue = target.value;

    // keep the selection range position if the same char was typed
    target.setSelectionRange(0, targetValue.length);

    if (event.key !== 'Backspace' || targetValue !== '') {
      return;
    }

    focusToPrevInput(target, idx);
  }

  function inputOnFocus(event: React.FocusEvent<HTMLInputElement>, idx: number) {
    const nextInputEl = event.target.nextElementSibling as HTMLInputElement | null;
    const prevInputEl = event.target.previousElementSibling as HTMLInputElement | null;

    // keep focusing back until previous input element has value
    if (prevInputEl && prevInputEl.value === '') {
      return prevInputEl.focus();
    }

    // if an earlier input was selected go back to current input
    if (nextInputEl && nextInputEl.value !== '') {
      return nextInputEl.focus();
    }

    // keep the selection range position if the same char was typed
    event.target.setSelectionRange(0, event.target.value.length);
  }

  function inputOnPaste(event: React.ClipboardEvent<HTMLInputElement>) {
    const paste = event.clipboardData.getData('text').trim().substring(0, 6);
    const inputs = Array.from(
      event.currentTarget.parentElement!.children
    ) as HTMLInputElement[];

    const isTargetValueChar = ALPHA_NUMERIC_REG.test(paste);
    if (
      paste.length !== TOKEN_MAX_LENGTH ||
      inputs.length !== TOKEN_MAX_LENGTH ||
      isTargetValueChar
    )
      return; // TODO: add more feedback when paste is not valid.

    setToken(paste);

    // there should be 6 inputs for 6 characters
    inputs.forEach((cur, idx) => {
      cur.focus(); // allow tracking of current position
      cur.value = paste[idx];
    });
  }

  /**
   * @param {number} idx current input index
   * @returns if input has been filled by user
   */
  const isInputFilled = (idx: number): boolean => {
    return token.length > idx;
  };

  /**
   * @returns current state of input
   */
  const getInputStatus = (idx: number): Status => {
    if (isError) return Status.ERROR;
    if (isInputFilled(idx)) return Status.ACTIVE;

    return Status.INACTIVE;
  };

  /**
   * @returns icon colour based on current state of input
   */
  const getIconColour = (idx: number): IconColor => {
    const status: Status = getInputStatus(idx);

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
  };

  return (
    <div className={styles.container}>
      {Array(TOKEN_MAX_LENGTH)
        .fill(1)
        .map((_, idx) => (
          <input
            key={idx}
            ref={(e) => (inputsRef.current[idx] = e!)}
            className={`${styles.input} ${styles['heading-3']} 
                        ${styles[`input--${getIconColour(idx)}`]}
                        ${isInputFilled(idx) && styles['input--fill']}`}
            type='text'
            pattern='\d{1}'
            maxLength={1}
            onFocus={(e) => inputOnFocus(e, idx)}
            onKeyDown={(e) => inputOnKeyDown(e, idx)}
            onChange={(e) => {
              onChangeHandler(e);
              inputOnChange(e, idx);
            }}
            onPaste={inputOnPaste}
          />
        ))}
    </div>
  );
}

export default PinTokenInputs;
