import { Preview } from '@storybook/react';
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
        <SnackbarProvider>
          <MemoryRouter>
            <Story />
          </MemoryRouter>
        </SnackbarProvider>
      </ThemeProvider>
    ),
  ],
};

export default preview;
