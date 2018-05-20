import axios from 'axios';

export const fetchUserHistoryData = (dataURL, accessToken) => {
  console.log("API: ", accessToken);
  return new Promise((resolve, reject) => {
    axios.get(process.env.API_BASE_URL + dataURL + "&access_token="+accessToken)
    .then(response => {
      resolve(response);
    }).catch(err => {
      reject(err);
    });
  });
}
