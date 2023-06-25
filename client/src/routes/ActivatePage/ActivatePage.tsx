import { FormEvent, useEffect } from 'react';
import CharTokenInput from '../../components/inputs/CharTokenInput/CharTokenInput';

// TODO: transform in react-like code.
// - Link: https://codepen.io/solygambas/pen/KKgYZWR
function ActivatePage() {
  useEffect(() => {
    const inputs = document.querySelectorAll<HTMLInputElement>('.input');

    if (inputs[0]) inputs[0].focus();

    inputs.forEach((input, index) => {
      input.addEventListener('keydown', (e) => {
        if (/^[0-9a-zA-Z]$/.test(e.key)) {
          inputs[index].value = '';
          setTimeout(() => {
            if (index + 1 < 6) inputs[index + 1].focus();
          }, 10);
        } else if (e.key === 'Backspace') {
          setTimeout(() => {
            inputs[index - 1].focus();
          }, 10);
        }
      });
    });
  }, []);

  function onSubmitHandler(event: FormEvent): void {
    event.preventDefault();
    const inputs = document.querySelectorAll<HTMLInputElement>('.input');

    let combinedToken: string = '';
    inputs.forEach((input) => {
      combinedToken += input.value;
    });

    console.log(combinedToken);
  }

  return (
    <div className='container'>
      <h2>Activate Your Account</h2>
      <p>Check your email at: example.com</p>
      <div className='input-container'>
        <form
          onSubmit={(event: FormEvent) => onSubmitHandler(event)}
          encType='multipart/form-data'
        >
          <CharTokenInput />
          <CharTokenInput />
          <CharTokenInput />
          <CharTokenInput />
          <CharTokenInput />
          <CharTokenInput />

          <button type='submit'>submit token</button>
        </form>
      </div>
    </div>
  );
}

export default ActivatePage;
