import App from './App';
import { render, screen } from './utils/testing-library-utils';

test('sample render test', () => {
  render(<App />, {});
  const textElement = screen.getByText(/Dashboard Page/i);
  expect(textElement).toBeInTheDocument();
});
