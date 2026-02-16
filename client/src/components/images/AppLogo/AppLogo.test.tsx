import { render, screen } from '../../../utils/testing-library-utils';
import AppLogo from './AppLogo';
import styles from './AppLogo.module.scss';

const IMAGE_FILE_PATH = '/img/applogo/applogo';

const SIZES = ['sm', 'md', 'lg'] as const;
test.each(SIZES)('renders application logo with %s size', (size) => {
  render(<AppLogo size={size} />);
  const image = screen.getByRole('img');

  expect(image).toHaveClass(styles[`image--${size}`]);
});

test('Display application logo containing correct image and relevant DPR', () => {
  render(<AppLogo size={SIZES[0]} />, {});
  const image = screen.getByRole('img');

  expect(image).toHaveAttribute('src', `${IMAGE_FILE_PATH}-1x.png 1x`);
  expect(image).toHaveAttribute(
    'srcset',
    expect.stringContaining(`${IMAGE_FILE_PATH}-1x.png 1x`)
  );
  expect(image).toHaveAttribute(
    'srcset',
    expect.stringContaining(`${IMAGE_FILE_PATH}-2x.png 2x`)
  );
});
