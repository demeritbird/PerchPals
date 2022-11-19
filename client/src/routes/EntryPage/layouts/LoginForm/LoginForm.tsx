import { useState, useRef, useEffect, Fragment, FormEvent } from 'react';

import useAuth from '../../../../hooks/useAuth';
import useAxios from '../../../../hooks/useAxios';
import { logValidity } from '../../../../utils/helpers';
import { Validity } from '../../../../utils/types';
import { AuthErrorResponse } from '../types';

interface LoginRequest {
  email: string;
  password: string;
}

function loginInputIsValid(email: string, password: string): boolean {
  return email.includes('@') || password.length >= 8;
}

const TAG = '** Login Form';
function LoginForm() {
  const { authUser, setAuthUser } = useAuth();
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

      logValidity(TAG, Validity.PASS, `Authenticated User: ${authResponse.data.user.name}`);
    }
  }, [authResponse, authError, setAuthUser]);

  function onSubmitHandler(event: FormEvent): void {
    event.preventDefault();
    if (!emailInputRef.current || !passwordInputRef.current) return;

    const inputEmail: string = emailInputRef.current.value.trim();
    const inputPassword: string = passwordInputRef.current.value.trim();

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
      url: '/api/v1/users/login',
      requestBody,
    });
  }

  return (
    <Fragment>
      <h1>Sign In</h1>
      <form onSubmit={(event: FormEvent) => onSubmitHandler(event)}>
        <label htmlFor='username'>Email:</label>
        <input
          type='text'
          id='email'
          ref={emailInputRef}
          onChange={() => setError(null)}
          autoComplete='off'
          required
        />

        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          ref={passwordInputRef}
          onChange={() => setError(null)}
          required
        />

        <button type='submit'>Sign In</button>
      </form>

      <h1>{error ? error.message : 'no error currently'}</h1>
      <h1>{authUser ? authUser.name : 'no user currently'}</h1>
    </Fragment>
  );
}

export default LoginForm;
