/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, FloatingLabel, Form, FormGroup,
} from 'react-bootstrap';
import Select from 'react-select';
import { useAuth } from '../../utils/context/authContext';
import { householdMap } from '../../utils/format-data-for-select';
import { updateUser } from '../../api/userData';

const initialState = {
  first_name: '',
  last_name: '',
  household: 0,
  photo_url: '',
  admin: true,
  households: [],
};

export default function ProfileForm({ obj, allHouseholds }) {
  const [formInput, setFormInput] = useState(initialState);
  const [optionsForSelect, setOptions] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  function getFormContent() {
    setOptions(householdMap(allHouseholds));
  }

  const handleSelect = (e) => {
    const household = e;
    setFormInput((prevState) => ({
      ...prevState,
      household,
    }));
  };

  useEffect(() => {
    getFormContent();
    if (obj.id) {
      setFormInput(obj);
      const household = householdMap([obj.household]);
      console.warn(household);
      setFormInput((prevState) => ({
        ...prevState,
        household,
      }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      const payload = {
        ...formInput,
      };
      updateUser(payload)
        .then(() => { router.push(`/profile/${user.id}`); });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="item-form">
      <h1 className="item-form-h1">{obj.id ? 'Edit' : 'Add'} Profile</h1>
      <FormGroup controlId="form.Input1" className="item-form-input">
        <FloatingLabel label="First Name" className="mb-3">
          <Form.Control type="text" placeholder="Enter Profile First Name" name="first_name" value={formInput.first_name} onChange={handleChange} required />
        </FloatingLabel>
      </FormGroup>
      <FormGroup controlId="form.Input2" className="item-form-input">
        <FloatingLabel label="Last Name" className="mb-3">
          <Form.Control type="text" placeholder="Enter Profile Last Name" name="last_name" value={formInput.last_name} onChange={handleChange} required />
        </FloatingLabel>
      </FormGroup>
      <FormGroup controlId="form.Input3" className="item-form-input">
        <FloatingLabel label="Profile Photo URL" className="mb-3">
          <Form.Control type="text" placeholder="Enter Profile Photo URL" name="photo_url" value={formInput.photo_url} onChange={handleChange} required />
        </FloatingLabel>
      </FormGroup>
      <FormGroup controlId="floatingSelect" className="item-form-input">
        <Select aria-label="member select" name="household" value={formInput.household} options={optionsForSelect} onChange={handleSelect} required />
      </FormGroup>
      <div>
        <Button type="submit">{obj.id ? 'Update' : 'Add New'} Profile</Button>
      </div>
    </Form>
  );
}

ProfileForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    photo_url: PropTypes.string,
    household: PropTypes.string,
  }),
  allHouseholds: PropTypes.arrayOf(PropTypes.shape),
};

ProfileForm.defaultProps = {
  obj: initialState,
  allHouseholds: [],
};
