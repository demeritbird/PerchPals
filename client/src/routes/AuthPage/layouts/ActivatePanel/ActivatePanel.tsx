import PinTokenInputs from '@/components/inputs/PinTokenInput';
import styles from './ActivatePanel.module.scss';
import CommonButton from '@/components/buttons/CommonButton';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useAxios, { isResponseType } from '@/hooks/useAxios';
import { FormEvent, useEffect, useState } from 'react';
import { RegistrationStatus } from '../../AuthPage';
import { SuccessStatus, Validity } from '@/utils/types';
import { logValidity } from '@/utils/helpers';
import useSnackbar from '@/hooks/useSnackbar';
import { SnackbarVisibility } from '@/contexts/SnackbarProvider';

export interface ConfirmActivateRequest {
  token: string;
}

const TAG = '** Activate Panel';
function ActivatePanel(props: any) {
  const { setCurrentRegistrationHandler: setCurrentRegistrationState } = props;
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuth();
  const {
    request: activateRequest,
    response: activateResponse,
    error,
    setError,
    isLoading,
  } = useAxios();
  const { request: resendRequest } = useAxios();
  const { dispatchSnackbar } = useSnackbar();

  const [token, setToken] = useState('');

  useEffect(() => {
    if (!authUser) {
      navigateUnknownUser();
      return;
    }

    if (error) {
      dispatchSnackbar({
        show: SnackbarVisibility.SHOW,
        message: 'Incorrect token was Used! Please try again.',
        status: SuccessStatus.ERROR,
      });
      logValidity(TAG, Validity.FAIL, error);
      return;
    }

    if (!activateResponse || !isResponseType(activateResponse, 'success')) return;

    setAuthUser({
      ...authUser,
      active: activateResponse.data.user.active,
      token: activateResponse.token!,
    });
    dispatchSnackbar({
      show: SnackbarVisibility.SHOW,
      message: 'Your account has been activated!',
      status: SuccessStatus.SUCCESS,
    });
  }, [activateResponse, error]);

  function onResendHandler(): void {
    if (!authUser) {
      navigateUnknownUser();
      return;
    }

    resendRequest({
      method: 'post',
      url: `/api/v1/users/${authUser.id}/resendActivate`,
    });
    dispatchSnackbar({
      show: SnackbarVisibility.SHOW,
      message: 'New token has been resent! Please check your email.',
      status: SuccessStatus.SUCCESS,
    });
  }

  function onSubmitHandler(event: FormEvent): void {
    event.preventDefault();

    if (!authUser) {
      navigateUnknownUser();
      return;
    }

    const requestBody: ConfirmActivateRequest = {
      token,
    };

    activateRequest({
      method: 'patch',
      url: `/api/v1/users/${authUser.id}/confirmActivate`,
      requestBody,
    });
  }

  function navigateUnknownUser(): void {
    logValidity(TAG, Validity.FAIL, 'Unknown user. Navigating away to login.');
    navigate('/auth');
  }

  return (
    <div className={styles.panel}>
      <div className={styles.panel__section}>
        <h3 className={`${styles.subheader} ${styles['heading-3']}`}>
          We have sent a code to:
        </h3>
        <h3 className={`${styles['subheader--highlight']} ${styles['heading-3EB']}`}>
          {authUser?.email ?? 'unknown user'}
        </h3>
        <p className={`${styles.caption} ${styles['body-1']}`}>
          Give it a check! This verification is required for the creation of your account.
        </p>
      </div>
      <div className={styles.panel__section}>
        <form className={styles.form} onSubmit={(event: FormEvent) => onSubmitHandler(event)}>
          <div className={styles.form__section}>
            <div className={styles.form__inputs}>
              <PinTokenInputs
                token={token}
                setToken={setToken}
                isError={!!error}
                onChangeHandler={() => setError(null)}
              />
            </div>
            <div className={`${styles.form__alt} ${styles['u-flex-row']}`}>
              <p className={`${styles['body-3']}`}>
                Didn't get a code?&nbsp;
                <span
                  className={`${styles.prompt__highlight} ${styles['body-3B']}`}
                  onClick={onResendHandler}
                >
                  Resend
                </span>
                .
              </p>
            </div>
          </div>
          <div className={`${styles.form__section}`}>
            <CommonButton
              isLoading={isLoading}
              isError={!!error}
              isSubmit={true}
              size='lg'
              color='primary'
              onClickHandler={onSubmitHandler}
            >
              Verify Account
            </CommonButton>

            <p className={`${styles.prompt} ${styles['body-3']}`}>
              Using a different account?{' '}
              <Link
                to='/auth'
                className={`${styles.prompt__highlight} ${styles['body-3B']}`}
                onClick={() => {
                  setCurrentRegistrationState(RegistrationStatus.LOGIN);
                  // TODO: call logout handler here.
                }}
              >
                Log Out
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ActivatePanel;
