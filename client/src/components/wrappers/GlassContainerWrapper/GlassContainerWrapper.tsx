import styles from './GlassContainerWrapper.module.scss';

/**
 * @desc div container with glass background/outline
 * @param props.children React elements within this wrapper
 */
function GlassContainerWrapper(props: React.PropsWithChildren): JSX.Element {
  const { children } = props;

  return (
    <section data-testid='wrapper' className={`${styles.wrapper}`}>
      {children}
    </section>
  );
}

export default GlassContainerWrapper;
