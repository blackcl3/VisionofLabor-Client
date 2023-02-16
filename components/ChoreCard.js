import PropTypes, { arrayOf, string, number } from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import {
  PencilSquare,
  Trash3Fill,
} from 'react-bootstrap-icons';
import { deleteChore } from '../api/choreData';

export default function ChoreCard({ obj, onUpdate }) {
  const deleteThisChore = () => {
    if (window.confirm(`Delete ${obj.name}?`)) {
      deleteChore(obj.id).then(() => onUpdate());
    }
  };
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={obj.photo_url} />
      <Card.Body>
        <Card.Title>{obj.name}</Card.Title>
        <Card.Text>{obj.description}</Card.Text>
        <Card.Text>{obj.frequency}</Card.Text>
        <Card.Text>{obj.priority}</Card.Text>
        {obj.owner ? (<Button>{obj.owner.first_name}</Button>) : (
          <Button>No Owner Assigned</Button>
        )}
        {obj.category?.map((category) => (
          <Button key={category.id}>{category.category.label}</Button>
        ))}
        <Button variant="outline-primary" href={`/chores/edit/${obj.id}`}>
          <PencilSquare />
        </Button>
        <Button variant="danger" size="lg" onClick={deleteThisChore} className="deleteBtn">
          <Trash3Fill />
        </Button>
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
    owner: PropTypes.shape,
    frequency: string,
    photo_url: string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
