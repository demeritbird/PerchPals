import { Fragment } from 'react';
import styles from './IconWrapper.module.scss';

export type IconSize = 'SMALL' | 'MEDIUM';
export type IconStyle = 'FILL' | 'OUTLINE';
export type IconColour = 'black' | 'blue';

export interface IconProps {
  size: IconSize;
  type: IconStyle;
  colour: IconColour;
  isInteractive?: boolean;
}
interface IconWrapperProps extends IconProps {
  children: {
    fillPath: string;
    outlinePath: string;
  };
}
function IconWrapper(props: IconWrapperProps) {
  const { size, type, colour, isInteractive, children: pathName } = props;

  const fillIcon = (
    <svg
      viewBox='0 0 24 24'
      fill='currentColor'
      className={`${isInteractive ? `${styles['icon--interact']}` : ''} 
                  ${styles[`icon--${size}`]} ${styles[`icon--${colour}`]}`}
    >
      <path fillRule='evenodd' clipRule='evenodd' d={pathName.fillPath} />
    </svg>
  );
  const outlineIcon = (
    <svg
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={1.6}
      className={`${isInteractive ? `${styles['icon--interact']}` : ''} 
                  ${styles[`icon--${size}`]} ${styles[`icon--${colour}`]}`}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d={pathName.outlinePath} />
    </svg>
  );

  const IconState = {
    FILL: fillIcon,
    OUTLINE: outlineIcon,
  };

  return <Fragment>{IconState[type]}</Fragment>;
}
export default IconWrapper;
