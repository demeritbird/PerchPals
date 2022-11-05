import { Validity } from '../constants/types.constants';

export function logValidity(type: Validity, message: String): void {
  if (import.meta.env.REACT_APP_ENV === 'production') return;
  const TAG = '** Validity:';

  switch (type) {
    case Validity.PASS:
      console.log(`${TAG} %c${message}`, 'color: green; font-weight: bold');
      break;
    case Validity.FAIL:
      console.log(`${TAG} %c${message}`, 'color: red; font-weight: bold');
      break;
  }
}
