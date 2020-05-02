import {createAction} from "redux-act";
import * as api from 'api';
import {compose} from 'utils';

export const saveConversations = createAction("Conversations has been saved");

export const loadConversations = () => dispatch =>
   api.getConversations()
  .then(compose(dispatch, saveConversations));

export const createConversation = title => dispatch =>
   api.postConversation(title)
   .then(compose(dispatch, loadConversations));

