import { combineReducers } from 'redux';
import companyJobsReducer from './companyJobsReducer';
import studentProfileReducer from './studentProfileReducer';

export default combineReducers({
  jobs: companyJobsReducer,
  studentProfile: studentProfileReducer
});
