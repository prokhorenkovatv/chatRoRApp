import { createAction } from 'redux-act';
import * as api from 'api';
import { compose } from 'utils';

export const saveCurrentConversation = createAction(
  'Current conversation was saved',
);

export const addMessage = createAction('Message was added');

export const loadConversationById = id => dispatch =>
  api.getConversationById(id).then(
    compose(
      dispatch,
      saveCurrentConversation,
    ),
  );
