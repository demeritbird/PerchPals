import { useEffect, Fragment, FormEvent, useRef } from 'react';
import useAxios from '../../hooks/useAxios';
import styles from './ProfilePage.module.scss';

function ProfilePage() {
  const { response, isLoading, isError, axiosRequest } = useAxios();
  const { response: testdata, axiosRequest: uploadData } = useAxios();
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function getProfileData() {
    axiosRequest({
      method: 'get',
      url: 'api/v1/users/me',
    });
  }

  useEffect(() => {
    getProfileData();
  }, []);

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
        <input type='file' accept='image/*' id='photo' name='photo' ref={fileInputRef} />
        <label htmlFor='photo'>choose</label>

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
