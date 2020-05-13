import { createAction } from 'redux-act';
import * as api from 'api';
import { compose, log } from 'utils';

export const saveConversations = createAction('Conversations have been saved');

export const loadConversations = () => dispatch =>
  api.getConversations().then(
    compose(
      dispatch,
      saveConversations,
    ),
  );

export const createConversation = title => dispatch =>
  api.postConversation(title).then(
    compose(
      dispatch,
      loadConversations,
    ),
  );
