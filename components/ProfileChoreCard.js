import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import {
  Avatar, Checkbox, FormControlLabel, Tooltip,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteChore, statusChange } from '../api/choreData';
import { useAuth } from '../utils/context/authContext';

export default function ProfileChoreCard({ obj, photoUrl, onUpdate }) {
  const { user } = useAuth();
  const deleteThisChore = () => {
    if (window.confirm(`Delete ${obj.name}?`)) {
      deleteChore(obj.id, user.uid).then(() => onUpdate());
    }
  };
  const changeChoreStatus = () => {
    statusChange(obj.id, user.uid).then(() => onUpdate());
  };
  return (
    <Card className="profile-chore-card">
      <Card.Body>
        <Card.Title>
          {obj.name}
          <Tooltip title={obj.description}>
            <HelpOutlineIcon />
          </Tooltip>
        </Card.Title>
        <div className="profile-chore-card-text">
          <Card.Text>{obj.frequency}</Card.Text>
          <Card.Text>{obj.priority}</Card.Text>
          <Avatar src={photoUrl} />
        </div>
        <div className="profile-chore-card-btn-group">
          <Button variant="outline-primary" href={`/chores/edit/${obj.id}`}>
            <EditOutlinedIcon />
          </Button>
          <Button variant="danger" size="md" onClick={deleteThisChore} className="deleteBtn">
            <DeleteForeverIcon />
          </Button>
          <FormControlLabel control={<Checkbox onClick={changeChoreStatus} checked={obj.status} classes={{ root: 'custom-checkbox-root' }} />} label="Done?" labelPlacement="end" />
        </div>
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
    status: PropTypes.bool,
  }).isRequired,
  photoUrl: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
