import { createReducer } from 'redux-act';
import { arrToHash } from 'utils';
import { saveConversations } from './actions';

const INITIAL_STATE = {
  allConversations: {},
};

export default createReducer(
  {
    [saveConversations]: (state, conversations) => ({
      ...state,
      allConversations: {
        ...state.conversations,
        ...arrToHash(conversations),
      },
    }),
  },
  INITIAL_STATE,
);
