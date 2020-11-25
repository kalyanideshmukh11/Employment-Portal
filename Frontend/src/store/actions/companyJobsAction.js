import { NEW_JOB_POSTING, GET_ALL_JOBS } from './types';
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

export const getAllJobs = (args) => (dispatch) => {
  axios
    .get(`${backendServer}glassdoor/jobs/${args}/fetchjobs/`)
    .then((response) =>
      dispatch({
        type: GET_ALL_JOBS,
        payload: response.data,
      }),
    )
    .catch((error) => {
      console.log(error);
    });
};
