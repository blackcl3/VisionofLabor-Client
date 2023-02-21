import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getChoresByEmptyHousehold } from '../api/choreData';
import { useAuth } from '../utils/context/authContext';
import SampleChoreCard from '../components/SampleChoreCard';
import { getAllUsers } from '../api/userData';

function Home() {
  const { user } = useAuth();
  const [sampleHouseholdDetails, setHouseholdDetails] = useState({});
  const getPageContent = () => {
    getChoresByEmptyHousehold().then(setHouseholdDetails);
    getAllUsers();
  };

  useEffect(() => {
    getPageContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, user.household]);

  return (
    <>
      <div>
        <h1 className="main-page-header">Welcome {user.full_name}! </h1>
        <div className="main-page-button-container">
          {user.household?.id ? (
            <Button className="main-page-button" href={`household/${user.household.id}`}>
              Go to Household
            </Button>
          ) : (
            <Button className="main-page-button" href="household/addNewHousehold">
              Please Create a Household
            </Button>
          )}
        </div>
        <h2 className="main-page-header">Check out the sample chores below</h2>
        <h3 className="main-page-header">You can add them to your household to begin!</h3>
        <div className="main-container">{sampleHouseholdDetails.length ? sampleHouseholdDetails.map((chore) => <SampleChoreCard key={chore.id} obj={chore} uid={user.uid} onUpdate={getPageContent} />) : <></>}</div>
      </div>
    </>
  );
}

export default Home;
