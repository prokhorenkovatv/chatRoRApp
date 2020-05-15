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
import { LOAD_STATES } from 'constants';
import { compose, get } from 'utils'
import PropTypes from 'prop-types';

const ChatScreen = ({ route }) => {
  const [loadingState, changeLoadingStatus] = useState(LOAD_STATES.LOADING);

  const setLoaded = () => changeLoadingStatus(LOAD_STATES.LOADED);
  const setFailed = () => changeLoadingStatus(LOAD_STATES.FAILED);

  const isLoading = loadingState === LOAD_STATES.LOADING;

  const { id } = route.params;
  const cableRef = useRef(null);
  const cable = cableRef.current
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMessagesByConversationId(id))
      .then(setLoaded)
      .catch(setFailed);
  }, [id]);

  const createUserAvatarUrl = () => {
    const rand1 = Math.round(Math.random() * 200 + 100);
    const rand2 = Math.round(Math.random() * 200 + 100);
    return `https://placeimg.com/${rand1}/${rand2}/any`;
  };

  const handleReceivedMessage = compose(dispatch, receiveMessage, get('message'))
  const handleSendMessage = m => sendMessage(m, id, cable)

  if (loadingState === LOAD_STATES.FAILED)
    return <LoadingError onRefresh={fetchConversation} />;

  if (isLoading) return <Spinner />;

  return (
    <ActionCableConsumer
      channel={{ channel: 'MessagesChannel', conversation: id }}
      onReceived={handleReceivedMessage}
      ref={cableRef}
    >
      <ChatScreenView
        sendHandler={handleSendMessage}
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
