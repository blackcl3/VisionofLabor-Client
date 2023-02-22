import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Avatar } from '@mui/material';

export default function ProfileCard({ obj }) {
  return (
    <Card className="profile-card">
      <Avatar src={obj.photo_url} />
      <Card.Title>{obj.full_name}</Card.Title>
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
