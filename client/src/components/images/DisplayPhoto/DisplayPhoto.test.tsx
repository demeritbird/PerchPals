import { render, screen } from '../../../utils/testing-library-utils';
import DisplayPhoto from './DisplayPhoto';

test('Display Display Photo', () => {
  render(<DisplayPhoto src='' size='lg' />, {});

  expect(screen.getByTestId(/profile/i)).toBeInTheDocument();
});
