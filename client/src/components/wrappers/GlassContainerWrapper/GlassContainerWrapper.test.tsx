import { render, screen } from '../../../utils/testing-library-utils';
import GlassContainerWrapper from './GlassContainerWrapper';
const childItem: JSX.Element = (
  <div
    style={{
      height: '200px',
      width: '200px',
    }}
  ></div>
);

describe('Glass Container Wrapper', () => {
  test('Wrapper should render with correct height and width', () => {
    render(<GlassContainerWrapper>{childItem}</GlassContainerWrapper>);

    const wrapper = screen.getByTestId(/wrapper/i);
    expect(wrapper).toBeInTheDocument();
  });
});
