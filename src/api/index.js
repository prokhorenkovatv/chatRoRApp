import axios from 'api/network';
import { API_ROOT } from 'constants';

export const getConversations = () => axios.get(`${API_ROOT}/conversations`);

export const postConversation = title =>
  axios.post(`${API_ROOT}/conversations`, { title });

export const postMessage = (text, id) =>
  axios.post(`${API_ROOT}/messages`, { text, conversation_id: id });
