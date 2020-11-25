import { NEW_JOB_POSTING } from './types';
import backendServer from '../../webConfig';
import axios from 'axios';

export const insertNewJobDetails = (jobData) => (dispatch) => {
  axios
    .post(`${backendServer}glassdoor/jobs/`, jobData)
    .then((response) =>
      dispatch({
        type: NEW_JOB_POSTING,
        payload: response.data,
      }),
    )
    .catch((error) => {
      console.log(error);
    });
};
