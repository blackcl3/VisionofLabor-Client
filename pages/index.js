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
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Welcome {user.full_name}! </h1>
      {user.household?.id ? <Button href={`household/${user.household.id}`}>Go to Household</Button> : <Button href="household/addNewHousehold">Please Create a Household</Button>}

      <h2>Sample Chores Below</h2>
      <h3>You can clone them to your household to begin!</h3>

      {sampleHouseholdDetails.length ? sampleHouseholdDetails.map((chore) => <SampleChoreCard key={chore.id} obj={chore} uid={user.uid} onUpdate={getPageContent} />) : <></>}
    </div>
  );
}

export default Home;
