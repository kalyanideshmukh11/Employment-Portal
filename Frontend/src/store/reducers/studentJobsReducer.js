
import { GET_JOBS } from '../actions/types';
const initialState = {
  student_job: [], 
  days:{},
  
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_JOBS:
        return { 
          ...state, 
          student_job: action.payload ,
        };
    default:
      return state;
  }
}