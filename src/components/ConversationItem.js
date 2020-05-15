import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { SCREENS } from 'navigation/constants';
import { useNavigation } from '@react-navigation/native';
import { wp, hp } from 'utils/ui';
import PropTypes from 'prop-types';

const ConversationItem = ({ title, id }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(SCREENS.CHAT, { title, id })}
    >
      <View styles={styles.wrapper}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ConversationItem;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  text: {
    color: 'black',
    backgroundColor: 'lightgrey',
    fontSize: hp(2.5),
    borderStyle: 'solid',
    borderWidth: wp(0.3),
    borderColor: 'grey',
    padding: wp(2.6),
    marginVertical: hp(1),
    marginHorizontal: wp(4),
    borderRadius: 5,
  },
});

ConversationItem.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number,
};
