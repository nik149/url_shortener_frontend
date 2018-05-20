import { combineReducers } from 'redux';
import userReducer from './user.js';
import historyReducer from './history.js';

const rootReducer =  combineReducers({
  user: userReducer,
  history: historyReducer
});

export default rootReducer;
