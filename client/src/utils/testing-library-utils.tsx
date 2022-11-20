import React, { FC } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { AuthProvider } from '../contexts/AuthProvider';
import { BrowserRouter } from 'react-router-dom';

const nestedProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  );
};

const customRender = (ui: JSX.Element, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: nestedProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
