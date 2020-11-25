import { NEW_JOB_POSTING } from '../actions/types';
import { GET_ALL_JOBS } from '../actions/types';

const initialState = {
  status: {},
  jobs: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case NEW_JOB_POSTING:
      return { ...state, status: action.payload };
    case GET_ALL_JOBS:
      return { ...state, jobs: action.payload };
    default:
      return state;
  }
}
