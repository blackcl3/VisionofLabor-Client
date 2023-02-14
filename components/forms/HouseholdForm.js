import React, { useEffect, useState } from 'react';
import {
  Button, FloatingLabel, Form, FormGroup,
} from 'react-bootstrap';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { createHousehold, editHousehold } from '../../api/householdData';

const initialState = {
  name: '',
  users: [],
};

export default function HouseholdForm({ obj, allUsers }) {
  const [formInput, setFormInput] = useState(initialState);
  const [optionsForSelect, setOptions] = useState([]);
  const router = useRouter();

  function optionsMap(userArr) {
    try {
      const options = userArr.map((userObj) => ({
        value: userObj.id,
        label: userObj.full_name,
      }));
      return options;
    } catch {
      return false;
    }
  }

  function getFormContent() {
    setOptions(optionsMap(allUsers));
  }

  const handleSelect = (e) => {
    const users = e;
    setFormInput((prevState) => ({
      ...prevState,
      users,
    }));
  };

  useEffect(() => {
    getFormContent();
    if (obj.id) {
      setFormInput(obj);
      const users = optionsMap(obj.users);
      setFormInput((prevState) => ({
        ...prevState,
        users,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obj, allUsers]);

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
      editHousehold(payload)
        .then(() => { router.push('/household'); });
    } else {
      const payload = {
        ...formInput,
      };
      createHousehold(payload).then(() => {
        router.push('/household');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="food-item-form">
      <h1 className="food-item-form-h1">{obj.id ? 'Edit' : 'Add'} Household</h1>
      <FormGroup controlId="form.Input1" className="food-item-form-input">
        <FloatingLabel label="Household Name" className="mb-3">
          <Form.Control type="text" placeholder="Enter Household Name" name="name" value={formInput.name} onChange={handleChange} required />
        </FloatingLabel>
      </FormGroup>
      <FormGroup controlId="floatingSelect" className="food-item-form-input">
        <Select aria-label="member select" name="users" value={formInput.users} isMulti options={optionsForSelect} onChange={handleSelect} />
      </FormGroup>
      <div>
        <Button type="submit">{obj.id ? 'Update' : 'Add New'} Household</Button>
      </div>
    </Form>
  );
}

HouseholdForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    users: PropTypes.arrayOf(PropTypes.shape),
  }),
  allUsers: PropTypes.arrayOf(PropTypes.shape),
};

HouseholdForm.defaultProps = {
  obj: initialState,
  allUsers: [],
};
