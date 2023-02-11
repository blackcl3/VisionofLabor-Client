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

export default getSingleHousehold;
