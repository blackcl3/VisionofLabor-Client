import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Avatar, Button } from '@mui/material';
import { useAuth } from '../utils/context/authContext';

export default function ProfileCard({ obj }) {
  const { user } = useAuth();

  return (
    <Card className="profile-card">
      <Avatar src={obj.photo_url} />
      <Card.Title>{obj.full_name}</Card.Title>
      <Button href={`/profile/${obj.id}`}>View Profile</Button>
      {user.id === obj.id ? <Button href={`/profile/edit/${obj.id}`}>Edit</Button> : <></>}
    </Card>
  );
}

ProfileCard.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    photo_url: PropTypes.string,
    full_name: PropTypes.string,
  }).isRequired,
};
