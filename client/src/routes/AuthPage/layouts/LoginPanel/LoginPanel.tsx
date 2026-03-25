import { useRef, useEffect, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useAuth from '../../../../hooks/useAuth';
import useAxios, { isResponseType } from '../../../../hooks/useAxios';
import CommonFormInput from '../../../../components/inputs/CommonFormInput';

import { RegistrationStatus } from '../../AuthPage';
import { AccountStatus } from '@backend/types';
import { logValidity } from '../../../../utils/helpers';

import styles from './LoginPanel.module.scss';
import EmailIcon from 'src/components/icons/EmailIcon';
import CommonButton from '../../../../components/buttons/CommonButton';
import KeyIcon from 'src/components/icons/KeyIcon';
import { Validity } from 'src/utils/types';

export interface LoginRequest {
  email: string;
  password: string;
}

function isLoginFormValid(email: string, password: string): boolean {
  return email.includes('@') && password.length >= 8;
}

interface LoginPanelProps {
  setCurrentRegistrationHandler: React.Dispatch<React.SetStateAction<RegistrationStatus>>;
}

const TAG = '** Login Panel';
function LoginPanel(props: LoginPanelProps) {
  const { setCurrentRegistrationHandler: setCurrentRegistrationState } = props;
  const navigate = useNavigate();
  const { setAuthUser, setPersist } = useAuth();
  const {
    request: loginRequest,
    response: loginResponse,
    error: loginError,
    setError,
    isLoading,
  } = useAxios();

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!emailInputRef.current) return;
    emailInputRef.current.focus();
  }, []);

  useEffect(() => {
    if (loginError) {
      logValidity(TAG, Validity.FAIL, loginError);
      clearPasswordInput();
      return;
    }
    if (!loginResponse || !isResponseType(loginResponse, 'success')) return;

    const inputUser = {
      id: loginResponse.data.user._id,
      name: loginResponse.data.user.name,
      email: loginResponse.data.user.email,
      photo: loginResponse.data.user.photo,
      role: loginResponse.data.user.role,
      active: loginResponse.data.user.active,
      token: loginResponse.token!,
    };

    setAuthUser(inputUser);
    setPersist('true');
    navigate(`/landingpage`);
    logValidity(TAG, Validity.PASS, `Authenticated User: ${loginResponse.data.user.name}`);
  }, [loginResponse, loginError]);

  function clearPasswordInput(): void {
    if (!passwordInputRef.current) return;
    passwordInputRef.current.value = '';
  }

  function onSubmitHandler(event: FormEvent): void {
    event.preventDefault();
    if (!emailInputRef.current || !passwordInputRef.current) return;

    const inputEmail: string = emailInputRef.current.value.trim();
    const inputPassword: string = passwordInputRef.current.value.trim();

    // client validation
    if (!isLoginFormValid(inputEmail, inputPassword)) {
      const validationError = 'You have input the wrong email / password format!';
      setError(validationError);
      logValidity(TAG, Validity.FAIL, validationError);

      clearPasswordInput();
      return;
    }

    // server validation
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
        <h3 className={`${styles.subheader} ${styles['heading-3']}`}>Welcome to</h3>
        <h1 className={`${styles.header} ${styles['heading-1']}`}>Perchpals</h1>
      </div>
      <div className={styles.panel__section}>
        <form className={styles.form} onSubmit={(event: FormEvent) => onSubmitHandler(event)}>
          <div className={`${styles.form__section} u-margin-btm-medium`}>
            <div className={styles.form__inputs}>
              <CommonFormInput
                icon={EmailIcon}
                inputType='text'
                inputRef={emailInputRef}
                isError={!!loginError}
                showBackground={true}
                onChangeHandler={() => setError(null)}
              >
                Email
              </CommonFormInput>
              <CommonFormInput
                icon={KeyIcon}
                inputType='password'
                inputRef={passwordInputRef}
                isError={!!loginError}
                showBackground={true}
                onChangeHandler={() => setError(null)}
              >
                Password
              </CommonFormInput>
            </div>
            <div className={styles['form__alt--end']}>
              <Link
                to='/auth/forget-password'
                className={`${styles['alt-text']} ${styles['body-3']}`}
              >
                Forgot your password?
              </Link>
            </div>
          </div>
          <div className={`${styles.form__section}`}>
            <CommonButton
              isLoading={isLoading}
              isError={!!loginError}
              isSubmit={true}
              size='lg'
              color='primary'
              onClickHandler={onSubmitHandler}
            >
              Log In
            </CommonButton>

            <p className={`${styles.prompt} ${styles['body-3']}`}>
              Not a member?{' '}
              <Link
                to='/auth/signup'
                className={`${styles.prompt__highlight} ${styles['body-3B']}`}
                onClick={() => {
                  setCurrentRegistrationState(RegistrationStatus.SIGNUP);
                }}
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPanel;
