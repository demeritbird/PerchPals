import { GreyscaleColor } from '@/utils/types';
import styles from './HorizontalDivider.module.scss';

export interface HorizontalDividerProps {
  color: GreyscaleColor;
}

/**
 * simple divider line
 * @param {GreyscaleColor} props.color color of divider line
 * @example
 * <HorizontalDivider color='white' />
 */
function HorizontalDivider(props: HorizontalDividerProps) {
  const { color } = props;

  return <div className={`${styles.divider} ${styles[`divider--${color}`]}`} />;
}

export default HorizontalDivider;
