import { useState, useRef, useEffect, Fragment, FormEvent } from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxios from '../../../../hooks/useAxios';
import { logValidity } from '../../../../utils/helpers';
import { Validity } from '../../../../utils/types';
import { AuthErrorResponse } from '../types';

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

const TAG = '** Signup Form';
function SignupForm() {
  const { authUser, setAuthUser } = useAuth();
  const {
    response: authResponse,
    error: authError,
    loading: authLoading,
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
      method: 'post',
      url: '/api/v1/users/signup',
      requestBody,
    });
  }

  return (
    <Fragment>
      <h1>Sign In</h1>
      <form onSubmit={(event: FormEvent) => onSubmitHandler(event)}>
        <label htmlFor='username'>Username:</label>
        <input
          type='text'
          id='username'
          ref={usernameInputRef}
          onChange={() => setError(null)}
          autoComplete='off'
          required
        />

        <label htmlFor='email'>Email:</label>
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

        <label htmlFor='password'>Confirm Password:</label>
        <input
          type='password'
          id='password'
          ref={confirmPasswordInputRef}
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

export default SignupForm;
