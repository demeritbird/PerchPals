import { TEST_STRING } from 'src/utils/constants';
import { render, screen } from '../../../utils/testing-library-utils';
import Snackbar from './Snackbar';
import { SuccessStatus } from '@/utils/types';
import { SnackbarVisibility } from '@/contexts/SnackbarProvider';

test('render snackbar', () => {
  render(
    <Snackbar
      show={SnackbarVisibility.SHOW}
      message={TEST_STRING}
      status={SuccessStatus.SUCCESS}
    ></Snackbar>
  );

  const component = screen.getByText(/testvalue/i);
  expect(component).toBeInTheDocument();
});
