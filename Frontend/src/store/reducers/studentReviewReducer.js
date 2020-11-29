import { NEW_REVIEW_POSTING } from '../actions/types';
import { GET_REVIEW } from '../actions/types';
const initialState = {
  review: [],
  status: {},
 
};

export default function (state = initialState, action) {
  switch (action.type) {
    case NEW_REVIEW_POSTING:
      return { ...state, status: action.payload };
    case GET_REVIEW:
        return { 
          ...state, 
          review: action.payload 
        };
    default:
      return state;
  }
}
