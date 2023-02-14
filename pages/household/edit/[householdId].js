import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleHousehold } from '../../../api/householdData';
import { getAllUsers } from '../../../api/userData';
import HouseholdForm from '../../../components/forms/HouseholdForm';

export default function EditHouseholdPage() {
  const [editHousehold, setHouseholdDetails] = useState({});
  const [users, setUsers] = useState({});
  const router = useRouter();
  const { householdId } = router.query;
  function getPageContent() {
    getAllUsers().then(setUsers);
    getSingleHousehold(householdId).then(setHouseholdDetails);
  }

  useEffect(() => {
    getPageContent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HouseholdForm obj={editHousehold} allUsers={users} />
    </>
  );
}
