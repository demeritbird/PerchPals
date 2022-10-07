import { useState, useEffect } from 'react';
import logo from './logo.svg';
import Help from './components/Help';
import './App.scss';

type nice = String | undefined;

function App() {
  //console.log(process.env.REACT_APP_ENV);
  const [name, setName] = useState<nice>();

  console.log(name, 'yes');

  useEffect(() => {
    setName('nice');
    console.log('---');
  }, []);

  async function downloadPlease() {
    const csv = document.createElement('a');

    const downloadExcelResponse = await fetch('http://localhost:3001/downloadExcel');
    console.log(downloadExcelResponse, '--');
    const downloadExcelBlob = await downloadExcelResponse.blob();
    const downloadExcelObjectURL = URL.createObjectURL(downloadExcelBlob);
    csv.href = downloadExcelObjectURL;

    console.log(csv, 'sadsada');

    const onClickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    csv.dispatchEvent(onClickEvent);
    csv.remove();
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
        <button onClick={downloadPlease}>click me</button>
      </header>
    </div>
  );
}

export default App;
