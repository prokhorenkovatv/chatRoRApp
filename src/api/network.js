import axios from 'axios';
import { get } from 'utils';

const errorHandler = err => {
  console.warn(err)
  if (!err.response) {
    throw err;
  }
  throw err;
};

axios.interceptors.response.use(get('data'), errorHandler);

export default axios;