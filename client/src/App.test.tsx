import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('sample render test', () => {
  render(<App />, { wrapper: BrowserRouter });
  const textElement = screen.getByText(/Log In/i);
  expect(textElement).toBeInTheDocument();
});
