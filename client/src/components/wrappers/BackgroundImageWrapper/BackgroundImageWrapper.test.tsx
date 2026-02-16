import { render, screen } from '../../../utils/testing-library-utils';
import BackgroundImageWrapper from './BackgroundImageWrapper';
import styles from './BackgroundImageWrapper.module.scss';

const childItem: JSX.Element = (
  <div
    style={{
      backgroundColor: 'white',
      height: '200px',
      width: '200px',
    }}
  ></div>
);

describe('Background Image Wrapper', () => {
  test('background should render on load', () => {
    render(<BackgroundImageWrapper active={false}>{childItem}</BackgroundImageWrapper>);

    const bgImage = screen.getByRole('img', { name: /background of application/i });
    expect(bgImage).toBeInTheDocument();

    const overlay = screen.getByTestId(/overlay/i);
    expect(overlay).toBeInTheDocument();
  });

  test('background should scale and overlay occur when user enters target route', () => {
    const { rerender } = render(
      <BackgroundImageWrapper active={false}>{childItem}</BackgroundImageWrapper>
    );

    const bgImage = screen.getByRole('img', { name: /background of application/i });
    expect(bgImage).toHaveClass(styles.background, styles['background-image']);
    expect(bgImage).not.toHaveClass(styles['background-image--expanded']);

    const overlay = screen.getByTestId(/overlay/i);
    expect(overlay).not.toHaveClass(styles['background-overlay']);

    rerender(<BackgroundImageWrapper active={true}>{childItem}</BackgroundImageWrapper>);

    expect(bgImage).toHaveClass(styles['background-image--expanded']);
    expect(overlay).toHaveClass(styles['background-overlay']);
  });
});
