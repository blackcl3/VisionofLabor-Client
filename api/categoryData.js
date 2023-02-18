import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getAllCategories = () => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/categories`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export { getAllCategories };
