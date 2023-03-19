import styles from './BouncingCirclesLoading.module.scss';

interface BouncingCirclesLoadingProps {
  size: 'small' | 'medium' | 'large';
}
function BouncingCirclesLoading(props: BouncingCirclesLoadingProps) {
  const { size } = props;

  return (
    <div
      className={`${styles.container} ${styles[`container--${size}`]}`}
      data-testid='container'
    >
      <div className={`${styles.circle} ${styles[`circle--${size}`]}`} data-testid='circle' />
      <div className={`${styles.circle} ${styles[`circle--${size}`]}`} />
      <div className={`${styles.circle} ${styles[`circle--${size}`]}`} />
      <div className={`${styles.shadow} ${styles[`shadow--${size}`]}`} data-testid='shadow' />
      <div className={`${styles.shadow} ${styles[`shadow--${size}`]}`} />
      <div className={`${styles.shadow} ${styles[`shadow--${size}`]}`} />
    </div>
  );
}

export default BouncingCirclesLoading;
