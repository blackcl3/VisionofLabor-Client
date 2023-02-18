import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function ProfileCard({ obj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={obj.photo_url} />
      <Card.Body>
        <Card.Title>{obj.full_name}</Card.Title>
      </Card.Body>
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
