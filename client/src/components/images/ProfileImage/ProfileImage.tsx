import CameraIcon from '../../icons/CameraIcon/CameraIcon';
import styles from './ProfileImage.module.scss';

interface ProfileImageProps {
  imageSrc: string; // base64 string carrying image info
  caption?: string; // string to show when hovered over
  isEdit?: boolean; // shows edit icon on hover, can be showed w caption
  hasBlur?: boolean;
  hasBorder?: boolean; // shows ring border around.
  size: 'small' | 'medium' | 'large';
}
function ProfileImage(props: ProfileImageProps) {
  const {
    imageSrc = '',
    caption = null,
    isEdit = false,
    hasBlur = false,
    hasBorder = false,
    size,
  } = props;

  return (
    <div className={`${styles.profile} ${hasBorder && styles.profile__border}`}>
      <figure className={styles.profile__shape} data-testid='profileimage'>
        <img
          className={`${styles.profile__image} ${hasBlur && styles['profile__image--blur']}`}
          src={imageSrc}
          alt='Profile Display'
        />
        {size !== 'small' && (
          <div className={styles.profile__items}>
            {isEdit && <CameraIcon size='small' type='outline' colour='white' />}
            <figcaption className={styles['profile__caption--white']}>{caption}</figcaption>
          </div>
        )}
      </figure>
    </div>
  );
}
export default ProfileImage;
