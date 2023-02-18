import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getSingleHousehold } from '../../api/householdData';
import ChoreCard from '../../components/ChoreCard';
import ProfileCard from '../../components/ProfileCard';
import { useAuth } from '../../utils/context/authContext';

export default function IndividualHouseholdPage() {
  const [householdDetails, setHouseholdDetails] = useState({});
  const router = useRouter();
  const { householdId } = router.query;
  const { user } = useAuth();

  const getPageContent = () => {
    getSingleHousehold(householdId).then(setHouseholdDetails);
  };

  useEffect(() => {
    getPageContent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>{householdDetails.name}</h1>
      <Button href={`/household/edit/${user.household.id}`}>Manage Household</Button>
      {householdDetails.users?.map((userObj) => (
        <ProfileCard key={userObj.id} obj={userObj} />
      ))}
      <Button href="/chores/addNewChore">Add New Chore</Button>
      {householdDetails.chores?.map((chore) => (
        <ChoreCard key={chore.id} obj={chore} onUpdate={getPageContent} />
      ))}
    </>
  );
}
