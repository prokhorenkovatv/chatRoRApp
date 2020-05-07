import React, { useEffect, useRef } from 'react';
import ConversationsListView from 'features/ConversationsList/ConversationsListView';
import { ActionCableConsumer } from '@thrash-industries/react-actioncable-provider';
import { Text, View } from 'react-native';
import { isEmpty } from 'utils';
import AddConversation from 'features/AddConversation';

const ConversationsList = ({ conversations }) => {
  const cable = useRef({});

  const handleReceivedConversation = response => {
    console.log(response);
  };

  return (
    <View style={{ flex: 1 }}>
      <AddConversation />
      <ActionCableConsumer
        ref={cable}
        channel={{ channel: 'ConversationsChannel' }}
        onReceived={handleReceivedConversation}
      >
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
