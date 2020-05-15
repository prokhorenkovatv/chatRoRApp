import { createReducer } from 'redux-act';
import { saveCurrentMessages, sendMessage, receiveMessage } from './actions';
import { arrToHash } from 'utils';

const INITIAL_STATE = {
  byRoom: {},
};

export default createReducer(
  {
    [saveCurrentMessages]: (state, conversation) => ({
      ...state,
      byRoom: {
        ...state.byRoom,
        [conversation.id]: { ...conversation.messages },
      },
    }),
    [sendMessage]: (state, message) => ({
      ...state,
      byRoom: {
        ...state.byRoom,
        [message.conversation_id]: {
          ...state.byRoom[message.conversation_id],
          message,
        },
      },
    }),
    [receiveMessage]: (state, message) => ({
      ...state,
      byRoom: {
        ...state.byRoom,
        [message.conversation_id]: {
          ...state.byRoom[message.conversation_id],
          message,
        },
      },
    }),
  },
  INITIAL_STATE,
);
