import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getIndividualUser } from '../../../api/userData';
import ProfileForm from '../../../components/forms/ProfileForm';

export default function EditProfilePage() {
  const [editProfile, setProfileDetails] = useState({});
  const router = useRouter();
  const { profileId } = router.query;

  function getPageContent() {
    getIndividualUser(profileId).then(setProfileDetails);
  }

  useEffect(() => {
    getPageContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>EditProfilePage</div>
      <ProfileForm obj={editProfile} />
    </>
  );
}
