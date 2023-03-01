import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getSingleHousehold = (householdId) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/household/${householdId}`)
    .then((response) => {
      if (response) {
        resolve((response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getAllHouseholds = () => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/household`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const editHousehold = (householdObject) => new Promise((resolve, reject) => {
  axios
    .put(`${dbUrl}/household/${householdObject.id}`, householdObject)
    .then(resolve)
    .catch(reject);
});

const createHousehold = (householdObject) => new Promise((resolve, reject) => {
  const householdObj = {
    name: householdObject.name,
    uid: householdObject.uid,
    users: householdObject.users,
  };

  axios
    .post(`${dbUrl}/household`, householdObj)
    .then(resolve)
    .catch(reject);
});

export {
  getSingleHousehold, getAllHouseholds, editHousehold, createHousehold,
};
