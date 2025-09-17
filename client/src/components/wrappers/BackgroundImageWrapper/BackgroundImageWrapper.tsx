import styles from './BackgroundImageWrapper.module.scss';

interface BackgroundImageWrapperProps {
  active: boolean;
  children: JSX.Element;
}

/**
 * @desc
 * this wrapper allows children elements to be centered within a predefined background image.
 *
 * @param {boolean} props.active if true, enlarge and add a translucent overlay
 * @param {JSX.Element} props.children child elements to be centered within background.
 *
 * @example
 * <BackgroundImageWrapper active={true}>
    <div></div>
   </BackgroundImageWrapper>
 */
function BackgroundImageWrapper(props: BackgroundImageWrapperProps): JSX.Element {
  const { active, children } = props;

  return (
    <div className={`${styles.container}`}>
      <img
        loading='lazy'
        src={'/img/background/background-1x.png 1x'}
        srcSet={`/img/background/background-1x.png 1x, 
                  /img/background/background-2x.png 2x, 
                  /img/background/background-4x.png 3x`}
        alt='background of application'
        className={`${styles.background} 
                    ${styles['background-image']} 
                    ${active && styles['background-image--expanded']}`}
      />
      <div
        data-testid='overlay'
        className={`${styles.background} 
                    ${active && styles['background-overlay']}`}
      ></div>
      {children}
    </div>
  );
}

export default BackgroundImageWrapper;
