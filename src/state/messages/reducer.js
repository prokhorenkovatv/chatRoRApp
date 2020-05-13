import { createReducer } from 'redux-act';
import { saveCurrentConversation, addMessage } from './actions';

const INITIAL_STATE = {
  currentConversation: {},
};

export default createReducer(
  {
    [saveCurrentConversation]: (state, conversation) => ({
      ...state,
      currentConversation: conversation,
    }),
    [addMessage]: (state, message) => ({
      ...state,
      currentConversation: {
        ...state.currentConversation,
        messages: [message, ...state.currentConversation.messages],
      },
    }),
  },
  INITIAL_STATE,
);
