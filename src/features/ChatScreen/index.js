import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { ActionCableConsumer } from '@thrash-industries/react-actioncable-provider';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';
import { selectConversationById } from 'state/chat';

const ChatScreen = ({ route }) => {
  const { id } = route.params;
  const cable = useRef({});
  const conversation = useSelector(state => selectConversationById(state, id));

  const createUserAvatarUrl = () => {
    const rand1 = Math.round(Math.random() * 200 + 100);
    const rand2 = Math.round(Math.random() * 200 + 100);
    return `https://placeimg.com/${rand1}/${rand2}/any`;
  };

  const [messages, setMessages] = useState(
    conversation.messages.map(({ id, created_at, ...x }) => ({
      _id: id,
      createdAt: new Date(Date.parse(created_at)),
      user: {
        _id: 0,
        name: 'user',
        avatar: createUserAvatarUrl(),
      },
      ...x,
    })),
  );

  const handleReceivedMessage = data => {
    console.log('received: ', data);
    setMessages(prevState => GiftedChat.append(prevState, data.message));
  };

  const sendHandler = message => {
    console.log('SEND', cable.current);
    // cable.current.send(({text: message.text, conversation_id: id}));
    cable.current.perform(
      'new_message',
      { channel: 'MessagesChannel', conversation: id },
      { text: message.text, conversation_id: id },
    );
    setMessages(prevState => GiftedChat.append(prevState, message));
  };

  return (
    <ActionCableConsumer
      channel={{ channel: 'MessagesChannel', conversation: id }}
      onReceived={handleReceivedMessage}
      ref={cable}
    >
      <View style={styles.container}>
        <GiftedChat
          renderUsernameOnMessage
          messages={messages}
          onSend={message => sendHandler(message[0])}
          user={{ _id: 1, name: 'user', avatar: createUserAvatarUrl() }}
          showUserAvatar
          renderBubble={props => {
            return (
              <Bubble
                {...props}
                wrapperStyle={{
                  right: {
                    backgroundColor: 'hotpink',
                  },
                }}
              />
            );
          }}
        />
      </View>
    </ActionCableConsumer>
  );
};

export default React.memo(ChatScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
