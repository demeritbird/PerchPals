import { render, screen } from '../../../utils/testing-library-utils';
import ScrollOverflowFadeWrapper from './ScrollOverflowFadeWrapper';

const childItem: JSX.Element = (
  <div
    style={{
      height: '200px',
      width: '200px',
    }}
  ></div>
);

describe('Scroll Overflow Fade Wrapper', () => {
  test('Wrapper should render', () => {
    render(<ScrollOverflowFadeWrapper>{childItem}</ScrollOverflowFadeWrapper>);

    const wrapper = screen.getByTestId(/wrapper/i);
    expect(wrapper).toBeInTheDocument();
  });
});
