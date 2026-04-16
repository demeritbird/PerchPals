import { ExtendedSize } from 'src/utils/types';
import styles from './AppLogo.module.scss';

interface AppLogoProps {
  size: ExtendedSize;
}

/**
 * @desc
 * image showing the main logo of perchpals
 *
 * @param {ExtendedSize} props.size size of image shown
 *
 * @example
 * <AppLogo size='md'>
 */
function AppLogo(props: AppLogoProps) {
  const { size } = props;
  return (
    <img
      loading='lazy'
      src={'/img/applogo/applogo-1x.png 1x'}
      srcSet={`/img/applogo/applogo-1x.png 1x, 
                  /img/applogo/applogo-2x.png 2x`}
      alt='application logo'
      className={`${styles.image} ${styles[`image--${size}`]} `}
      data-testid='image'
    />
  );
}

export default AppLogo;
