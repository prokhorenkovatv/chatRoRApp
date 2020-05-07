import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { createConversation } from 'state/chat';

const AddConversation = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        value={value}
        onChangeText={text => setValue(text)}
        style={styles.textInput}
      />
      <Button
        title="Add"
        style={{ width: '20%' }}
        color="grey"
        onPress={() => dispatch(createConversation(value))}
      />
    </View>
  );
};

export default AddConversation;
const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 15,
  },
  textInput: {
    height: 40,
    width: '80%',
    borderColor: 'grey',
    borderWidth: 1,
    marginRight: 10,
  },
});
