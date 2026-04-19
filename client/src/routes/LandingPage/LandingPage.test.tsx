import AuthContext from '@/contexts/AuthProvider';
import { render, screen } from '../../utils/testing-library-utils';
import LandingPage from './LandingPage';
import { AccountStatus, UserRoles } from '@backend/types';

test('sample render test value for landingpage', () => {
  render(
    <AuthContext.Provider
      value={{
        authUser: {
          id: '123',
          email: 'newuser@example.com',
          name: 'newuser',
          photo: 'default-user-base64.jpeg',
          role: UserRoles.USER,
          token: 'token',
          active: AccountStatus.PENDING,
        },
        setAuthUser: vi.fn(),
        persist: 'true',
        setPersist: vi.fn(),
      }}
    >
      <LandingPage />
    </AuthContext.Provider>
  );
  // const landingPageTestText = screen.getByText(/Landing Page/i);
  // expect(landingPageTestText).toBeInTheDocument();
});
