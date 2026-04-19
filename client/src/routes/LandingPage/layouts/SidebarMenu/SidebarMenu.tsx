import ExitIcon from '@/components/icons/ExitIcon';
import styles from './SidebarMenu.module.scss';
import useAuth from '@/hooks/useAuth';
import ProfileImage from '@/components/images/ProfileImage';
import NavigationItem from '@/components/items/NavigationItem/NavigationItem';
import HouseIcon from '@/components/icons/HouseIcon/HouseIcon';
import UserIcon from '@/components/icons/UserIcon';
import { useLocation } from 'react-router-dom';
import HorizontalDivider from '@/components/dividers/HorizontalDivider';

function SidebarMenu() {
  const { authUser } = useAuth();
  const location = useLocation();

  return (
    <aside className={`${styles.container} u-gap-y--2xl`}>
      <div className={`${styles.header}`}>
        <h2 className={`${styles.header__text} heading-2`}>perchpals</h2>
        <div className={`${styles.header__logout}`}>
          <ExitIcon size='xs' type='outline' color='grey-light' hoverColor='white'></ExitIcon>
        </div>
      </div>
      <div className={`${styles.profile} u-gap-y--md`}>
        <ProfileImage size='lg' src={authUser!.photo}></ProfileImage>
        <div className={`u-flex-col u-gap-y--sm`}>
          <h3 className={`${styles.profile__name} heading-3`}>{authUser!.name}</h3>
          <p className={`${styles.profile__email} body-3 `}>{authUser!.email}</p>
        </div>
      </div>
      <nav className={`${styles.navigation}`}>
        <ul className='u-flex-col u-gap-y--lg'>
          <NavigationItem
            active={location.pathname === '/landingpage'}
            icon={HouseIcon}
            url={'/landingpage'}
          >
            Dashboard
          </NavigationItem>
          <NavigationItem
            active={location.pathname === '/landingpage/profile'}
            icon={UserIcon}
            url={'/landingpage/profile'}
          >
            Profile
          </NavigationItem>
        </ul>
      </nav>
      <HorizontalDivider color='white'></HorizontalDivider>
      {/* TODO: create get all modules here */}
    </aside>
  );
}

export default SidebarMenu;
