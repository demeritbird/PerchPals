import { fireEvent, render, screen } from '@/utils/testing-library-utils';
import SidebarMenu from './SidebarMenu';
import navStyles from '@/components/items/NavigationItem/NavigationItem.module.scss';

const setup = () => {
  render(<SidebarMenu />);

  const [DashboardLink, ProfileLink] = screen.getAllByRole('link');
  return { DashboardLink, ProfileLink };
};

test('navigation items should light up when clicked on', () => {
  const { DashboardLink, ProfileLink } = setup();

  fireEvent.click(ProfileLink);
  expect(DashboardLink).not.toHaveClass(navStyles['item__link--active']);
  expect(ProfileLink).toHaveClass(navStyles['item__link--active']);

  fireEvent.click(DashboardLink);
  expect(ProfileLink).not.toHaveClass(navStyles['item__link--active']);
  expect(DashboardLink).toHaveClass(navStyles['item__link--active']);
});
