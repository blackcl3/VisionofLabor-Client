import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../../api/categoryData';
import { getUsersByHousehold } from '../../api/userData';
import ChoreForm from '../../components/forms/ChoreForm';
import { useAuth } from '../../utils/context/authContext';

export default function AddNewChore() {
  const [categories, setCategories] = useState([]);
  const [choreHousehold, setChoreHousehold] = useState([]);
  const { user } = useAuth();

  function getPageContent() {
    getAllCategories().then(setCategories);
    getUsersByHousehold(user.household.id).then(setChoreHousehold);
  }

  useEffect(() => {
    getPageContent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ChoreForm categories={categories} household={user.household} householdUsers={choreHousehold} />
  );
}
