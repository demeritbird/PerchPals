import styles from './ProfileImage.module.scss';

interface ProfileImageProps {
  imageSrc: string; // base64 string carrying image info
  caption?: string; // string to show when hovered over
  isEdit?: boolean; // shows edit icon on hover, can be showed w caption
  hasBorder?: boolean; // shows ring border around.
  size: 'small' | 'medium' | 'large';
}
function ProfileImage(props: ProfileImageProps) {
  const { imageSrc = '', caption = null, isEdit = false, hasBorder = false, size } = props;
  return (
    <div className={`${styles.profile} ${hasBorder ? styles.profile__border : ''}`}>
      <figure className={styles.profile__shape} data-testid='profileimage'>
        <img
          className={styles.profile__image}
          src={`data:image/png;base64, ${imageSrc}`}
          alt='Profile Display'
        />
        <figcaption className={styles.profile__caption}>{caption}</figcaption>
      </figure>
    </div>
  );
}
export default ProfileImage;
