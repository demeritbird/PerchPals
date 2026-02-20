import { Fragment } from 'react';
import styles from './IconWrapper.module.scss';
import { ColorWithAccents, Size } from 'src/utils/types';

export type IconSize = Size | 'fill';
export type IconStyle = 'fill' | 'outline';
export type IconColor = ColorWithAccents;

export interface IconProps {
  size: IconSize;
  type: IconStyle;
  color: IconColor;
  isInteractive?: boolean;
}
interface IconWrapperProps extends IconProps {
  children: {
    fillPathArr: string[];
    outlinePathArr: string[];
  };
}
function IconWrapper(props: IconWrapperProps) {
  const { size, type, color, isInteractive, children: pathName } = props;

  const fillIcon = (
    <svg
      data-testid='icon'
      viewBox='0 0 24 24'
      fill='currentColor'
      className={`${isInteractive ? `${styles['icon--interact']}` : ''} 
                  ${styles[`icon`]}  ${styles[`icon--${size.toLowerCase()}`]} 
                  ${styles[`icon--${color}`]}`}
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
                  ${styles[`icon--${color}`]}`}
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
