import styles from './ResetPasswordPanel.module.scss';
import { RegistrationStatus } from '../../AuthPage';
import { FormEvent, useEffect, useRef } from 'react';
import CommonFormInput from '@/components/inputs/CommonFormInput';
import KeyIcon from '@/components/icons/KeyIcon';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAxios, { isResponseType } from '@/hooks/useAxios';
import useSnackbar from '@/hooks/useSnackbar';
import CommonButton from '@/components/buttons/CommonButton';
import { logValidity } from '@/utils/helpers';
import { SuccessStatus, Validity } from '@/utils/types';
import { SnackbarVisibility } from '@/contexts/SnackbarProvider';

export interface ResetPasswordRequest {
  password: string;
  passwordConfirm: string;
}

function isResetPasswordFormValid({
  password,
  passwordConfirm,
}: ResetPasswordRequest): boolean {
  if (!(password.length >= 8)) return false;
  if (password !== passwordConfirm) return false;

  return true;
}

export interface ResetPasswordPanelProps {
  setCurrentRegistrationHandler: React.Dispatch<React.SetStateAction<RegistrationStatus>>;
}

const TAG = '** Reset Password Panel';
function ResetPasswordPanel(props: ResetPasswordPanelProps) {
  const { setCurrentRegistrationHandler: setCurrentRegistrationState } = props;
  let { resetToken } = useParams();
  const navigate = useNavigate();
  const {
    request: resetPasswordRequest,
    response: resetPasswordResponse,
    error: resetPasswordError,
    setError,
    isLoading,
  } = useAxios();
  const { dispatchSnackbar } = useSnackbar();

  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (resetPasswordError) {
      logValidity(TAG, Validity.FAIL, resetPasswordError);
      dispatchSnackbar({
        show: SnackbarVisibility.SHOW,
        message: 'Password are not correct! Please try again',
        status: SuccessStatus.ERROR,
      });
      return;
    }

    if (!resetPasswordResponse || !isResponseType(resetPasswordResponse, 'success')) return;

    // success but do not navigate user, they have to check their email
    logValidity(TAG, Validity.PASS, `Password reset for user with reset token.`);
    dispatchSnackbar({
      show: SnackbarVisibility.SHOW,
      message: 'Your password has been reset!.',
      status: SuccessStatus.SUCCESS,
    });
    navigate(`/auth`); // bring user back to login when done
  }, [resetPasswordResponse, resetPasswordError]);

  function onSubmitHandler(event: FormEvent): void {
    event.preventDefault();
    if (!passwordInputRef.current || !confirmPasswordInputRef.current) return;

    const inputPassword: string = passwordInputRef.current.value.trim();
    const inputPasswordConfirm: string = confirmPasswordInputRef.current.value.trim();

    const requestBody: ResetPasswordRequest = {
      password: inputPassword,
      passwordConfirm: inputPasswordConfirm,
    };

    if (!isResetPasswordFormValid(requestBody)) {
      const validationError = 'You have input the wrong password!';
      setError(validationError);
      logValidity(TAG, Validity.FAIL, validationError);
      dispatchSnackbar({
        show: SnackbarVisibility.SHOW,
        message: 'Passwords are not correct! Please try again',
        status: SuccessStatus.ERROR,
      });

      return;
    }

    resetPasswordRequest({
      method: 'patch',
      url: `api/v1/users/resetPassword/${resetToken}`,
      requestBody,
    });
  }

  return (
    <div className={styles.panel}>
      <div className={styles.panel__section}>
        <h3 className={`${styles.subheader} ${styles['heading-3']}`}>Reset your password</h3>
        <p className={`${styles.caption} ${styles['body-1']}`}>
          Please enter your new password! Ensure that the new password is 8 characters long.
        </p>
      </div>
      <div className={styles.panel__section}>
        <form className={styles.form} onSubmit={(event: FormEvent) => onSubmitHandler(event)}>
          <div className={`${styles.form__section} u-margin-btm-medium`}>
            <div className={styles.form__inputs}>
              <CommonFormInput
                icon={KeyIcon}
                inputType='password'
                inputRef={passwordInputRef}
                isError={!!resetPasswordError}
                showBackground={true}
                onChangeHandler={() => setError(null)}
              >
                Password
              </CommonFormInput>
              <CommonFormInput
                icon={KeyIcon}
                inputType='password'
                inputRef={confirmPasswordInputRef}
                isError={!!resetPasswordError}
                showBackground={true}
                onChangeHandler={() => setError(null)}
              >
                Confirm Password
              </CommonFormInput>
            </div>
          </div>
          <div className={`${styles.form__section}`}>
            <CommonButton
              isLoading={isLoading}
              isError={!!resetPasswordError}
              isSubmit={true}
              size='lg'
              color='primary'
              onClickHandler={onSubmitHandler}
            >
              Reset Password
            </CommonButton>

            <p className={`${styles.prompt} ${styles['body-3']}`}>
              Return to{' '}
              <Link
                to='/auth'
                className={`${styles.prompt__highlight} ${styles['body-3B']}`}
                onClick={() => {
                  setCurrentRegistrationState(RegistrationStatus.LOGIN);
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

export default ResetPasswordPanel;
