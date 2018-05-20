import axios from 'axios';

export const shortenURL = (urlList, accessToken) => {
  console.log("AT: ", accessToken);
  return new Promise((resolve, reject) => {
    axios.post('http://localhost:3000/shorten_url', {url_list: JSON.stringify(urlList), access_token: accessToken}).then((response) => {
      resolve(response);
    }).catch((err) => {
      reject(err);
    });
  });
}
