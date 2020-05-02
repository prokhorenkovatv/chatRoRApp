import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import {ActionCableConsumer} from
  '@thrash-industries/react-actioncable-provider';
import {GiftedChat} from "react-native-gifted-chat";
import {useSelector} from "react-redux";
import {selectConversationById} from 'state/chat';

const ChatScreen = ({route}) => {
  const { id } = route.params;
  const conversation = useSelector((state)=>selectConversationById(state, id));
  const [messages, setMessages] = useState(conversation.messages);

  const handleReceivedMessage = data => {
    console.log("ChatScreen: ", data)
    // setMessages([data.message, ...messages]);
  }

  const sendHandler = message => {
    const newMessages = [...messages, message];
    setMessages(newMessages)
  }

  return (
    <ActionCableConsumer
      channel={{channel: 'MessagesChannel', conversation: id}}
      onReceived={handleReceivedMessage}
      onConnect={console.log("on")}
      onDisconnect={console.log("off")}
    >
      <View style={styles.container}>
        <GiftedChat
          renderUsernameOnMessage
          messages={messages}
          onSend={(message) => sendHandler(message[0])}
          user={{ id: messages.id }}
        />
      </View>
    </ActionCableConsumer>
  )
};

export default ChatScreen;

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
