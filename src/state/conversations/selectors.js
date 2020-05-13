import { hashToArr } from 'utils';

export const selectConversations = state =>
  hashToArr(state.conversations.allConversations);
