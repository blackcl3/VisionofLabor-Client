import React, { useState } from 'react';

const initialState = {
  name: '',
  description: '',
  frequency: '',
  priority: '',
  owner: null,
  photo_url: '',
};

export default function ChoreForm() {
  // eslint-disable-next-line no-unused-vars
  const [formInput, setFormInput] = useState(initialState);

  return (
    <div>ChoreForm</div>
  );
}
