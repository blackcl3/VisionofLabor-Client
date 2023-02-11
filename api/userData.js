import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getUsersWithNoHousehold = () => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/users?household=empty`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

export default getUsersWithNoHousehold;
