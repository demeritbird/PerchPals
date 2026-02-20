import { render, screen } from '../../../utils/testing-library-utils';
import ProfileImage from './ProfileImage';

test('Display Profile Image', () => {
  render(<ProfileImage src='' size='lg' />, {});

  expect(screen.getByTestId(/profile/i)).toBeInTheDocument();
});
