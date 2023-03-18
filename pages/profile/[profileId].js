import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getIndividualUser } from '../../api/userData';
import ProfileCard from '../../components/ProfileCard';
import ProfileChoreCard from '../../components/ProfileChoreCard';

export default function ProfilePage() {
  const [profileDetails, setProfileDetails] = useState({});
  const router = useRouter();
  const { profileId } = router.query;

  const getPageContent = () => {
    getIndividualUser(profileId).then(setProfileDetails);
  };

  useEffect(() => {
    getPageContent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h2 className="profile-page-h2">{profileDetails.full_name}&apos;s Page</h2>
      <div className="profile-card-div">
        <ProfileCard obj={profileDetails} />
      </div>

      <div className="profile-chore-div">
        {profileDetails.chores?.map((chore) => (
          <ProfileChoreCard photoUrl={profileDetails.photo_url} key={chore.id} obj={chore} onUpdate={getPageContent} />
        ))}
      </div>
    </>
  );
}
