import axios from 'axios';

export const createUserSession = (userInfo) => {
  return new Promise((resolve, reject) => {
    axios.post(process.env.API_BASE_URL + '/login', {user_info: JSON.stringify(userInfo)}).then((response) => {
      resolve(response);
    }).catch((err) => {
      reject(err);
    });
  });
}
