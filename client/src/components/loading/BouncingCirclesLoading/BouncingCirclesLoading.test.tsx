import { render, screen } from '../../../utils/testing-library-utils';
import BouncingBallsLoading from './BouncingCirclesLoading';

test('Display Correct Sized Loading Screen', () => {
  render(<BouncingBallsLoading size='large' />, {});

  expect(screen.getByTestId(/container/i)).toBeInTheDocument();
  expect(screen.getByTestId(/circle/i)).toBeInTheDocument();
  expect(screen.getByTestId(/shadow/i)).toBeInTheDocument();
});
