import { render, screen } from '../../utils/testing-library-utils';
import ProfilePage from './ProfilePage';

test('sample render test value for ProfilePage', () => {
  render(<ProfilePage />);
  const pandingPageTestText = screen.getByText(/Profile Page/i);
  expect(pandingPageTestText).toBeInTheDocument();
});
