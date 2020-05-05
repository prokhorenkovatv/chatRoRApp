import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loadConversations, selectConversations} from 'state/chat';
import Spinner from 'components/Spinner';
import LoadingError from 'components/LoadingError';
import ConversationsListView from 'features/ConversationsList/ConversationsListView';
import {ActionCableConsumer} from '@thrash-industries/react-actioncable-provider';
import {Text, View} from 'react-native';
import {isEmpty} from 'utils';
import AddConversation from 'features/AddConversation';

const LOAD_STATES = {
  LOADING: 'LOADING',
  FAILED: 'FAILED',
  LOADED: 'LOADED',
};

const ConversationsList = () => {
  const dispatch = useDispatch();
  const cable = useRef({});
  const [loadingState, changeLoadingStatus] = useState(LOAD_STATES.LOADING);

  const setLoading = () => changeLoadingStatus(LOAD_STATES.LOADING);
  const setLoaded = () => changeLoadingStatus(LOAD_STATES.LOADED);
  const setFailed = () => changeLoadingStatus(LOAD_STATES.FAILED);

  const fetchConversations = () => {
    setLoading();
    dispatch(loadConversations())
      .then(setLoaded)
      .catch(setFailed);
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const conversations = useSelector(selectConversations);

  const isLoading = loadingState === LOAD_STATES.LOADING;

  if ([LOAD_STATES.FAILED].includes(loadingState))
    return <LoadingError onRefresh={fetchConversations} />;
  if (isLoading) return <Spinner />;

  const handleReceivedConversation = response => {
    console.log(response);
  };

  return (
    <View style={{flex: 1}}>
      <AddConversation />
      <ActionCableConsumer
        ref={cable}
        channel={{channel: 'ConversationsChannel'}}
        onReceived={handleReceivedConversation}>
        {isEmpty(conversations) ? (
          <Text>No conversations yet</Text>
        ) : (
          <ConversationsListView
            conversations={conversations}
            isLoading={isLoading}
          />
        )}
      </ActionCableConsumer>
    </View>
  );
};

export default React.memo(ConversationsList);
