import axios from 'axios';

export const createUserSession = (userInfo) => {
  return new Promise((resolve, reject) => {
    axios.post('http://localhost:3000/login', {user_info: JSON.stringify(userInfo)}).then((response) => {
      resolve(response);
    }).catch((err) => {
      reject(err);
    });
  });
}
