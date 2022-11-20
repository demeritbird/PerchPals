import { render, screen } from '../../utils/testing-library-utils';
import LandingPage from './LandingPage';

test('sample render test value for landingpage', () => {
  render(<LandingPage />);
  const landingPageTestText = screen.getByText(/Landing Page/i);
  expect(landingPageTestText).toBeInTheDocument();
});
