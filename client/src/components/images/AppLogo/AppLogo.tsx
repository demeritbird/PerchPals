import { Size } from 'src/utils/types';
import styles from './AppLogo.module.scss';

interface AppLogoProps {
  size: Size;
}

/**
 * @desc
 * image showing the main logo of perchpals
 *
 * @param {Size} props.size size of image shown
 *
 * @example
 * <AppLogo size='medium'>
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
