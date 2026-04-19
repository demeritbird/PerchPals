import { Link } from 'react-router-dom';
import styles from './NavigationItem.module.scss';
import { IconProps } from '@/components/icons/IconWrapper';

export interface NavigationItemProps {
  active: boolean;
  icon: React.ComponentType<IconProps>;
  url: string;
  children: string;
}

/**
 * @param {boolean} props.active check if icon is selected
 * @param {React.ComponentType<IconProps>} props.icon icon to be used next to label
 * @param {string} props.url where to navigate user to on click
 * @param {string} props.children label
 * @example
 * <NavigationItem
     active={location.pathname === '/landingpage'}
     icon={HouseIcon}
     url={'/landingpage'}
   >
 */
function NavigationItem(props: NavigationItemProps) {
  const { active, url, icon: Icon, children } = props;

  return (
    <li className={`${styles.item} u-gap-y--lg`}>
      <Icon type={'fill'} size='xs' color={active ? 'secondary' : 'white'}></Icon>
      <Link
        to={url}
        className={`${styles.item__link} body-2 
                    ${active && styles[`item__link--active`]}`}
      >
        {children}
      </Link>
    </li>
  );
}

export default NavigationItem;
