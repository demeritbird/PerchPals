import { render, screen } from '../../../utils/testing-library-utils';

import SnackbarProvider from '@/contexts/SnackbarProvider';

// TODO: add more tests for different states and dropping width bar

const setup = () => {
  const { container } = render(<SnackbarProvider></SnackbarProvider>); // provider comes with snackbar

  return { container };
};

test('render snackbar', () => {
  const { container } = setup();
  const message = screen.getByRole('paragraph');

  expect(container).toBeInTheDocument();
  expect(message).toBeInTheDocument();
});
