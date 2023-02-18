import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, FloatingLabel, Form, FormGroup, FormLabel,
} from 'react-bootstrap';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { updateChore, createChore } from '../../api/choreData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  name: '',
  description: '',
  frequency: '',
  priority: '',
  owner: { id: '' },
  photo_url: '',
  category: [],
};

export default function ChoreForm({ obj, categories, householdUsers }) {
  const [formInput, setFormInput] = useState(initialState);
  const [optionsForSelect, setOptions] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const handleSelect = (e) => {
    const category = e;
    setFormInput((prevState) => ({
      ...prevState,
      category,
    }));
  };

  function getFormContent() {
    setOptions(categories);
  }

  function optionsMap(arr) {
    try {
      const options = arr.map((categoryObj) => ({
        value: categoryObj.category.value,
        label: categoryObj.category.label,
      }));
      return options;
    } catch {
      return false;
    }
  }

  useEffect(() => {
    getFormContent();
    if (obj.id) {
      setFormInput(obj);
      const category = optionsMap(obj.category);
      setFormInput((prevState) => ({
        ...prevState,
        category,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obj, categories, householdUsers]);

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
      updateChore(payload, user.uid).then(() => {
        router.push('/household');
      });
    } else {
      const payload = {
        ...formInput,
        household: user.household.id,
      };
      createChore(payload, user.uid).then(() => {
        router.push('/household');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="item-form">
      <h1 className="item-form-h1">{obj.id ? 'Edit' : 'Add'} Chore</h1>
      <FormGroup controlId="form.Input1" className="item-form-input">
        <FloatingLabel label="Chore Name" className="mb-3">
          <Form.Control type="text" placeholder="Enter Chore Name" name="name" value={formInput.name} onChange={handleChange} required />
        </FloatingLabel>
      </FormGroup>
      <FormGroup controlId="form.Input2" className="item-form-input">
        <FloatingLabel label="Chore Description" className="mb-3">
          <Form.Control type="text" placeholder="Enter Chore Description" name="description" value={formInput.description} onChange={handleChange} required />
        </FloatingLabel>
      </FormGroup>
      <FormGroup controlId="form.Input3" className="item-form-input">
        <FloatingLabel label="Chore Frequency" className="mb-3">
          <Form.Control type="text" placeholder="Enter Chore Frequency" name="frequency" value={formInput.frequency} onChange={handleChange} required />
        </FloatingLabel>
      </FormGroup>
      <FormGroup controlId="form.Input3" className="item-form-input">
        <FloatingLabel label="Chore Priority" className="mb-3">
          <Form.Control type="text" placeholder="Enter Chore Priority" name="priority" value={formInput.priority} onChange={handleChange} required />
        </FloatingLabel>
      </FormGroup>
      <FormGroup controlId="form.Input3" className="item-form-input">
        <FloatingLabel label="Chore Photo" className="mb-3">
          <Form.Control type="text" placeholder="Enter Chore Photo URL" name="photo_url" value={formInput.photo_url} onChange={handleChange} required />
        </FloatingLabel>
      </FormGroup>
      <FormGroup controlId="floatingSelect" className="item-form-input">
        <FormLabel>Category</FormLabel>
        <Select aria-label="member select" name="category" value={formInput.category} options={optionsForSelect} isMulti onChange={handleSelect} placeholder="Category" />
      </FormGroup>
      <FloatingLabel label="Chore Owner" className="mb-3">
        <Form.Select controlId="floatingSelect" aria-label="owner select" name="owner" onChange={handleChange} className="profile-form-input">
          <option value="">Select an Owner</option>
          {householdUsers?.map((userObj) => (
            <option key={userObj.id} value={userObj.id} selected={formInput.owner?.id === userObj.id}>
              {userObj.full_name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
      <div>
        <Button type="submit">{obj.id ? 'Update' : 'Add New'} Chore</Button>
      </div>
    </Form>
  );
}

ChoreForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    frequency: PropTypes.string,
    priority: PropTypes.string,
    photo_url: PropTypes.string,
    owner: PropTypes.shape,
    category: PropTypes.arrayOf(PropTypes.shape),
  }),
  categories: PropTypes.arrayOf(PropTypes.shape),
  householdUsers: PropTypes.arrayOf(PropTypes.shape),
};

ChoreForm.defaultProps = {
  obj: initialState,
  categories: [],
  householdUsers: [],
};
