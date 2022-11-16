import { useState, useRef, useEffect, Fragment, FormEvent } from 'react';
import useAuth from '../../../../hooks/useAuth';
import { AuthErrorResponse } from '../types';

/**
 *
 * @param email
 * @param password
 * @returns
 */
function loginInputIsValid(email: string, password: string): boolean {
  return email.includes('@') || password.length >= 8;
}

function SignInForm() {
  const { authUser, authLogIn } = useAuth();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<AuthErrorResponse | null>(null);

  useEffect(() => {
    if (!emailInputRef.current) return;
    emailInputRef.current.focus();
  }, []);

  function onSignInHandler(event: FormEvent) {
    event.preventDefault();
    if (!emailInputRef.current || !passwordInputRef.current) return;

    const inputEmail: string = emailInputRef.current.value.trim();
    const inputPassword: string = passwordInputRef.current.value.trim();

    // Client Validation
    if (!loginInputIsValid(inputEmail, inputPassword)) {
      setError({
        title: 'Error while trying to log in',
        message: 'You have input the wrong email / password format!',
      });
    }

    // Server Call
    authLogIn(inputEmail, inputPassword);
  }

  return (
    <Fragment>
      <h1>Sign In</h1>
      <form onSubmit={(event: FormEvent) => onSignInHandler(event)}>
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

export default SignInForm;
