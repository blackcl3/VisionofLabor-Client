import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getSingleChore = (choreId) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/chores/${choreId}`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const updateChore = (choreObj) => new Promise((resolve, reject) => {
  const choreObject = {
    id: choreObj.id,
    name: choreObj.name,
    description: choreObj.description,
    frequency: choreObj.frequency,
    priority: choreObj.priority,
    owner: Number(choreObj.owner),
    photo_url: choreObj.photo_url,
    category: choreObj.category,
    household: choreObj.household.id,
  };
  axios
    .put(`${dbUrl}/chores/${choreObject.id}`, choreObject)
    .then((response) => response)
    .catch(reject);
});

const createChore = () => new Promise((resolve, reject) => {

});

// eslint-disable-next-line import/prefer-default-export
export { getSingleChore, updateChore, createChore };
