import styles from './ScrollOverflowFadeWrapper.module.scss';

/**
 * allows vertical overflow of a container to fade gracefully when overflowing
 * out of container view instead of just being cut off.
 * @param props.children React elements within this wrapper
 */
function ScrollOverflowFadeWrapper(props: React.PropsWithChildren) {
  const { children } = props;

  return (
    <div data-testid='wrapper' className={styles.container}>
      <div className={styles.fade}>{children}</div>
    </div>
  );
}

export default ScrollOverflowFadeWrapper;
