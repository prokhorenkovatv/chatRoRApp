import { combineReducers } from 'redux';
import { conversationsReducer } from 'state/conversations';
import { messagesReducer } from 'state/messages';
import { userReducer } from 'state/user';

export default combineReducers({
  conversations: conversationsReducer,
  messages: messagesReducer,
  user: userReducer,
});
