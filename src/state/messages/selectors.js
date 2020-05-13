export const selectCurrentConversation = state =>
  state.messages.currentConversation;
export const selectMessages = state =>
  state.messages.currentConversation.messages;
