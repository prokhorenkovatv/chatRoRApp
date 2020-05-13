import React from 'react';
import { Bubble } from 'react-native-gifted-chat';

const ChatBubble = props => (
  <Bubble
    {...props}
    wrapperStyle={{
      right: {
        backgroundColor: props.currentMessage.image ? 'transparent' : 'hotpink',
      },
    }}
  />
);
export default ChatBubble;
