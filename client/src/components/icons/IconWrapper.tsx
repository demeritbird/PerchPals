import { Fragment } from 'react';
import styles from './IconWrapper.module.scss';

export type IconSize = 'small' | 'medium';
export type IconStyle = 'fill' | 'outline';
export type IconColour = 'black' | 'blue' | 'white' | 'grey-dark' | 'grey-light';

export interface IconProps {
  size: IconSize;
  type: IconStyle;
  colour: IconColour;
  isInteractive?: boolean;
}
interface IconWrapperProps extends IconProps {
  children: {
    fillPathArr: string[];
    outlinePathArr: string[];
  };
}
function IconWrapper(props: IconWrapperProps) {
  const { size, type, colour, isInteractive, children: pathName } = props;

  const fillIcon = (
    <svg
      viewBox='0 0 24 24'
      fill='currentColor'
      className={`${isInteractive ? `${styles['icon--interact']}` : ''} 
                  ${styles[`icon`]}  ${styles[`icon--${size.toLowerCase()}`]} 
                  ${styles[`icon--${colour}`]}`}
    >
      {pathName.fillPathArr.map((curPath, idx) => (
        <path key={idx} fillRule='evenodd' clipRule='evenodd' d={curPath} />
      ))}
    </svg>
  );
  const outlineIcon = (
    <svg
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={1.6}
      className={`${isInteractive ? `${styles['icon--interact']}` : ''} 
                  ${styles[`icon`]}  ${styles[`icon--${size.toLowerCase()}`]} 
                  ${styles[`icon--${colour}`]}`}
    >
      {pathName.outlinePathArr.map((curPath, idx) => (
        <path key={idx} strokeLinecap='round' strokeLinejoin='round' d={curPath} />
      ))}
    </svg>
  );

  const IconState = {
    fill: fillIcon,
    outline: outlineIcon,
  };

  return <Fragment>{IconState[type]}</Fragment>;
}

export default IconWrapper;
