import { FormEvent, Fragment, useEffect, useRef, useState } from 'react';

import DisplayPhoto from '../../components/images/DisplayPhoto';
import useAuth from 'src/hooks/useAuth';
import { logValidity } from '@/utils/helpers';
import useAxios, { isResponseType } from '@/hooks/useAxios';
import { CurrentUser, Validity } from '@/utils/types';

const TAG = '** ProfilePage';
function ProfilePage() {
  const { authUser, setAuthUser } = useAuth();
  const { request: uploadData, response: uploadResponse, error: uploadError } = useAxios();

  const displayPhotoFileRef = useRef<HTMLInputElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  useEffect(() => {
    if (uploadError) {
      logValidity(TAG, Validity.FAIL, 'Fail to Update User Display Photo');
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

      logValidity(TAG, Validity.PASS, 'Updated User Display Photo');
    }
  }, [setAuthUser, uploadedImage, uploadResponse, uploadError]);

  function updateDisplayPhoto(event: FormEvent): void {
    event.preventDefault();
    if (!displayPhotoFileRef.current?.files) return;

    const inputPhoto: File = displayPhotoFileRef.current.files[0];
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
      <DisplayPhoto
        src={authUser!.photo}
        size='lg'
        edit={{ fileRef: displayPhotoFileRef, onChangeHandler: updateDisplayPhoto }}
        caption='edit'
      />
    </Fragment>
  );
}

export default ProfilePage;
