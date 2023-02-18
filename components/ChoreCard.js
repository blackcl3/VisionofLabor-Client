import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import {
  PencilSquare,
  Trash3Fill,
} from 'react-bootstrap-icons';
import { deleteChore } from '../api/choreData';
import { useAuth } from '../utils/context/authContext';

export default function ChoreCard({ obj, onUpdate }) {
  const { user } = useAuth();
  const deleteThisChore = () => {
    if (window.confirm(`Delete ${obj.name}?`)) {
      deleteChore(obj.id, user.uid).then(() => onUpdate());
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
    id: PropTypes.number,
    description: PropTypes.string,
    name: PropTypes.string,
    category: PropTypes.arrayOf(PropTypes.shape),
    priority: PropTypes.string,
    owner: PropTypes.shape({ first_name: PropTypes.string }),
    frequency: PropTypes.string,
    photo_url: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
