import { ExtendedSize } from 'src/utils/types';
import CameraIcon from '../../icons/CameraIcon/CameraIcon';
import styles from './ProfileImage.module.scss';
import { ChangeEventHandler, Fragment } from 'react';

type ProfileImageProps = {
  src?: string;
} & (
  | { size: Extract<ExtendedSize, 'xs'>; edit?: never; caption?: never } // xs size cannot have fileRef or edited.
  | {
      size: Exclude<ExtendedSize, 'xs'>;
      edit?: {
        fileRef: React.RefObject<HTMLInputElement>;
        onChangeHandler: ChangeEventHandler<HTMLInputElement>;
      };
      caption?: string;
    }
);

/**
 * @desc
 * displays profile image of user with uploading new image function
 *
 * @param {string} props.src base64 string of the image
 * @param {ExtendedSize} props.size changes size of image
 * @param {boolean | never} props.isEdit toggles icon that appears on edit
 * @param {string | never} props.caption text appearing under icon on edit
 *
 * @example
 * <ProfileImage
 *   src={`data:image/png;base64, ${authUser!.photo}`}
 *   size='lg'
 *   isEdit={{ fileRef: profileImageFileRef, onChangeHandler: updateProfileImage }}
 *   caption='edit'
 * />
 */
function ProfileImage(props: ProfileImageProps) {
  const { src, caption = null, edit = null, size } = props;

  const encodeImageToDataUrl = (url: string) => {
    return `data:image/png;base64, ${url}`;
  };

  const useCandidateImageAsPhoto = (): string => {
    if (src) return encodeImageToDataUrl(src);
    return 'img/default-user.jpeg';
  };

  const baseProfileImageComponent: JSX.Element = (
    <div className={`${styles.profile} ${styles[`profile--${size}`]}`}>
      <figure className={styles.profile__shape} data-testid='profile'>
        <img
          className={`${styles.profile__image} ${edit?.fileRef && styles['profile__image--blur']}`}
          src={useCandidateImageAsPhoto()}
          alt='Display Profile of User'
        />
        {edit?.fileRef && (
          <div className={styles.profile__items}>
            <CameraIcon size='sm' type='outline' color='white' />
            <figcaption className={styles['profile__caption']}>{caption}</figcaption>
          </div>
        )}
      </figure>
    </div>
  );

  const editProfileImageFormWrapper: JSX.Element = (
    <form encType='multipart/form-data'>
      <label htmlFor='photo'>
        {baseProfileImageComponent}
        <input
          type='file'
          accept='image/*'
          id='photo'
          name='photo'
          ref={edit?.fileRef}
          onChange={(e) => edit?.onChangeHandler(e)}
          style={{ display: 'none' }}
        />
      </label>
    </form>
  );

  return (
    <Fragment>{!edit ? baseProfileImageComponent : editProfileImageFormWrapper}</Fragment>
  );
}
export default ProfileImage;
