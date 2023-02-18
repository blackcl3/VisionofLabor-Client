import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getSingleHousehold } from '../../api/householdData';
import ChoreCard from '../../components/ChoreCard';
import ProfileCard from '../../components/ProfileCard';
import { useAuth } from '../../utils/context/authContext';

export default function MyHouseholdPage() {
  const [householdDetails, setHouseholdDetails] = useState({});
  const { user } = useAuth();

  const getPageContent = () => {
    getSingleHousehold(user.household?.id).then(setHouseholdDetails);
  };

  useEffect(() => {
    getPageContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.household]);

  return (
    <>
      <h1>{householdDetails.name}</h1>
      {user.household?.id ? <Button href={`/household/edit/${user.household?.id}`}>Manage Household</Button> : <Button disabled>Manage Household</Button>}
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
