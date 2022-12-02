import { Fragment, MouseEventHandler } from 'react';
import BouncingCirclesLoading from '../../loadingstates/BouncingCirclesLoading';

type AuthButtonProps = {
  children: string | JSX.Element;
  isLoading?: boolean;
  isError?: boolean;
  onClickHandler?: MouseEventHandler<HTMLButtonElement>;
};
function AuthButton(props: AuthButtonProps) {
  const { children, isLoading, isError, onClickHandler } = props;

  const currentState = (): JSX.Element => {
    if (isLoading) return <BouncingCirclesLoading size='small' />;
    if (isError) return <p>error</p>;

    return <Fragment>{children}</Fragment>;
  };

  return (
    <button type='submit' onClick={onClickHandler}>
      {currentState()}
    </button>
  );
}

export default AuthButton;
