import React, { useEffect, useState } from 'react';
import getUsersWithNoHousehold from '../../api/userData';

const initialState = {
  name: '',
};

export default function HouseholdForm() {
  // eslint-disable-next-line no-unused-vars
  const [formInput, setFormInput] = useState(initialState);

  function getFormContent() {
    getUsersWithNoHousehold().then(setFormInput);
  }

  useEffect(() => {
    getFormContent();
  });

  return (
    <div>HouseholdForm</div>
  );
}
