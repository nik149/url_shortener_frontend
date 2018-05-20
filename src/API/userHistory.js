import axios from 'axios';

export const fetchUserHistoryData = (dataURL, accessToken) => {
  console.log("API: ", accessToken);
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:3000' + dataURL + "&access_token="+accessToken)
    .then(response => {
      resolve(response);
    }).catch(err => {
      reject(err);
    });
  });
}
