import { useState, useEffect, useRef } from 'react';

function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [formValidity, setFormValidity] = useState<boolean>(false);

  const userRef = useRef<HTMLInputElement | null>(null);
  const errorRef = useRef();

  return (
    <section>
      <h1>Sign In</h1>
      <form>
        <label htmlFor='username'>Username:</label>
        <input
          type='text'
          id='username'
          ref={userRef}
          autoComplete='off'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />

        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button>Sign In</button>
      </form>
      <p>
        Need an Account?
        <br />
        <span className='line'>
          <button>sign up</button>
        </span>
      </p>
    </section>
  );
}

export default LoginPage;
