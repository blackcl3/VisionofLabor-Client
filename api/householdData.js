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

const editHousehold = (householdObject) => new Promise((resolve, reject) => {
  axios
    .put(`${dbUrl}/household/${householdObject.id}`, householdObject)
    .then(resolve)
    .catch(reject);
});

const createHousehold = (householdObject) => new Promise((resolve, reject) => {
  axios
    .post(`${dbUrl}/household`, householdObject)
    .then(resolve)
    .catch(reject);
});

export { getSingleHousehold, editHousehold, createHousehold };
