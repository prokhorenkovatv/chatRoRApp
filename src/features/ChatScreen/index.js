import React, { useState, useRef, useEffect } from 'react';
import { ActionCableConsumer } from '@thrash-industries/react-actioncable-provider';
import { useDispatch } from 'react-redux';
import {
  loadMessagesByConversationId,
  receiveMessage,
  sendMessage,
} from 'state/messages';
import ChatScreenView from './ChatScreenView';
import Spinner from 'components/Spinner';
import LoadingError from 'components/LoadingError';
import { GiftedChat, Bubble, MessageImage } from 'react-native-gifted-chat';
import { LOAD_STATES } from 'constants';
import PropTypes from 'prop-types';

const ChatScreen = ({ route }) => {
  const [loadingState, changeLoadingStatus] = useState(LOAD_STATES.LOADING);

  const setLoading = () => changeLoadingStatus(LOAD_STATES.LOADING);
  const setLoaded = () => changeLoadingStatus(LOAD_STATES.LOADED);
  const setFailed = () => changeLoadingStatus(LOAD_STATES.FAILED);

  const isLoading = loadingState === LOAD_STATES.LOADING;

  const { id } = route.params;
  const cable = useRef({});
  const dispatch = useDispatch();

  const fetchMessages = () => {
    dispatch(loadMessagesByConversationId(id))
      .then(setLoaded)
      .catch(setFailed);
  };

  useEffect(() => {
    fetchMessages();
  }, [id]);

  const createUserAvatarUrl = () => {
    const rand1 = Math.round(Math.random() * 200 + 100);
    const rand2 = Math.round(Math.random() * 200 + 100);
    return `https://placeimg.com/${rand1}/${rand2}/any`;
  };

  const handleReceivedMessage = data => {
    console.log('received: ', data);
    dispatch(receiveMessage(data.message));
  };

  const sendHandler = message => {
    // cable.current.perform('new_message', {
    //   channel: 'MessagesChannel',
    //   conversation_id: id,
    //   text: message.text,
    // });
    message.conversation_id = id;
    dispatch(sendMessage(message));
  };

  if ([LOAD_STATES.FAILED].includes(loadingState))
    return <LoadingError onRefresh={fetchConversation} />;

  if (isLoading) return <Spinner />;

  return (
    <ActionCableConsumer
      channel={{ channel: 'MessagesChannel', conversation: id }}
      onReceived={handleReceivedMessage}
      ref={cable}
    >
      <ChatScreenView
        sendHandler={sendHandler}
        createUserAvatarUrl={createUserAvatarUrl}
        id={id}
      />
    </ActionCableConsumer>
  );
};

export default React.memo(ChatScreen);

ChatScreen.propTypes = {
  route: PropTypes.object,
  id: PropTypes.number,
};
