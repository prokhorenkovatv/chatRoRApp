import { createReducer } from 'redux-act';
import { arrToHash } from 'utils';
import { saveConversations } from './actions';

const INITIAL_STATE = {
  allConversations: {},
};

export default createReducer(
  {
    [saveConversations]: (state, conversations) => {
      let conversationsList = [];
      conversations.map(c =>
        conversationsList.push({
          id: c.id,
          title: c.title,
        }),
      );
      return {
        ...state,
        allConversations: {
          ...state.allConversations,
          ...arrToHash(conversationsList),
        },
      };
    },
  },
  INITIAL_STATE,
);
