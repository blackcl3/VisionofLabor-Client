import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { resetToDo } from '../../api/choreData';
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

  const resetChoresToDoList = () => {
    resetToDo(householdDetails.chores[0].id, user.uid).then(() => getPageContent());
  };

  return (
    <>
      {user.household?.id ? (
        <>
          <h1 className="todo-h1">To Do for {householdDetails.name} Household</h1>
          <div className="todo-list-button-group">
            <Button className="household-buttons" href={`/household/edit/${user.household?.id}`}>
              Manage Household
            </Button>
            <Button className="houshold-buttons" onClick={resetChoresToDoList} variant="outline-success">
              Reset List
            </Button>
          </div>
        </>
      ) : (
        <h1>Please Add Yourself to a Household, or Create a new Household</h1>
      )}
      <div className="chore-todo-div">
        {householdDetails.chores?.map((chore) => (
          <ProfileChoreCard photoUrl={chore.owner ? chore.owner.photo_url : null} key={chore.id} obj={chore} onUpdate={getPageContent} />
        ))}
      </div>
    </>
  );
}
