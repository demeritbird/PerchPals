import { Fragment, MouseEventHandler } from 'react';
import BouncingCirclesLoading from '../../loading/BouncingCirclesLoading';
import styles from './CommonButton.module.scss';
import { Color, Size } from 'src/utils/types';

interface CommonButtonProps {
  children: string;
  color: Color;
  size: Omit<Size, 'sm'>;
  isLoading?: boolean;
  isError?: boolean;
  isSubmit?: boolean;
  onClickHandler: MouseEventHandler<HTMLButtonElement>;
}

/**
 * @desc
 * reusable button with different states
 *
 * @param {string} props.children text content used in button
 * @param {Color} props.color color of button
 * @param {Omit<Size, 'sm'>} props.size size of button
 * @param {boolean | undefined} props.isLoading toggles button loading state
 * @param {boolean | undefined} props.isError toggles button error state
 * @param {boolean | undefined} props.isSubmit will fire a submit event if toggled on
 * @param {MouseEventHandler<HTMLButtonElement>} props.onClickHandler
 * ref of function passed from parent to listen to any button clicks
 *
 * @example
 * <CommonButton
    isLoading={loading}
    isError={error != null}
    isSubmit={true}
    size='lg'
    color='primary'
    onClickHandler={()=> {}}
   >
     example
   </CommonButton>
*/
function CommonButton(props: CommonButtonProps) {
  const { children, color, size, isLoading, isError, isSubmit, onClickHandler } = props;

  const getBouncingCircleLoadingSize = (size: Omit<Size, 'sm'>): Partial<Size> => {
    switch (size) {
      case 'md':
        return 'sm';
      case 'lg':
        return 'md';
      default:
        return 'sm';
    }
  };
  const getButtonContent = (): JSX.Element => {
    if (isLoading)
      return (
        <BouncingCirclesLoading size={getBouncingCircleLoadingSize(size)} color={color} />
      );
    return <Fragment>{children}</Fragment>;
  };

  const getButtonFontStyle = (size: Omit<Size, 'sm'>): string => {
    switch (size) {
      case 'md':
        return 'body-1B';
      case 'lg':
        return 'heading-2EB';
      default:
        return '';
    }
  };

  return (
    <button
      type={isSubmit ? 'submit' : undefined}
      onClick={onClickHandler}
      className={`${styles.btn} ${styles[`btn--${size}`]} ${getButtonFontStyle(size)} 
                  ${!isError || isLoading ? styles[`btn--${color}`] : styles['btn--error']}`}
    >
      <span className={styles['btn__text']}>{getButtonContent()}</span>
    </button>
  );
}

export default CommonButton;
