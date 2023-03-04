import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getAllHouseholds } from '../../../api/householdData';
import { getIndividualUser } from '../../../api/userData';
import ProfileForm from '../../../components/forms/ProfileForm';

export default function EditProfilePage() {
  const [households, setHouseholds] = useState({});
  const [editProfile, setProfileDetails] = useState({});
  const router = useRouter();
  const { profileId } = router.query;

  function getPageContent() {
    getAllHouseholds().then(setHouseholds);
    getIndividualUser(profileId).then(setProfileDetails);
  }

  useEffect(() => {
    getPageContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ProfileForm obj={editProfile} allHouseholds={households} />
    </>
  );
}
