import { combineReducers } from 'redux';
import companyJobsReducer from './companyJobsReducer';
<<<<<<< Updated upstream
import companyReviewReducer from './companyReviewReducer';

export default combineReducers({
  jobs: companyJobsReducer,
  reviews:companyReviewReducer
=======
import studentProfileReducer from './studentProfileReducer';
import studentReviewReducer from './studentReviewReducer';
import studentSalaryReducer from './studentSalaryReducer';


export default combineReducers({
  jobs: companyJobsReducer,
  studentProfile: studentProfileReducer,
  reviews: studentReviewReducer,
  salary: studentSalaryReducer,
>>>>>>> Stashed changes
});
