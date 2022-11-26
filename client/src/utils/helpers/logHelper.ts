import { Validity } from '../types';

export function logValidity(TAG: string, type: Validity, message: string): void {
  if (import.meta.env.VITE_ENV === 'production') return;

  switch (type) {
    case Validity.PASS:
      console.log(`%c${TAG}: %c${message}`, 'color: green; font-weight: bold');
      break;
    case Validity.FAIL:
      console.log(`%c${TAG}: %c${message}`, 'color: red; font-weight: bold');
      break;
  }
}
