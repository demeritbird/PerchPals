import { FormEvent, Fragment, useEffect, useRef, useState } from 'react';

import ProfileImage from '../../components/images/ProfileImage';
import useAuth from 'src/hooks/useAuth';
import { logValidity } from '@/utils/helpers';
import useAxios, { isResponseType } from '@/hooks/useAxios';
import { CurrentUser, Validity } from '@/utils/types';

const TAG = '** ProfilePage';
function ProfilePage() {
  const { authUser, setAuthUser } = useAuth();
  const { request: uploadData, response: uploadResponse, error: uploadError } = useAxios();

  const profileImageFileRef = useRef<HTMLInputElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  useEffect(() => {
    if (uploadError) {
      logValidity(TAG, Validity.FAIL, 'Fail to Update User Profile Image');
      return;
    }
    if (!uploadedImage && uploadResponse && isResponseType(uploadResponse, 'success')) {
      const imageUrl = uploadResponse.data.photo;
      setUploadedImage(imageUrl);

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
    if (!profileImageFileRef.current?.files) return;

    const inputPhoto: File = profileImageFileRef.current.files[0];
    const form = new FormData();
    form.append('photo', inputPhoto);

    uploadData({
      method: 'patch',
      url: 'api/v1/users/updateMyPhoto',
      requestBody: form,
    });
  }

  return (
    <Fragment>
      <h2>Profile Page</h2>
      <ProfileImage
        src={authUser!.photo}
        size='lg'
        edit={{ fileRef: profileImageFileRef, onChangeHandler: updateProfileImage }}
        caption='edit'
      />
    </Fragment>
  );
}

export default ProfilePage;
