import IconWrapper, { IconProps } from '../IconWrapper';

function AddIcon(props: IconProps) {
  const pathNames = {
    fillPathArr: [
      'M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z',
    ],
    outlinePathArr: ['M12 4.5v15m7.5-7.5h-15'],
  };

  return <IconWrapper {...props}>{pathNames}</IconWrapper>;
}

export default AddIcon;
