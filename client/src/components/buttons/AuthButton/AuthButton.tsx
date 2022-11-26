import { MouseEventHandler } from 'react';

type AuthButtonProps = {
  children: string | JSX.Element;
  onClickHandler?: MouseEventHandler<HTMLButtonElement>;
};
function AuthButton(props: AuthButtonProps) {
  const { children, onClickHandler } = props;

  return (
    <button type='submit' onClick={onClickHandler}>
      {children}
    </button>
  );
}

export default AuthButton;
