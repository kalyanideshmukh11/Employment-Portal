import { combineReducers } from 'redux';
import companyJobsReducer from './companyJobsReducer';
import companyReviewReducer from './companyReviewReducer';
import studentProfileReducer from './studentProfileReducer';
import studentReviewReducer from './studentReviewReducer';
import studentSalaryReducer from './studentSalaryReducer';


export default combineReducers({
  jobs: companyJobsReducer,
  reviews:companyReviewReducer,
  studentProfile: studentProfileReducer,
  review: studentReviewReducer,
  salary: studentSalaryReducer,
});
