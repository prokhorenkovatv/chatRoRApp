import { combineReducers } from 'redux';
import { conversationsReducer } from 'state/conversations';
import { messagesReducer } from 'state/messages';

export default combineReducers({
  conversations: conversationsReducer,
  messages: messagesReducer,
});
