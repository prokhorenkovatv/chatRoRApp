import { hashToArr } from 'utils';

export const selectCurrentMessages = (state, id) =>
  hashToArr(state.messages.byRoom[id]);
