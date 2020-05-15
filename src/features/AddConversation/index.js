import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { createConversation } from 'state/conversations';
import { hp, wp } from 'utils/ui';

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
        style={styles.addButton}
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
    paddingTop: hp(2),
  },
  textInput: {
    height: hp(5),
    width: wp('80%'),
    borderColor: 'grey',
    borderWidth: wp(0.3),
    marginRight: wp(2),
  },
  addButton: { width: wp('20%') },
});
