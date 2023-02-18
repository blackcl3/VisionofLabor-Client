import { useRouter } from 'next/router';
import PropTypes, { arrayOf, string, number } from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { PlusCircleFill } from 'react-bootstrap-icons';
import { cloneChore } from '../api/choreData';

export default function ChoreCard({ obj, uid }) {
  const router = useRouter();
  const cloneThisChore = () => {
    if (window.confirm(`Clone ${obj.name}?`)) {
      cloneChore(obj.id, uid).then(() => { router.push('/household'); });
    }
  };
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{obj.name}</Card.Title>
        <Card.Text>{obj.description}</Card.Text>
        <Card.Text>{obj.frequency}</Card.Text>
        <Card.Text>{obj.priority}</Card.Text>
        <Button variant="outline-primary" onClick={cloneThisChore}>
          <PlusCircleFill />
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
  uid: PropTypes.string.isRequired,
};
