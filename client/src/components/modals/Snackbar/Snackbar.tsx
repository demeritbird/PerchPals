import styles from './Snackbar.module.scss';
import { AccentColor, SuccessStatus } from '@/utils/types';
import CircleTickIcon from '@/components/icons/CircleTickIcon';
import CircleCrossIcon from '@/components/icons/CircleCrossIcon';
import { SnackbarVisibility } from '@/contexts/SnackbarProvider';
import { useEffect, useRef } from 'react';
import useSnackbar from '@/hooks/useSnackbar';

interface SnackbarProps {
  show: SnackbarVisibility;
  message: string;
  status: SuccessStatus;
}

function Snackbar(props: SnackbarProps) {
  const { show, message, status } = props;
  const { dispatch } = useSnackbar();

  const progressRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const SNACKBAR_SHOW_DURATION = 5;
  const SNACKBAR_REFRESH_INTERVAL = 100;

  const isShowSnackbar = show === SnackbarVisibility.SHOW;

  useEffect(() => {
    switch (show) {
      case SnackbarVisibility.SHOW:
        countDown();
        break;
      case SnackbarVisibility.HIDE:
        stopCountdown();
        break;
    }

    return () => stopCountdown();
    // adding stopCountdown to reset timer everytime new dispatch is sent, even if same state
  }, [show, message, status, stopCountdown]);

  /**
   * @returns theme colour based on current state of snackbar
   */
  function getSnackbarColor(): AccentColor {
    switch (status) {
      case SuccessStatus.SUCCESS:
        return 'green';
      case SuccessStatus.ERROR:
        return 'red';
    }
  }

  /**
   * @returns icon element using current state of snackbar
   */
  function getSnackbarIcon(): JSX.Element {
    switch (status) {
      case SuccessStatus.SUCCESS:
        return <CircleTickIcon size='sm' color='green-light' type='fill' />;
      case SuccessStatus.ERROR:
        return <CircleCrossIcon size='sm' color='red-light' type='fill' />;
    }
  }

  /**
   * reset the snackbar's timer and width, decreasing over time
   * when the countdown is complete, it will start its cleanup function stopCountdown
   */
  function countDown(): void {
    stopCountdown();

    if (!progressRef.current) return;
    progressRef.current.style.width = '100%';

    intervalRef.current = setInterval(() => {
      if (!progressRef.current) return;

      const width = parseInt(progressRef.current.style.width);

      if (width <= 0) {
        dispatch({
          show: SnackbarVisibility.HIDE,
        });
        stopCountdown();
        return;
      }

      progressRef.current.style.width = `${width - 10 / SNACKBAR_SHOW_DURATION}%`;
    }, SNACKBAR_REFRESH_INTERVAL);
  }

  /**
   * remove the current progress timer
   */
  function stopCountdown(): void {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  return (
    <div
      className={`${styles[`container`]}
                  ${isShowSnackbar ? styles[`container--show`] : styles[`container--hide`]}`}
    >
      <div className={`${styles[`display`]} ${styles[`display--${getSnackbarColor()}`]}`}>
        {getSnackbarIcon()}
        <p
          className={`heading-3 ${styles.message} ${styles[`message--${getSnackbarColor()}`]}`}
        >
          {message}
        </p>
      </div>
      <div className={`${styles['progress-bar']}`}>
        <div
          ref={progressRef}
          className={`${styles['progress-bar__current']} 
                      ${styles[`progress-bar__current--${getSnackbarColor()}`]}`}
        ></div>
      </div>
    </div>
  );
}

export default Snackbar;
