import React from 'react';
import { Bubble, StyleSheet } from 'react-native-gifted-chat';

const ChatBubble = props => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: props.currentMessage.image
            ? 'transparent'
            : 'hotpink',
        },
      }}
      usernameStyle={{
        fontWeight: 'bold',
      }}
    />
  );
};
export default ChatBubble;
