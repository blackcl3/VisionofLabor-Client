import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import getSingleHousehold from '../../api/householdData';
import ChoreCard from '../../components/ChoreCard';

export default function IndividualHouseholdPage() {
  const [householdDetails, setHouseholdDetails] = useState({});
  const router = useRouter();
  const { householdId } = router.query;

  console.warn(householdId);

  function getPageContent() {
    getSingleHousehold(householdId).then(setHouseholdDetails);
  }

  useEffect(() => {
    getPageContent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <><div>Household Page</div>
      {householdDetails.chores?.map((chore) => (
        <ChoreCard key={chore.id} obj={chore} />
      ))}
    </>
  );
}
