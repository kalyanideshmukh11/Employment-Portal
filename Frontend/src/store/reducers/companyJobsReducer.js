import { NEW_JOB_POSTING } from '../actions/types';

const initialState = {
  status: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case NEW_JOB_POSTING:
      return { ...state, status: action.payload };
    default:
      return state;
  }
}
