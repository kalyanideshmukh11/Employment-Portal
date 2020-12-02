
import { GET_COMPANY_OVERVIEW } from '../actions/types';

const initialState = {
  companyOverview: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COMPANY_OVERVIEW:
      return { ...state, companyOverview: action.payload };
    default:
      return state;
  }
}
