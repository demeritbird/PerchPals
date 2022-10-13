import React from 'react';
import { render, screen } from '@testing-library/react';
import Help from './Help';

test('renders testhelp react link', () => {
  render(<Help />);
  const linkElement = screen.getByText(/HELP/i);
  expect(linkElement).toBeInTheDocument();
});
