import {shortenURL} from './shortenURL';
import {createUserSession} from './userLogin';
import {fetchUserHistoryData} from './userHistory';

const API = {
  shortenURL: shortenURL,
  createUserSession: createUserSession,
  fetchUserHistoryData: fetchUserHistoryData
}

export default API;
