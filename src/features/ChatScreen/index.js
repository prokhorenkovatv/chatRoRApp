import React, {useState, useRef} from 'react';
import { View, StyleSheet } from 'react-native';
import {ActionCableConsumer} from
  '@thrash-industries/react-actioncable-provider';
import {GiftedChat} from "react-native-gifted-chat";
import {useSelector} from "react-redux";
import {selectConversationById} from 'state/chat';

const ChatScreen = ({route}) => {
  const { id } = route.params;
  const cable = useRef({});
  const conversation = useSelector((state)=>selectConversationById(state, id));
  const [messages, setMessages] = useState(conversation.messages);

  const handleReceivedMessage = data => {
    console.log("ChatScreen: ", data)
    setMessages([data.message, ...messages]);
  }

  const sendHandler = message => {
    console.log(cable.current)
    cable.current.send(message.text);
  }

  return (
    <ActionCableConsumer
      channel={{channel: 'MessagesChannel', conversation: id}}
      onReceived={handleReceivedMessage}
      ref={cable}
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

export default React.memo(ChatScreen);

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
