import { combineReducers } from 'redux';
import companyJobsReducer from './companyJobsReducer';
import companyReviewReducer from './companyReviewReducer';

export default combineReducers({
  jobs: companyJobsReducer,
  reviews:companyReviewReducer
});
