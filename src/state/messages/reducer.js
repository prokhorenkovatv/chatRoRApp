import { createReducer } from 'redux-act';
import { saveCurrentMessages, sendMessage, receiveMessage } from './actions';
import { arrToHash, hashToArr } from 'utils';

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
    [receiveMessage]: (state, message) => ({
      ...state,
      byRoom: {
        ...state.byRoom,
        [message.conversation_id]: {
          ...hashToArr(state.byRoom[message.conversation_id]).concat(message),
        },
      },
    }),
  },
  INITIAL_STATE,
);
