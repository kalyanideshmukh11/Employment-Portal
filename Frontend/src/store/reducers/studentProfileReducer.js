import { STUDENT_PROFILE_DATA } from '../actions/types';

const initialState = {
  payload: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STUDENT_PROFILE_DATA:
      return { ...state, payload: action.payload };
    default:
      return state;
  }
}