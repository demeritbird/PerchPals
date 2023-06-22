import { render, screen } from '../../../utils/testing-library-utils';
import ProfileImage from './ProfileImage';

test('Display Profile Image', () => {
  render(<ProfileImage imageSrc='' size='large' />, {});

  expect(screen.getByTestId(/profile/i)).toBeInTheDocument();
});
