import { Fragment } from 'react';

import ProfileImage from '../../components/images/ProfileImage';
import useAuth from 'src/hooks/useAuth';

function ProfilePage() {
  const { authUser } = useAuth();

  return (
    <Fragment>
      <h2>Profile Page</h2>
      <ProfileImage
        src={`data:image/png;base64, ${authUser?.photo}`}
        size='lg'
        isEdit={true}
        caption='edit'
      />
    </Fragment>
  );
}

export default ProfilePage;
