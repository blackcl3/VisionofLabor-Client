import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getSingleHousehold } from '../../api/householdData';
import ProfileChoreCard from '../../components/ProfileChoreCard';
import { useAuth } from '../../utils/context/authContext';

export default function TodoPage() {
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
      {user.household?.id ? (
        <>
          <h1>To Do for {householdDetails.name} Household</h1>
          <Button className="household-buttons" href={`/household/edit/${user.household?.id}`}>
            Manage Household
          </Button>
        </>
      ) : <h1>Please Add Yourself to a Household, or Create a new Household</h1>}
      {householdDetails.chores?.map((chore) => (
        <ProfileChoreCard photoUrl={chore.owner ? chore.owner.photo_url : null} key={chore.id} obj={chore} onUpdate={getPageContent} />
      ))}
    </>
  );
}
