import { createSelector } from 'reselect';
import { compose, hashToArr, sort } from 'utils';

export const selectCurrentMessages = id =>
  createSelector(
    state => state.messages.byConversation[id],
    compose(
      sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
      hashToArr,
    ),
  );
