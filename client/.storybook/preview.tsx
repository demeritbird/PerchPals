import { Preview } from '@storybook/react';
import AuthProvider from './../src/contexts/AuthProvider';
import SnackbarProvider from './../src/contexts/SnackbarProvider';
import ThemeProvider from './../src/contexts/ThemeProvider';
import { MemoryRouter } from 'react-router-dom';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <AuthProvider
          value={{
            id: '123',
            email: 'newuser@example.com',
            name: 'newuser',
            photo: '/img/default-user.jpeg',
            role: 'user',
            token: 'token',
            active: 'pending',
          }}
        >
          <SnackbarProvider>
            <MemoryRouter>
              <Story />
            </MemoryRouter>
          </SnackbarProvider>
        </AuthProvider>
      </ThemeProvider>
    ),
  ],
};

export default preview;
