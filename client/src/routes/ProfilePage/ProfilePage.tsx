import { useState, useEffect, Fragment, FormEvent, useRef } from 'react';
import useAxios from '../../hooks/useAxios';

import ProfileImage from '../../components/images/ProfileImage';

function ProfilePage() {
  const { response, isLoading, isError, axiosRequest } = useAxios();
  const { response: testdata, axiosRequest: uploadData } = useAxios();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newSelectedImage, setNewSelectedImage] = useState<string | null>(null);

  async function getProfileData() {
    axiosRequest({
      method: 'get',
      url: 'api/v1/users/me',
    });
  }

  useEffect(() => {
    getProfileData();
  }, []);

  const handleFileInputChange = () => {
    if (!fileInputRef.current?.files) return;

    const selectedFile = fileInputRef.current.files[0];
    const imageUrl = URL.createObjectURL(selectedFile);
    setNewSelectedImage(imageUrl);
  };

  // Uses Form-Data
  function onSubmitHandler(event: FormEvent): void {
    event.preventDefault();
    if (!fileInputRef.current?.files) return;

    const form = new FormData();
    form.append('photo', fileInputRef.current.files[0]);

    uploadData({
      method: 'post',
      url: 'api/v1/users/updateMe',
      requestBody: form,
    });
  }

  return (
    <Fragment>
      <h2>Profile Page</h2>
      <form
        onSubmit={(event: FormEvent) => onSubmitHandler(event)}
        encType='multipart/form-data'
      >
        <label htmlFor='photo'>
          <ProfileImage
            imageSrc={newSelectedImage ?? `data:image/png;base64, ${response?.data.photo}`}
            size='medium'
            isEdit={true}
            hasBlur={true}
            caption={response?.data.name}
          />
          <input
            type='file'
            accept='image/*'
            id='photo'
            name='photo'
            ref={fileInputRef}
            onChange={handleFileInputChange}
            style={{ display: 'none' }}
          />
        </label>

        <button type='submit'>submit form</button>
      </form>

      <div className=''>
        {isLoading ? (
          <div>loading...</div>
        ) : isError ? (
          <div>error</div>
        ) : (
          <div>{response?.data.name}</div>
        )}
      </div>
    </Fragment>
  );
}

export default ProfilePage;
