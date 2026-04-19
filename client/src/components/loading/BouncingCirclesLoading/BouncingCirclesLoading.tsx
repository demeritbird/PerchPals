import { GreyscaleColor, MainColor, Size } from 'src/utils/types';
import styles from './BouncingCirclesLoading.module.scss';

interface BouncingCirclesLoadingProps {
  size: Size;
  color: MainColor | Extract<'grey', GreyscaleColor>;
}
function BouncingCirclesLoading(props: BouncingCirclesLoadingProps) {
  const { size, color } = props;

  return (
    <div
      className={`${styles.container} ${styles[`container--${size}`]}`}
      data-testid='container'
    >
      <div
        className={`${styles.circle} 
                    ${styles[`circle--${color}`]} ${styles[`circle--${size}`]}`}
        data-testid='circle'
      />
      <div
        className={`${styles.circle} 
                    ${styles[`circle--${color}`]} ${styles[`circle--${size}`]}`}
      />
      <div
        className={`${styles.circle} 
                    ${styles[`circle--${color}`]} ${styles[`circle--${size}`]}`}
      />
      <div className={`${styles.shadow} ${styles[`shadow--${size}`]}`} data-testid='shadow' />
      <div className={`${styles.shadow} ${styles[`shadow--${size}`]}`} />
      <div className={`${styles.shadow} ${styles[`shadow--${size}`]}`} />
    </div>
  );
}

export default BouncingCirclesLoading;
