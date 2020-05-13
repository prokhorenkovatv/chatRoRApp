import React, { useEffect, useRef } from 'react';
import ConversationsListView from 'features/ConversationsList/ConversationsListView';
import { ActionCableConsumer } from '@thrash-industries/react-actioncable-provider';
import { Text, View } from 'react-native';
import { isEmpty } from 'utils';
import AddConversation from 'features/AddConversation';
import { useSelector, shallowEqual } from 'react-redux';
import { selectConversations } from 'state/conversations';

const ConversationsList = () => {
  const cable = useRef({});
  const conversations = useSelector(selectConversations, shallowEqual);

  const handleReceivedConversation = response => {
    console.log(response);
  };

  if (isEmpty(conversations))
    return (
      <View style={{ flex: 1 }}>
        <Text>No conversations yet</Text>
      </View>
    );

  return (
    <View style={{ flex: 1 }}>
      <AddConversation />
      <ActionCableConsumer
        ref={cable}
        channel={{ channel: 'ConversationsChannel' }}
        onReceived={handleReceivedConversation}
      >
        <ConversationsListView conversations={conversations} />
      </ActionCableConsumer>
    </View>
  );
};

export default React.memo(ConversationsList);
