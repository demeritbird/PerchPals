import styles from './Snackbar.module.scss';
import { AccentColor, SuccessStatus } from '@/utils/types';
import CircleTickIcon from '@/components/icons/CircleTickIcon';
import CircleCrossIcon from '@/components/icons/CircleCrossIcon';
import { SnackbarVisibility } from '@/contexts/SnackbarProvider';

interface SnackbarProps {
  show: SnackbarVisibility;
  message: string;
  status: SuccessStatus;
}

function Snackbar(props: SnackbarProps) {
  const { show, message, status } = props;
  const isShowSnackbar = show === SnackbarVisibility.SHOW;

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

  return (
    <div
      className={`${styles.container} ${styles[`container--${getSnackbarColor()}`]}
                  ${isShowSnackbar ? styles[`container--show`] : styles[`container--hide`]}`}
    >
      {getSnackbarIcon()}
      <p className={`heading-3 ${styles.message} ${styles[`message--${getSnackbarColor()}`]}`}>
        {message}
      </p>
    </div>
  );
}

export default Snackbar;
