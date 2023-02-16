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
    .then(resolve)
    .catch(reject);
});

const createChore = (choreObj) => new Promise((resolve, reject) => {
  const choreObject = {
    id: choreObj.id,
    name: choreObj.name,
    description: choreObj.description,
    frequency: choreObj.frequency,
    priority: choreObj.priority,
    owner: Number(choreObj.owner),
    photo_url: choreObj.photo_url,
    category: choreObj.category,
    household: choreObj.household,
  };
  axios
    .post(`${dbUrl}/chores`, choreObject)
    .then(resolve)
    .catch(reject);
});

const deleteChore = (choreId) => new Promise((resolve, reject) => {
  axios
    .delete(`${dbUrl}/chores/${choreId}`)
    .then(resolve)
    .catch(reject);
});

export {
  getSingleChore, updateChore, createChore, deleteChore,
};
