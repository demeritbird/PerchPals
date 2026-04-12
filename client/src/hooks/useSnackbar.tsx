import { SnackbarAction, SnackbarState } from '@/contexts/SnackbarProvider';
import { createContext, useContext } from 'react';

export interface SnackbarContextOptions {
  snackbar: SnackbarState;
  dispatchSnackbar: React.Dispatch<SnackbarAction>;
}

// this needs to be here to init context first
// set as undefined first for storybook
export const SnackbarContext = createContext<SnackbarContextOptions | undefined>(undefined);

/**
 * show and hide snackbar with custom message
 *
 * @example
 * // to init
 * const { state, dispatch } = useSnackbar();
 * // to dispatch
 * dispatch({
    type: DispatchSnackbarType.SHOW,
    message: 'lorem ipsum',
    status: SnackbarStatus.SUCCESS,
   });
 */
const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) throw new Error('Missing SnackbarProvider');
  return context;
};

export default useSnackbar;
