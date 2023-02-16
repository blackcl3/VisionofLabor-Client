import React, { useEffect, useState } from 'react';
import { getUsersWithNoHousehold } from '../../api/userData';
import HouseholdForm from '../../components/forms/HouseholdForm';

export default function AddNewHousehold() {
  const [users, setUsers] = useState({});

  function getPageContent() {
    getUsersWithNoHousehold().then(setUsers);
  }

  useEffect(() => {
    getPageContent();
  }, []);

  return (
    <HouseholdForm allUsers={users} />
  );
}
