import axios from 'axios';
import creds from '../constants/creds.js';

export const fetchUserHistoryData = (dataURL, accessToken) => {
  return new Promise((resolve, reject) => {
    axios.get(creds.API_BASE_URL + dataURL + "&access_token="+accessToken)
    .then(response => {
      resolve(response);
    }).catch(err => {
      reject(err);
    });
  });
}
