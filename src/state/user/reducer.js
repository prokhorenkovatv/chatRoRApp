import { createReducer } from 'redux-act';
import { saveUser, saveToken, signout } from './actions';

const INITIAL_STATE = {
  accessToken: '',
  userData: {},
};

export default createReducer(
  {
    [saveToken]: (state, accessToken) => ({
      ...state,
      accessToken,
    }),
    [signout]: () => INITIAL_STATE,
    [saveUser]: (state, userData) => ({
      ...state,
      userData,
    }),
  },
  INITIAL_STATE,
);
