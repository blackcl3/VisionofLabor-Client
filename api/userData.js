import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

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

export { getUsersWithNoHousehold, getAllUsers };
