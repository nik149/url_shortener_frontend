import axios from 'axios';

export const shortenURL = (urlList) => {
  return new Promise((resolve, reject) => {
    axios.post('http://localhost:3000/shorten_url', JSON.stringify(urlList)).then((response) => {
      resolve(response);
    }).catch((err) => {
      reject(err);
    });
  });
}
