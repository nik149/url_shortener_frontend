import axios from 'axios';
import creds from '../constants/creds.js';

export const createUserSession = (userInfo) => {
  return new Promise((resolve, reject) => {
    axios.post(creds.API_BASE_URL + '/login', {user_info: JSON.stringify(userInfo)}).then((response) => {
      resolve(response);
    }).catch((err) => {
      reject(err);
    });
  });
}
