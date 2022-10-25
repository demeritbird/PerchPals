import logo from './logo.svg';
import Help from './components/Help';
import React, { useState, useEffect } from 'react';
import './App.scss';

import { logValidity } from './utils/helpers/log.helpers';
import { Validity } from './utils/constants/types.constants';

type cool = {
  title: string;
};

interface cool2 {
  name: number;
}

function App() {
  const [nice, setNice] = useState<cool | undefined>(undefined);
  const [nice2, setNice2] = useState<cool2 | undefined>(undefined);

  useEffect(() => {
    setNice({
      title: 'foo',
    });
    setNice2({
      name: 2,
    });
  }, []);

  console.log(nice, 'nice 1');
  console.log(nice2, 'nice 2');

  logValidity(Validity.PASS, 'pass message!');
  logValidity(Validity.FAIL, 'fail message!');

  async function getTestData() {
    await fetch(`${process.env.REACT_APP_LINK}/testdata`, {})
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
