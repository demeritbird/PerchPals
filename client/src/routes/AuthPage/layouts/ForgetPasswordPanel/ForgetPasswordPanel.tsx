import styles from './ForgetPasswordPanel.module.scss';
import { RegistrationStatus } from '../../AuthPage';
import CommonFormInput from '@/components/inputs/CommonFormInput';
import EmailIcon from '@/components/icons/EmailIcon';
import useAxios, { isResponseType } from '@/hooks/useAxios';
import { FormEvent, useEffect, useRef } from 'react';
import CommonButton from '@/components/buttons/CommonButton';
import { Link } from 'react-router-dom';
import { logValidity } from '@/utils/helpers';
import { SuccessStatus, Validity } from '@/utils/types';
import { SnackbarVisibility } from '@/contexts/SnackbarProvider';
import useSnackbar from '@/hooks/useSnackbar';

export interface ForgetPasswordRequest {
  email: string;
}

function isForgetPasswordFormValid(email: string): boolean {
  return email.includes('@');
}

export interface ForgetPasswordPanelProps {
  setCurrentRegistrationHandler: React.Dispatch<React.SetStateAction<RegistrationStatus>>;
}

const TAG = '** Forget Password Panel';
function ForgetPasswordPanel(props: ForgetPasswordPanelProps) {
  const { setCurrentRegistrationHandler: setCurrentRegistrationState } = props;
  const {
    request: forgetPasswordRequest,
    response: forgetPasswordResponse,
    error: forgetPasswordError,
    setError,
    isLoading,
  } = useAxios();
  const { dispatchSnackbar } = useSnackbar();

  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!emailInputRef.current) return;
    emailInputRef.current.focus();
  }, []);

  useEffect(() => {
    if (forgetPasswordError) {
      logValidity(TAG, Validity.FAIL, forgetPasswordError);
      dispatchSnackbar({
        show: SnackbarVisibility.SHOW,
        message: 'Email does not exist! Please try again',
        status: SuccessStatus.ERROR,
      });
      return;
    }

    if (!forgetPasswordResponse || !isResponseType(forgetPasswordResponse, 'success')) return;

    // success but do not navigate user, they have to check their email
    logValidity(TAG, Validity.PASS, `Password reset for user with reset token.`);
    dispatchSnackbar({
      show: SnackbarVisibility.SHOW,
      message: 'Your password has been reset! Please check your email.',
      status: SuccessStatus.SUCCESS,
    });
  }, [forgetPasswordResponse, forgetPasswordError]);

  function onSubmitHandler(event: FormEvent): void {
    event.preventDefault();
    if (!emailInputRef.current) return;

    const inputEmail: string = emailInputRef.current.value.trim();

    // client validation
    if (!isForgetPasswordFormValid(inputEmail)) {
      const validationError = 'You have input the wrong email format!';
      setError(validationError);
      logValidity(TAG, Validity.FAIL, validationError);
      dispatchSnackbar({
        show: SnackbarVisibility.SHOW,
        message: 'Email does not exist! Please try again',
        status: SuccessStatus.ERROR,
      });

      return;
    }

    // server validation
    const requestBody: ForgetPasswordRequest = {
      email: inputEmail,
    };

    forgetPasswordRequest({
      method: 'post',
      url: 'api/v1/users/forgetPassword',
      requestBody,
    });
  }

  return (
    <div className={styles.panel}>
      <div className={styles.panel__section}>
        <h3 className={`${styles.subheader} ${styles['heading-3']}`}>Forgot your password?</h3>
        <h1 className={`${styles.caption} ${styles['body-1']}`}>
          Please enter your email and we will send you a code to recover your account right
          away.
        </h1>
      </div>
      <div className={styles.panel__section}>
        <form className={styles.form} onSubmit={(event: FormEvent) => onSubmitHandler(event)}>
          <div className={`${styles.form__section} u-margin-btm-medium`}>
            <div className={styles.form__inputs}>
              <CommonFormInput
                icon={EmailIcon}
                inputType='text'
                inputRef={emailInputRef}
                isError={!!forgetPasswordError}
                showBackground={true}
                onChangeHandler={() => setError(null)}
              >
                Email
              </CommonFormInput>
            </div>
          </div>
          <div className={`${styles.form__section}`}>
            <CommonButton
              isLoading={isLoading}
              isError={!!forgetPasswordError}
              isSubmit={true}
              size='lg'
              color='primary'
              onClickHandler={onSubmitHandler}
            >
              Recover Account
            </CommonButton>

            <p className={`${styles.prompt} ${styles['body-3']}`}>
              Return to{' '}
              <Link
                to='/auth'
                className={`${styles.prompt__highlight} ${styles['body-3B']}`}
                onClick={() => {
                  setCurrentRegistrationState(RegistrationStatus.SIGNUP);
                }}
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgetPasswordPanel;
