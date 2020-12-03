import { GET_COMPANY_OVERVIEW } from './types';
import backendServer from '../../webConfig';
import axios from 'axios';



export const getCompanyOverview = (args) => (dispatch) => {
  axios
    .get(`${backendServer}company/profile/${args}`)
    .then((response) =>
      dispatch({
        type: GET_COMPANY_OVERVIEW,
        payload: response.data,
      }),
    )
    .catch((error) => {
      console.log(error);
    });
};
