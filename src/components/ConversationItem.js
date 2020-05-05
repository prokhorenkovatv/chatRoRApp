import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {SCREENS} from 'navigation/constants';
import {useNavigation} from '@react-navigation/native';

const ConversationItem = ({title, id}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(SCREENS.CHAT, {title, id})}>
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
    fontSize: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
});
