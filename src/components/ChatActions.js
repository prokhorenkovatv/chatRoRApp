import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'components/Icon';
import { wp, hp } from 'utils/ui';
import PropTypes from 'prop-types';

const ChatActions = ({ onImageSend }) => {
  return (
    <TouchableOpacity onPress={() => onImageSend()}>
      <Icon name="icon-clip" style={styles.icon} />
    </TouchableOpacity>
  );
};
export default ChatActions;

const styles = StyleSheet.create({
  icon: { marginLeft: wp(3), marginBottom: hp(1.5) },
});

ChatActions.propTypes = {
  onImageSend: PropTypes.func.isRequired,
};
