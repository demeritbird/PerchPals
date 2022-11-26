import { useState, useRef, useEffect, Fragment, FormEvent } from 'react';

import useAuth from '../../../../hooks/useAuth';
import useAxios from '../../../../hooks/useAxios';
import { logValidity } from '../../../../utils/helpers';
import { AuthErrorResponse, Validity } from '../../../../utils/types';
import { useNavigate } from 'react-router-dom';
import AuthFormInput from '../../../../components/forminputs/AuthFormInput';
import AuthButton from '../../../../components/buttons/AuthButton';

interface LoginRequest {
  email: string;
  password: string;
}

function loginInputIsValid(email: string, password: string): boolean {
  return email.includes('@') && password.length >= 8;
}

const TAG = '** Login Form';
function LoginForm() {
  const navigate = useNavigate();
  const { authUser, setAuthUser, setPersist } = useAuth();
  const {
    response: authResponse,
    error: authError,
    loading: authLoading,
    axiosRequest: authRequest,
  } = useAxios();

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<AuthErrorResponse | null>(null);

  useEffect(() => {
    if (!emailInputRef.current) return;
    emailInputRef.current.focus();
  }, []);

  useEffect(() => {
    if (authError) {
      setError({
        title: 'Authentication Error',
        message: authError,
      });

      logValidity(TAG, Validity.FAIL, authError);
      return;
    }

    if (authResponse != null) {
      setAuthUser({
        id: authResponse.data.user._id,
        name: authResponse.data.user.name,
        email: authResponse.data.user.email,
        role: authResponse.data.user.role,
        token: authResponse.token,
      });
      setPersist('true');

      navigate(`/landingpage`);
      logValidity(TAG, Validity.PASS, `Authenticated User: ${authResponse.data.user.name}`);
    }
  }, [authResponse, authError, setAuthUser, navigate, setPersist]);

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
    authRequest({
      method: 'post',
      url: 'api/v1/users/login',
      requestBody,
    });
  }

  return (
    <Fragment>
      <h1>Sign In</h1>
      <form onSubmit={(event: FormEvent) => onSubmitHandler(event)}>
        <AuthFormInput
          id='email'
          inputType='email'
          inputRef={emailInputRef}
          onChangeHandler={() => setError(null)}
        >
          Email:
        </AuthFormInput>
        <AuthFormInput
          id='password'
          inputType='password'
          inputRef={passwordInputRef}
          onChangeHandler={() => setError(null)}
        >
          Password:
        </AuthFormInput>
        <AuthButton>Log In</AuthButton>
      </form>

      <h1>{error ? error.message : 'no error currently'}</h1>
      <h1>{authUser ? authUser.name : 'no user currently'}</h1>
    </Fragment>
  );
}

export default LoginForm;
