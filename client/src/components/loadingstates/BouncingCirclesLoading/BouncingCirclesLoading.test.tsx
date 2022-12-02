import { render, screen } from '../../../utils/testing-library-utils';
import BouncingBallsLoading from './BouncingCirclesLoading';

test('Display Correct Sized Loading Screen', () => {
  render(<BouncingBallsLoading size='large' />, {});

  expect(screen.getByTestId('container')).toHaveClass(
    `_container_3d0a03 _container--large_3d0a03`
  );
  expect(screen.getByTestId('ball')).toHaveClass(`_ball_3d0a03 _ball--large_3d0a03`);
  expect(screen.getByTestId('shadow')).toHaveClass(`_shadow_3d0a03 _shadow--large_3d0a03`);
});
