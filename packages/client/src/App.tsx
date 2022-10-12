import logo from './logo.svg';
import Help from './components/Help';
import './App.scss';

import { logValidity } from './utils/helpers/log.helpers';
import { Validity } from './utils/constants/types.constants';

function App() {
  console.log(process.env.REACT_APP_ENV);
  console.log('production branch');

  logValidity(Validity.PASS, 'pass message!');
  logValidity(Validity.FAIL, 'fail message!');
  async function getTestData() {
    await fetch('http://localhost:3001/testdata', {})
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Help />
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
        <button onClick={getTestData}>click me</button>
      </header>
    </div>
  );
}

export default App;
