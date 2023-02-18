import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAllCategories } from '../../../api/categoryData';
import ChoreForm from '../../../components/forms/ChoreForm';
import { getSingleChore } from '../../../api/choreData';
import { useAuth } from '../../../utils/context/authContext';
import { getUsersByHousehold } from '../../../api/userData';

export default function EditChorePage() {
  const [choreDetails, setChoreDetails] = useState({});
  const [categories, setCategories] = useState([]);
  const [choreHousehold, setChoreHousehold] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  const { choreId } = router.query;

  function getPageContent() {
    getAllCategories().then(setCategories);
    getSingleChore(choreId)
      .then((response) => {
        setChoreDetails(response);
        getUsersByHousehold(response.household.id).then(setChoreHousehold);
      });
  }

  useEffect(() => {
    getPageContent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ChoreForm obj={choreDetails} categories={categories} household={user.household} householdUsers={choreHousehold} />
  );
}
