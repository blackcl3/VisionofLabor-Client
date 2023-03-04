import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getIndividualUser = (userId) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/users/${userId}`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const getUsersWithNoHousehold = () => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/users?household=empty`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const getAllUsers = () => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/users`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const getUsersByHousehold = (householdId) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/users?household=${householdId}`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const updateUser = (payload) => new Promise((resolve, reject) => {
  const userObj = {
    id: payload.id,
    first_name: payload.first_name,
    last_name: payload.last_name,
    household: payload.household.value,
    photo_url: payload.photo_url,
    admin: true,
  };
  axios
    .put(`${dbUrl}/users/${userObj.id}`, userObj)
    .then(resolve)
    .catch(reject);
});

export {
  getIndividualUser, getUsersWithNoHousehold, getAllUsers, getUsersByHousehold, updateUser,
};
