import logo from './logo.svg';
import Help from './components/Help';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
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

  /*
  async function getTestData() {
    await fetch(`${process.env.REACT_APP_LINK}/testdata`, {})
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  */

  async function emulateFetch() {
    return await (await fetch(`${process.env.REACT_APP_LINK}/testdata`, {})).json();
  }

  //// onClick React Query ////
  const getTestData = () => {
    // manually refetch
    refetch();
  };
  const { data: firstData, refetch } = useQuery(['onclick'], emulateFetch, {
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running
  });

  //// useEffect React Query ////
  const { isLoading, data: secondData } = useQuery(['oneffect'], emulateFetch);

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
        <h4>{firstData?.foo}</h4>
        <p>Data: {!isLoading ? secondData?.foo : '...loading'}</p>
        <button onClick={getTestData}>click me</button>
      </header>
    </div>
  );
}

export default App;
