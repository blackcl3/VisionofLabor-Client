import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
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
      {user.household.id ? (
        <Button href={`household/${user.household.id}`}>Go to Household</Button>
      ) : (
        <Button>Please Create a Household</Button>
      )}
    </div>
  );
}

export default Home;
