import { combineReducers } from 'redux';
import { chatReducer } from 'state/chat';

export default combineReducers({
  chat: chatReducer,
});
