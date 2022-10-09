import logo from './logo.svg';
import Help from './components/Help';
import './App.scss';

import { consoleValidity } from './utils/helpers/console.helpers';
import { Validity } from './utils/constants/types.constants';

function App() {
  console.log(process.env.REACT_APP_ENV);

  consoleValidity(Validity.PASS, 'pass message!');
  consoleValidity(Validity.FAIL, 'fail message!');

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
      </header>
    </div>
  );
}

export default App;
