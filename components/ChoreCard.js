import PropTypes, { arrayOf, string, number } from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';

export default function ChoreCard({ obj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={obj.photo_url} />
      <Card.Body>
        <Card.Title>{obj.name}</Card.Title>
        <Card.Text>{obj.description}</Card.Text>
        <Card.Text>{obj.frequency}</Card.Text>
        <Card.Text>{obj.priority}</Card.Text>
        <Card.Text>{obj.owner}</Card.Text>
        {obj.category?.map((category) => (
          <Card.Text>{category.category.label}</Card.Text>))}
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

ChoreCard.propTypes = {
  obj: PropTypes.shape({
    id: number,
    description: string,
    name: string,
    category: arrayOf(PropTypes.shape),
    priority: string,
    owner: string,
    frequency: string,
    photo_url: string,
  }).isRequired,
};
