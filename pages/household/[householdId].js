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
      <h1 className="household-h1">Household: {householdDetails.name}</h1>
      <div className="household-button-group">
        <Button className="household-buttons" href={`/household/edit/${user.household.id}`}>
          Manage Household
        </Button>
        <Button className="household-buttons" href="/chores/addNewChore">
          Add New Chore
        </Button>
      </div>
      <h3 className="household-h3">Household Members</h3>
      <div className="profile-container">
        {householdDetails.users?.map((userObj) => (
          <ProfileCard key={userObj.id} obj={userObj} />
        ))}
      </div>
      <h3 className="household-h3">Current Chores</h3>
      <div className="chore-card-container">
        {householdDetails.chores?.map((chore) => (
          <ChoreCard key={chore.id} obj={chore} onUpdate={getPageContent} />
        ))}
      </div>
    </>
  );
}
