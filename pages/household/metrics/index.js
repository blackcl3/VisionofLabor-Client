import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart, ArcElement,
} from 'chart.js';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleHousehold } from '../../../api/householdData';

export default function HouseholdMetrics() {
  Chart.register(ArcElement);
  const [householdDetails, setHouseholdDetails] = useState();
  const { user } = useAuth();
  console.warn(householdDetails);

  const getPageData = () => {
    getSingleHousehold(user.household.id).then(setHouseholdDetails);
  };

  const data = {
    labels: householdDetails?.chores.map((choreObj) => (choreObj?.owner?.first_name || 'null')),
    datasets: [
      {
        label: 'Number of Chores Owned',
        data: Object.keys(householdDetails?.chores?.owner || 'null'),
      },
    ],
  };

  console.warn(data);

  useEffect(() => {
    getPageData();
    console.warn(data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <h1>HouseholdMetrics</h1>
      <Pie data={data} height={500} width={700} />
    </>
  );
}
