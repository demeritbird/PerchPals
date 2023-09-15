import { useState, useRef, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuth from '../../../../hooks/useAuth';
import useAxios from '../../../../hooks/useAxios';
import AuthFormInput from '../../../../components/inputs/AuthFormInput';
import AuthPrimaryButton from '../../../../components/buttons/AuthPrimaryButton';

import { RegistrationStatus } from '../../AuthPage';
import { AuthErrorResponse, Validity } from '../../../../utils/types';
import { logValidity } from '../../../../utils/helpers';

import styles from './SignupPanel.module.scss';

interface SignupRequest {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

function signupInputIsValid(
  username: string,
  email: string,
  password: string,
  confirmPassword: string
): boolean {
  if (username.length < 8) return false;
  if (!email.includes('@')) return false;
  if (password.length < 8) return false;
  if (password !== confirmPassword) return false;

  return true;
}

interface SignupPanelProps {
  setCurrentRegistrationHandler: React.Dispatch<React.SetStateAction<RegistrationStatus>>;
}

const TAG = '** Signup Panel';
function SignupPanel(props: SignupPanelProps) {
  const { setCurrentRegistrationHandler: setCurrentRegistrationState } = props;
  const navigate = useNavigate();
  const { authUser, setAuthUser, setPersist } = useAuth();
  const {
    response: authResponse,
    error: authError,
    isLoading: authLoading,
    axiosRequest: authRequest,
  } = useAxios();

  const [error, setError] = useState<AuthErrorResponse | null>(null);

  const usernameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!usernameInputRef.current) return;
    usernameInputRef.current.focus();
  }, []);

  useEffect(() => {
    if (authError) {
      setError({
        title: 'Registration Error',
        message: authError,
      });

      logValidity(TAG, Validity.FAIL, authError);
      return;
    }

    if (authResponse != null) {
      const inputUser = {
        id: authResponse.data.user._id,
        name: authResponse.data.user.name,
        email: authResponse.data.user.email,
        role: authResponse.data.user.role,
        active: authResponse.data.user.active,
        token: authResponse.token,
      };

      setAuthUser(inputUser);
      setPersist('true');
      navigate(`/activate`);
      logValidity(TAG, Validity.PASS, `Authenticated User: ${authResponse.data.user.name}`);
    }
  }, [authResponse, authError]);

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

    passwordInputRef.current.value = '';
    confirmPasswordInputRef.current.value = '';

    // Client Validation
    if (!signupInputIsValid(inputUsername, inputEmail, inputPassword, inputConfirmPassword)) {
      const validationError = {
        title: 'Validation Error',
        message: 'You have input the wrong signup format!',
      };
      setError(validationError);
      logValidity(TAG, Validity.FAIL, validationError.message);
      return;
    }

    // Server Validation
    const requestBody: SignupRequest = {
      name: inputUsername,
      email: inputEmail,
      password: inputPassword,
      passwordConfirm: inputConfirmPassword,
    };
    authRequest({
      // axiosInstance: axiosPrivate,
      method: 'post',
      url: '/api/v1/users/signup',
      requestBody,
    });
  }

  return (
    <div className={styles.panel}>
      <div className={styles.panel__section}>
        {/* TODO: to add in image component when done.*/}
        <div className={styles.logo}></div>
      </div>
      <div className={styles.panel__section}>
        <form onSubmit={(event: FormEvent) => onSubmitHandler(event)}>
          <AuthFormInput
            id='username'
            inputType='text'
            inputRef={usernameInputRef}
            onChangeHandler={() => setError(null)}
          >
            Username
          </AuthFormInput>
          <AuthFormInput
            id='email'
            inputType='email'
            inputRef={emailInputRef}
            onChangeHandler={() => setError(null)}
          >
            Email
          </AuthFormInput>
          <AuthFormInput
            id='password'
            inputType='password'
            inputRef={passwordInputRef}
            onChangeHandler={() => setError(null)}
          >
            Password
          </AuthFormInput>
          <AuthFormInput
            id='password'
            inputType='password'
            inputRef={confirmPasswordInputRef}
            onChangeHandler={() => setError(null)}
          >
            Confirm Password
          </AuthFormInput>

          <div className={`${styles.panel__section}`}>
            <AuthPrimaryButton isLoading={authLoading} isError={error != null}>
              Sign Up
            </AuthPrimaryButton>

            <p className={styles.prompt}>
              Already a member?{' '}
              <span
                className={styles.prompt__highlight}
                onClick={() => {
                  setCurrentRegistrationState(RegistrationStatus.LOGIN);
                }}
              >
                Sign In
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupPanel;
