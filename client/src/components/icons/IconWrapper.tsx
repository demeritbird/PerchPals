import styles from './IconWrapper.module.scss';
import { AllColors, ExtendedSize } from 'src/utils/types';

export type IconSize = ExtendedSize | 'fill';
export type IconStyle = 'fill' | 'outline';
export type IconColor = AllColors;

export interface IconProps {
  size: IconSize;
  type: IconStyle;
  color: IconColor;
  hoverColor?: IconColor;
}
interface IconWrapperProps extends IconProps {
  children: {
    fillPathArr: string[];
    outlinePathArr: string[];
  };
}
function IconWrapper(props: IconWrapperProps) {
  const { size, type, color, hoverColor, children: pathName } = props;

  const fillIcon = (
    <svg
      data-testid='icon'
      viewBox='0 0 24 24'
      fill='currentColor'
      className={`${styles[`icon`]}  ${styles[`icon--${size.toLowerCase()}`]} 
                  ${styles[`icon--${color}`]} ${styles[`icon-hover--${hoverColor}`]} `}
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
      className={`${styles[`icon`]}  ${styles[`icon--${size.toLowerCase()}`]} 
                  ${styles[`icon--${color}`]}  ${styles[`icon-hover--${hoverColor}`]}  `}
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

  return <div className={hoverColor && styles[`container-hover`]}>{IconState[type]}</div>;
}

export default IconWrapper;
