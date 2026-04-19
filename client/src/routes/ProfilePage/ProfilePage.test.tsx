import AuthContext from '@/contexts/AuthProvider';
import { render, screen } from '../../utils/testing-library-utils';
import ProfilePage from './ProfilePage';
import { AccountStatus, UserRoles } from '@backend/types';

test('sample render test value for ProfilePage', () => {
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
      <ProfilePage />
    </AuthContext.Provider>
  );
  const pandingPageTestText = screen.getByText(/Profile Page/i);
  expect(pandingPageTestText).toBeInTheDocument();
});
