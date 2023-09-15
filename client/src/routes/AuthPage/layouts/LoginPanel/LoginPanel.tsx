import { useState, useRef, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuth from '../../../../hooks/useAuth';
import useAxios from '../../../../hooks/useAxios';
import AuthFormInput from '../../../../components/inputs/AuthFormInput';
import AuthPrimaryButton from '../../../../components/buttons/AuthPrimaryButton';

import { RegistrationStatus } from '../../AuthPage';
import { AuthErrorResponse, Validity } from '../../../../utils/types';
import { AccountStatus } from '@backend/types';
import { logValidity } from '../../../../utils/helpers';

import styles from './LoginPanel.module.scss';

interface LoginRequest {
  email: string;
  password: string;
}

function loginInputIsValid(email: string, password: string): boolean {
  return email.includes('@') && password.length >= 8;
}

interface LoginPanelProps {
  setCurrentRegistrationHandler: React.Dispatch<React.SetStateAction<RegistrationStatus>>;
}

const TAG = '** Login Form';
function LoginPanel(props: LoginPanelProps) {
  const { setCurrentRegistrationHandler: setCurrentRegistrationState } = props;
  const navigate = useNavigate();
  const { authUser, setAuthUser, setPersist } = useAuth();
  const {
    response: loginResponse,
    error: loginError,
    isError,
    isLoading,
    axiosRequest: loginRequest,
  } = useAxios();

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<AuthErrorResponse | null>(null);

  useEffect(() => {
    if (!emailInputRef.current) return;
    emailInputRef.current.focus();
  }, []);

  useEffect(() => {
    if (isError) {
      setError({
        title: 'Authentication Error',
        message: loginError,
      });

      logValidity(TAG, Validity.FAIL, loginError);
      return;
    }

    if (loginResponse != null) {
      const inputUser = {
        id: loginResponse.data.user._id,
        name: loginResponse.data.user.name,
        email: loginResponse.data.user.email,
        role: loginResponse.data.user.role,
        active: loginResponse.data.user.active,
        token: loginResponse.token,
      };

      setAuthUser(inputUser);
      setPersist('true');
      inputUser.active === AccountStatus.PENDING
        ? navigate(`/activate`)
        : navigate(`/landingpage`);
      logValidity(TAG, Validity.PASS, `Authenticated User: ${loginResponse.data.user.name}`);
    }
  }, [loginResponse, loginError]);

  function onSubmitHandler(event: FormEvent): void {
    event.preventDefault();
    if (!emailInputRef.current || !passwordInputRef.current) return;

    const inputEmail: string = emailInputRef.current.value.trim();
    const inputPassword: string = passwordInputRef.current.value.trim();

    passwordInputRef.current.value = '';

    // Client Validation
    if (!loginInputIsValid(inputEmail, inputPassword)) {
      const validationError = {
        title: 'Validation Error',
        message: 'You have input the wrong email / password format!',
      };
      setError(validationError);
      logValidity(TAG, Validity.FAIL, validationError.message);
      return;
    }

    // Server Validation
    const requestBody: LoginRequest = {
      email: inputEmail,
      password: inputPassword,
    };
    loginRequest({
      method: 'post',
      url: 'api/v1/users/login',
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
          <div className={`${styles.form} u-margin-btm-medium`}>
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

            <span
              className={styles['form__alt-text']}
              onClick={() => {
                /* TODO: forget password page */
              }}
            >
              Forgot your password?
            </span>
          </div>
          <div className={`${styles.panel__section}`}>
            <AuthPrimaryButton isLoading={isLoading} isError={error != null}>
              Log In
            </AuthPrimaryButton>
 
            <p className={styles.prompt}>
              Not a member?{' '}
              <span
                className={styles.prompt__highlight}
                onClick={() => {
                  setCurrentRegistrationState(RegistrationStatus.SIGNUP);
                }}
              >
                Sign Up
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPanel;
