import React, { useState } from 'react';
import { logValidity } from '../utils/helpers';
import { Validity } from '../utils/types';

/**
 * @desc For use whenever Users needs to tap onto localStorage.
 * - searches for and uses previously set value if any
 * - if none, defaults to initialValue if none are provided, and sets that default value
 * - changes/saves new values whenever setState is called
 *
 * @example
 * const [store, useStore] = useLocalStorage('key','initialValue')
 * useStore('newValue')
 *
 * // NOTE: Please do not add setState as a dependency in useEffect!!
 */
const TAG = '** useLocalStorage';
type SetStorage<T> = React.Dispatch<React.SetStateAction<T>>;
function useLocalStorage<T>(key: string, initialValue: T | null = null): [T, SetStorage<T>] {
  const [state, setState] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);

      if (item) {
        return JSON.parse(item);
      } else if (initialValue) {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      }
    } catch {
      return initialValue;
    }
  });

  function setLocalStorageState(newState: React.SetStateAction<T>): void {
    try {
      setState(newState);
      window.localStorage.setItem(key, JSON.stringify(newState));

      logValidity(TAG, Validity.PASS, `key: '${key}' is stored in localStorage!`);
    } catch {
      logValidity(
        TAG,
        Validity.FAIL,
        `Unable to store information for key: '${key}' in localStorage!`
      );
    }
  }

  return [state, setLocalStorageState];
}

export default useLocalStorage;
