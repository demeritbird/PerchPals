import { useRef, useEffect, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useAuth from '../../../../hooks/useAuth';
import useAxios, { isResponseType } from '../../../../hooks/useAxios';
import CommonFormInput from '../../../../components/inputs/CommonFormInput';

import { RegistrationStatus } from '../../AuthPage';
import { SuccessStatus, Validity } from '../../../../utils/types';
import { logValidity } from '../../../../utils/helpers';

import styles from './SignupPanel.module.scss';
import EmailIcon from 'src/components/icons/EmailIcon';
import KeyIcon from 'src/components/icons/KeyIcon';
import UserIcon from 'src/components/icons/UserIcon';
import CommonButton from 'src/components/buttons/CommonButton';
import useSnackbar from '@/hooks/useSnackbar';
import { SnackbarVisibility } from '@/contexts/SnackbarProvider';

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

function isSignUpFormValid(
  username: string,
  email: string,
  password: string,
  confirmPassword: string
): boolean {
  if (!email.includes('@')) return false;
  if (password.length < 8) return false;
  if (password !== confirmPassword) return false;

  return true;
}

interface SignupPanelProps {
  setCurrentRegistrationHandler: React.Dispatch<React.SetStateAction<RegistrationStatus>>;
}

const TAG = '** Signup Panel';
/**
 * @desc login form to enter application
 * @param {React.Dispatch<React.SetStateAction<RegistrationStatus>>} props.setCurrentRegistrationHandler
 * set useState ref used to update authpage of user's auth progress
 */
function SignupPanel(props: SignupPanelProps) {
  const { setCurrentRegistrationHandler: setCurrentRegistrationState } = props;
  const navigate = useNavigate();
  const { setAuthUser, setPersist } = useAuth();
  const {
    request: signup,
    response: signupResponse,
    error: signupError,
    setError,
    isLoading,
  } = useAxios();
  const { dispatchSnackbar } = useSnackbar();

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!usernameInputRef.current) return;
    usernameInputRef.current.focus();
  }, []);

  useEffect(() => {
    if (signupError) {
      setError(signupError);
      logValidity(TAG, Validity.FAIL, signupError);
      clearPasswordInput();
      dispatchSnackbar({
        show: SnackbarVisibility.SHOW,
        message: 'Incorrect credentials were used! Please try again.',
        status: SuccessStatus.ERROR,
      });
      return;
    }
    if (!signupResponse || !isResponseType(signupResponse, 'success')) return;

    const inputUser = {
      id: signupResponse.data.user._id,
      name: signupResponse.data.user.name,
      email: signupResponse.data.user.email,
      photo: signupResponse.data.user.photo,
      role: signupResponse.data.user.role,
      active: signupResponse.data.user.active,
      token: signupResponse.token!,
    };

    setAuthUser(inputUser);
    setPersist('true');
    setCurrentRegistrationState(RegistrationStatus.ACTIVATE);
    navigate(`/auth/activate`);
    dispatchSnackbar({
      show: SnackbarVisibility.SHOW,
      message: 'Signup successful!',
      status: SuccessStatus.SUCCESS,
    });
    logValidity(
      TAG,
      Validity.PASS,
      `User ${signupResponse.data.user.name} has created an account.`
    );
  }, [signupResponse, signupError]);

  function onSubmitHandler(event: FormEvent): void {
    event.preventDefault();
    if (
      !usernameInputRef.current ||
      !emailInputRef.current ||
      !passwordInputRef.current ||
      !confirmPasswordInputRef.current
    )
      return;

    const inputUsername: string = usernameInputRef.current.value.trim();
    const inputEmail: string = emailInputRef.current.value.trim();
    const inputPassword: string = passwordInputRef.current.value.trim();
    const inputConfirmPassword: string = confirmPasswordInputRef.current.value.trim();

    if (!isSignUpFormValid(inputUsername, inputEmail, inputPassword, inputConfirmPassword)) {
      const validationError = 'You have input the wrong signup format!';
      setError(validationError);
      logValidity(TAG, Validity.FAIL, validationError);
      clearPasswordInput();
      return;
    }

    const requestBody: SignupRequest = {
      name: inputUsername,
      email: inputEmail,
      password: inputPassword,
      passwordConfirm: inputConfirmPassword,
    };
    signup({
      method: 'post',
      url: '/api/v1/users/signup',
      requestBody,
    });
  }

  function clearPasswordInput(): void {
    if (!passwordInputRef.current || !confirmPasswordInputRef.current) return;
    passwordInputRef.current.value = '';
    confirmPasswordInputRef.current.value = '';
  }

  return (
    <div className={styles.panel}>
      <div className={styles.panel__section}>
        <h3 className={`${styles.subheader} ${styles['heading-3']}`}>Register New Account</h3>
      </div>
      <div className={styles.panel__section}>
        <form className={styles.form} onSubmit={(event: FormEvent) => onSubmitHandler(event)}>
          <div className={`${styles.form__section}`}>
            <div className={styles.form__inputs}>
              <CommonFormInput
                icon={UserIcon}
                inputType='text'
                inputRef={usernameInputRef}
                isError={!!signupError}
                showBackground={true}
                onChangeHandler={() => setError(null)}
              >
                Username
              </CommonFormInput>
              <CommonFormInput
                icon={EmailIcon}
                inputType='text'
                inputRef={emailInputRef}
                isError={!!signupError}
                showBackground={true}
                onChangeHandler={() => setError(null)}
              >
                Email
              </CommonFormInput>
              <CommonFormInput
                icon={KeyIcon}
                inputType='password'
                inputRef={passwordInputRef}
                isError={!!signupError}
                showBackground={true}
                onChangeHandler={() => setError(null)}
              >
                Password
              </CommonFormInput>
              <CommonFormInput
                icon={KeyIcon}
                inputType='password'
                inputRef={confirmPasswordInputRef}
                isError={!!signupError}
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
              isError={!!signupError}
              isSubmit={true}
              size='lg'
              color='primary'
              onClickHandler={onSubmitHandler}
            >
              Sign Up
            </CommonButton>

            <p className={`${styles.prompt} ${styles['body-3']}`}>
              Already a member?{' '}
              <Link
                to='/auth'
                className={`${styles.prompt__highlight} ${styles['body-3B']}`}
                onClick={() => {
                  setCurrentRegistrationState(RegistrationStatus.LOGIN);
                }}
              >
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupPanel;
