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
      <h1 className="household-h1">Household: {householdDetails.name}</h1>

      <div className="household-div">

        <div className="household-button-group">
          {user.household?.id ? (
            <Button className="household-buttons" href={`/household/edit/${user.household?.id}`}>
              Manage Household
            </Button>
          ) : (
            <Button disabled className="household-buttons">
              Manage Household
            </Button>
          )}

          <Button className="household-buttons" href="/chores/addNewChore">
            Add New Chore
          </Button>
        </div>

        <div className="profile-container">
          <h3 className="household-h3">Household Members:</h3>
          {householdDetails.users?.map((userObj) => (
            <ProfileCard key={userObj.id} obj={userObj} />
          ))}
        </div>

        <div className="chore-card-container">
          <h3 className="household-h3">Household Chores:</h3>
          {householdDetails.chores?.map((chore) => (
            <ChoreCard key={chore.id} obj={chore} onUpdate={getPageContent} />
          ))}
        </div>
      </div>
    </>
  );
}
