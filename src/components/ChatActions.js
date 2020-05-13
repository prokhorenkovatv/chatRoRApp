import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'components/Icon';

const ChatActions = ({ onImageSend }) => {
  return (
    <TouchableOpacity onPress={() => onImageSend()}>
      <Icon name="icon-clip" style={{ marginLeft: 10, marginBottom: 10 }} />
    </TouchableOpacity>
  );
};
export default ChatActions;
