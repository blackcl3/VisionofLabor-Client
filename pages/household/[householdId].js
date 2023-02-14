import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleHousehold } from '../../api/householdData';
import ChoreCard from '../../components/ChoreCard';

export default function IndividualHouseholdPage() {
  const [householdDetails, setHouseholdDetails] = useState({});
  const router = useRouter();
  const { householdId } = router.query;

  function getPageContent() {
    getSingleHousehold(householdId).then(setHouseholdDetails);
  }

  useEffect(() => {
    getPageContent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <><h1>{householdDetails.name}</h1>
      {householdDetails.chores?.map((chore) => (
        <ChoreCard key={chore.id} obj={chore} />
      ))}
    </>
  );
}
