import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from './LandingPage';

test('sample render test value for landingpage', () => {
  render(<LandingPage />, { wrapper: BrowserRouter });
  const landingPageTestText = screen.getByText(/Landing Page/i);
  expect(landingPageTestText).toBeInTheDocument();
});
