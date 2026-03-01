import { CurrentUser, Size, Validity } from 'src/utils/types';
import CameraIcon from '../../icons/CameraIcon/CameraIcon';
import styles from './ProfileImage.module.scss';
import { FormEvent, Fragment, useEffect, useRef, useState } from 'react';
import useAxios, { isResponseType } from 'src/hooks/useAxios';
import { logValidity } from 'src/utils/helpers';
import useAuth from 'src/hooks/useAuth';

type ProfileImageProps = {
  src: string;
} & (
  | { size: Extract<Size, 'xs'>; isEdit?: never; caption?: never } // xs size cannot have isEdit
  | { size: Exclude<Size, 'xs'>; isEdit?: boolean; caption?: string }
);

const TAG = '** ProfileImage';
/**
 * @desc
 * displays profile image of user with uploading new image function
 *
 * @param {string} props.src base64 string of the image
 * @param {Size} props.size changes size of image
 * @param {boolean | never} props.isEdit toggles icon that appears on edit
 * @param {string | never} props.caption text appearing under icon on edit
 *
 * @example
 * <ProfileImage src={`data:image/png;base64, ${authUser!.photo}`} size='lg' isEdit={true} caption='edit' />
 */
function ProfileImage(props: ProfileImageProps) {
  const { src, caption = null, isEdit = false, size } = props;
  const { setAuthUser } = useAuth();
  const { request: uploadData, response: uploadResponse, error: uploadError } = useAxios();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  useEffect(() => {
    if (uploadError) {
      logValidity(TAG, Validity.FAIL, 'Fail to Update User Profile Image');
      return;
    }
    if (!uploadedImage && uploadResponse && isResponseType(uploadResponse, 'success')) {
      const imageUrl = uploadResponse.data.photo;
      setUploadedImage(`data:image/png;base64, ${imageUrl}`);

      // update current local user information
      setAuthUser(
        (prevUser: CurrentUser): CurrentUser => ({
          ...prevUser!,
          photo: imageUrl,
        })
      );

      logValidity(TAG, Validity.PASS, 'Updated User Profile Image');
    }
  }, [setAuthUser, uploadedImage, uploadResponse, uploadError]);

  function updateProfileImage(event: FormEvent): void {
    event.preventDefault();
    if (!fileInputRef.current?.files) return;

    const inputPhoto: File = fileInputRef.current.files[0];
    const form = new FormData();
    form.append('photo', inputPhoto);

    uploadData({
      method: 'patch',
      url: 'api/v1/users/updateMyPhoto',
      requestBody: form,
    });
  }

  const baseProfileImageComponent: JSX.Element = (
    <div className={`${styles.profile} ${styles[`profile--${size}`]}`}>
      <figure className={styles.profile__shape} data-testid='profile'>
        <img
          className={`${styles.profile__image} ${isEdit && styles['profile__image--blur']}`}
          src={uploadedImage ?? src}
          alt='Display Profile of User'
        />
        {isEdit && (
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
          ref={fileInputRef}
          onChange={(e) => updateProfileImage(e)}
          style={{ display: 'none' }}
        />
      </label>
    </form>
  );

  return (
    <Fragment>{!isEdit ? baseProfileImageComponent : editProfileImageFormWrapper}</Fragment>
  );
}
export default ProfileImage;
