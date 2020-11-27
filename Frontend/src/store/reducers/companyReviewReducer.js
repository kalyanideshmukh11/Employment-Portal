import { NEW_REVIEW_POSTING } from '../actions/types';

const initialState = {
  status: {},
  review:[]
};

export default function (state = initialState, action) {
  switch (action.type) {
    case NEW_REVIEW_POSTING:
      return { ...state, status: action.payload };
    default:
      return state;
  }
}
