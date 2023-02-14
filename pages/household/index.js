import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getSingleHousehold } from '../../api/householdData';
import ChoreCard from '../../components/ChoreCard';
import { useAuth } from '../../utils/context/authContext';

export default function MyHouseholdPage() {
  const [householdDetails, setHouseholdDetails] = useState({});
  const { user } = useAuth();

  function getPageContent() {
    getSingleHousehold(user.household.id).then(setHouseholdDetails);
  }

  useEffect(() => {
    getPageContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>{householdDetails.name}</h1>
      <Button href={`/household/edit/${user.household.id}`}>Manage Household</Button>
      {householdDetails.chores?.map((chore) => (
        <ChoreCard key={chore.id} obj={chore} />
      ))}
    </>
  );
}
