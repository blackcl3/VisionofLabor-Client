import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getSingleChore = (choreId) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/chores/${choreId}`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const updateChore = (choreObj, uid = '') => new Promise((resolve, reject) => {
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
    .put(`${dbUrl}/chores/${choreObject.id}`, choreObject, {
      headers: {
        Authorization: uid,
      },
    })
    .then(resolve)
    .catch(reject);
});

const createChore = (choreObj, uid = '') => new Promise((resolve, reject) => {
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
    .post(`${dbUrl}/chores`, choreObject, {
      headers: {
        Authorization: uid,
      },
    })
    .then(resolve)
    .catch(reject);
});

const deleteChore = (choreId, uid = '') => new Promise((resolve, reject) => {
  axios
    .delete(`${dbUrl}/chores/${choreId}`, {
      headers: {
        Authorization: uid,
      },
    })
    .then(resolve)
    .catch(reject);
});

const cloneChore = (choreId, uid) => new Promise((resolve, reject) => {
  const userUid = {
    uid,
  };
  axios
    .put(`${dbUrl}/chores/${choreId}/clone_chore`, userUid)
    .then(resolve)
    .catch(reject);
});

const getChoresByEmptyHousehold = () => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/chores?household=empty`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const statusChange = (choreId, uid) => new Promise((resolve, reject) => {
  const userUid = {
    uid,
  };
  axios.put(`${dbUrl}/chores/${choreId}/status_change`, userUid).then(resolve).catch(reject);
});

const resetToDo = (choreId, uid) => new Promise((resolve, reject) => {
  const userUid = {
    uid,
  };
  axios.put(`${dbUrl}/chores/${choreId}/reset_status`, userUid).then(resolve).catch(reject);
});

const getBarChartData = (uid) => new Promise((resolve, reject) => {
  const userUid = {
    uid,
  };
  axios
    .post(`${dbUrl}/chores/get_values_for_pie_chart`, userUid)
    .then((response) => resolve(response.data))
    .catch(reject);
});

export {
  getSingleChore, updateChore, createChore, deleteChore, cloneChore, getChoresByEmptyHousehold, statusChange, resetToDo, getBarChartData,
};
