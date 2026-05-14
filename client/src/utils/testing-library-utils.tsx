import React, { FC } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '@/hooks/useAuth';
import { AccountStatus, UserRoles } from '@backend/types';

const nestedProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AuthContext.Provider
        value={{
          authUser: {
            id: '123',
            email: 'newuser@example.com',
            name: 'newuser',
            photo: 'default-user.jpeg',
            role: UserRoles.USER,
            token: 'token',
            active: AccountStatus.PENDING,
          },
          setAuthUser: vi.fn(),
          persist: 'true',
          setPersist: vi.fn(),
        }}
      >
        {children}
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

const customRender = (ui: JSX.Element, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: nestedProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
