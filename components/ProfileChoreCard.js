import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Avatar, Checkbox, FormControlLabel } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteChore } from '../api/choreData';
import { useAuth } from '../utils/context/authContext';

export default function ProfileChoreCard({ obj, photoUrl, onUpdate }) {
  const { user } = useAuth();
  const deleteThisChore = () => {
    if (window.confirm(`Delete ${obj.name}?`)) {
      deleteChore(obj.id, user.uid).then(() => onUpdate());
    }
  };
  return (
    <Card className="chore-card">
      <Card.Body>
        <Card.Title>{obj.name}</Card.Title>
        <Card.Text>{obj.description}</Card.Text>
        <Card.Text>{obj.frequency}</Card.Text>
        <Card.Text>{obj.priority}</Card.Text>
        <Avatar src={photoUrl} />
        {obj.category?.map((category) => (
          <Button key={category.id}>{category.category.label}</Button>
        ))}
        <Button variant="outline-primary" href={`/chores/edit/${obj.id}`}>
          <EditOutlinedIcon />
        </Button>
        <Button variant="danger" size="md" onClick={deleteThisChore} className="deleteBtn">
          <DeleteForeverIcon />
        </Button>
        <FormControlLabel control={<Checkbox defaultChecked classes={{ root: 'custom-checkbox-root' }} />} label="Done?" labelPlacement="end" />
      </Card.Body>
    </Card>
  );
}

ProfileChoreCard.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    name: PropTypes.string,
    category: PropTypes.arrayOf(PropTypes.shape),
    priority: PropTypes.string,
    frequency: PropTypes.string,
    photo_url: PropTypes.string,
  }).isRequired,
  photoUrl: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
