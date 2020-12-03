import { GET_JOBS } from './types';
import backendServer from '../../webConfig';
import axios from 'axios';

export const saveJobs = (payload) => {
    return { type: GET_JOBS, payload}
  };