import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadConversations,
  selectConversations,
  createConversation
} from 'state/chat';
import Spinner from 'components/Spinner';
import LoadingError from 'components/LoadingError';
import ConversationsListView
  from 'features/ConversationsList/ConversationsListView';
import { ActionCableConsumer }
  from '@thrash-industries/react-actioncable-provider';
import { Text, View, TextInput, Button } from 'react-native'
import { isEmpty } from 'utils';

const LOAD_STATES = {
  LOADING: 'LOADING',
  FAILED: 'FAILED',
  LOADED: 'LOADED',
};

const ConversationsList = () => {
  const dispatch = useDispatch();
  
  const [value, setValue] = useState('');
  const [loadingState, changeLoadingStatus] = useState(LOAD_STATES.LOADING);

  const setLoading = () => changeLoadingStatus(LOAD_STATES.LOADING);
  const setLoaded = () => changeLoadingStatus(LOAD_STATES.LOADED);
  const setFailed = () => changeLoadingStatus(LOAD_STATES.FAILED);

  const fetchConversations = () => {
    setLoading();
    dispatch(loadConversations())
      .then(setLoaded)
      .catch(setFailed)
  };

  useEffect(() => {
   fetchConversations()
  }, []);

  const conversations = useSelector(selectConversations);

  const isLoading = loadingState === LOAD_STATES.LOADING;
  
  if ([LOAD_STATES.FAILED].includes(loadingState))
    return (
      <LoadingError
        onRefresh={fetchConversations}
      />)
  if (isLoading) return <Spinner />;

  const handleReceivedConversation = response => {
    console.log(response)
  }

  return (
    <View style={{flex:1}}>
      <View style={styles.inputWrapper}>
        <TextInput
          value={value}
          onChangeText={text => setValue(text)}
          style={styles.textInput}
        />
        <Button
          title="Add"
          style={{width: '20%'}}
          onPress={() => dispatch(createConversation(value))}
        />
      </View>
      <ActionCableConsumer
        channel={{ channel: 'ConversationsChannel' }}
        onReceived={handleReceivedConversation}
      >
        {isEmpty(conversations) ?
          <Text>No conversations yet</Text>
        : <ConversationsListView
          conversations={conversations}
          isLoading={isLoading}
        />}
      </ActionCableConsumer>
     
    </View>
   
  )
}

export default React.memo(ConversationsList);

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  textInput: {
    height: 40,
    width: '80%',
    borderColor: 'grey',
    borderWidth: 1,
    marginRight: 10 }
});
