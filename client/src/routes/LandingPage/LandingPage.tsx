import { Outlet } from 'react-router-dom';
import styles from './LandingPage.module.scss';
import SidebarMenu from './layouts/SidebarMenu/SidebarMenu';

function LandingPage() {
  return (
    <div className={`${styles.screen}`}>
      <SidebarMenu />
      <Outlet />
    </div>
  );
}

export default LandingPage;
