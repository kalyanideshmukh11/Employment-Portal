import { combineReducers } from 'redux';
import companyJobsReducer from './companyJobsReducer';

export default combineReducers({
  jobs: companyJobsReducer,
});
