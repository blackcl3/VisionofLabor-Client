/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, FloatingLabel, Form, FormGroup,
} from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  first_name: '',
  last_name: '',
  household: 0,
  photo_url: '',
  admin: true,
};

export default function ProfileForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) {
      setFormInput(obj);
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {

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
      <div>
        <Button type="submit">{obj.id ? 'Update' : 'Add New'} Profile</Button>
      </div>
    </Form>
  );
}

ProfileForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    photo_url: PropTypes.string,
  }),
};

ProfileForm.defaultProps = {
  obj: initialState,
};
