import { useReducer } from 'react';
import Snackbar from '@/components/modals/Snackbar';
import { SuccessStatus } from '@/utils/types';
import { SnackbarContext, SnackbarContextOptions } from '@/hooks/useSnackbar';

export enum SnackbarVisibility {
  SHOW = 'show',
  HIDE = 'hide',
}

export type SnackbarStatus =
  | {
      show: SnackbarVisibility.HIDE;
      message?: string;
      status?: SuccessStatus;
    }
  | {
      show: SnackbarVisibility.SHOW;
      message: string;
      status: SuccessStatus;
    };

export type SnackbarState = SnackbarStatus;
export type SnackbarAction = SnackbarStatus;

function reducer(state: SnackbarStatus, action: SnackbarAction): SnackbarStatus {
  // TODO: to be expanded when snackbar has more functionalities
  switch (action.show) {
    case SnackbarVisibility.SHOW:
      return {
        show: SnackbarVisibility.SHOW,
        message: action.message,
        status: action.status,
      };

    case SnackbarVisibility.HIDE:
      // if hidden, then it should keep the old message and status unless updated.
      return {
        show: SnackbarVisibility.HIDE,
        message: state.message,
        status: state.status,
      };

    default:
      return state;
  }
}

export function SnackbarProvider(props: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, {
    show: SnackbarVisibility.HIDE,
  });

  const SnackbarContextValue: SnackbarContextOptions = {
    state,
    dispatch,
  };

  return (
    <SnackbarContext.Provider value={SnackbarContextValue}>
      <Snackbar
        show={state.show}
        message={state.message ?? ''}
        status={state.status ?? SuccessStatus.ERROR}
      ></Snackbar>
      {props.children}
    </SnackbarContext.Provider>
  );
}

export default SnackbarProvider;
