import { hashToArr } from 'utils';

export const selectConversations = state =>
  hashToArr(state.chat.allConversations);

export const selectConversationById = (state, id) =>
  state.chat.allConversations[id];