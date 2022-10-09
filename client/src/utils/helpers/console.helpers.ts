import { Validity } from '../constants/types.constants';

export function consoleValidity(type: Validity, message: String) {
  if (process.env.REACT_APP_ENV === 'production') return;
  const LOG = '** Validity:';

  switch (type) {
    case Validity.PASS:
      console.log(`${LOG} %c ${message}`, 'color: green; font-weight: bold');
      break;
    case Validity.FAIL:
      console.log(`${LOG} %c ${message}`, 'color: red; font-weight: bold');
      break;
  }
}
