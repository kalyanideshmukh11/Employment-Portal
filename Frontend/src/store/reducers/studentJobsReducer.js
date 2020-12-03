
import { GET_JOBS } from '../actions/types';
const initialState = {
  student_jobs: [], 
  days:{},
  
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_JOBS:
        return { 
          ...state, 
          student_jobs: action.payload ,
        };
    default:
      return state;
  }
}