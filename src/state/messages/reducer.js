import { createReducer } from 'redux-act';
import { saveCurrentMessages, receiveMessage } from './actions';
import { arrToHash, hashToArr } from 'utils';

const INITIAL_STATE = {
  byConversation: {},
};

export default createReducer(
  {
    [saveCurrentMessages]: (state, conversation) => ({
      ...state,
      byConversation: {
        ...state.byConversation,
        [conversation.id]: { ...arrToHash(conversation.messages) },
      },
    }),
    [receiveMessage]: (state, message) => ({
      ...state,
      byConversation: {
        ...state.byConversation,
        [message.conversation_id]: {
          ...state.byConversation[message.conversation_id],
          [message.id]: message,
        },
      },
    }),
  },
  INITIAL_STATE,
);
