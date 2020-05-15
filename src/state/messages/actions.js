import { createAction } from 'redux-act';
import * as api from 'api';
import { compose } from 'utils';

export const saveCurrentMessages = createAction(
  'Current conversation was saved',
);

export const receiveMessage = createAction('Message was received');

export const loadMessagesByConversationId = id => dispatch =>
  api.getConversationById(id).then(
    compose(
      dispatch,
      saveCurrentMessages,
    ),
  );
