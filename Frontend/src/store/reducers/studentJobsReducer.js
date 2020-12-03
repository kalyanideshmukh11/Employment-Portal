
import { GET_JOBS } from '../actions/types';
const initialState = {
  jobs: [], 
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_JOBS:
        return { 
          ...state, 
          jobs: action.payload 
        };
    default:
      return state;
  }
}