import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleHousehold } from '../../../api/householdData';

export default function HouseholdMetrics() {
  Chart.register();
  const [householdDetails, setHouseholdDetails] = useState();
  const { user } = useAuth();

  const getPageData = () => {
    getSingleHousehold(user.household.id).then(setHouseholdDetails);
  };

  function getRandomColor() {
    const letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const getCountOfOwners = () => {
    const arrayOfOwnerIds = householdDetails?.chores.map((choreObj) => (choreObj?.owner?.id ? choreObj.owner.first_name : 'No Owner'));
    const countOfChores = ([...new Set(arrayOfOwnerIds)].map((x) => [x, arrayOfOwnerIds.filter((y) => y === x).length]));
    return countOfChores;
  };
  const dataArr = getCountOfOwners();

  const colorArr = dataArr.forEach((element) => {
    getRandomColor(element);
  });

  const data = {
    labels: dataArr.map((owner) => owner[0]),
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Chart of Number of Chores Owned',
        },
      },
    },
    datasets: [
      {
        label: 'Number of Chores Owned',
        data: dataArr.map((owner) => owner[1]),
        backgroundColor: colorArr,
      },
    ],
  };

  useEffect(() => {
    getPageData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <h1 className="metrics-h1">Household Metrics</h1>
      <div className="pie-chart-div">
        <Pie data={data} height="200px" width="200px" />
      </div>
    </>
  );
}
