import React, { useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { selectUserPicture, selectUserName } from 'state/user';
import { wp, hp } from 'utils/ui';

const ProfileScreen = () => {
  const picture = useSelector(selectUserPicture);
  const name = useSelector(selectUserName);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{name}</Text>
      <Image
        style={styles.avatar}
        source={{
          uri: picture,
        }}
      />
    </View>
  );
};
export default ProfileScreen;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
  avatar: {
    borderRadius: wp(40) / 2,
    height: wp(40),
    width: wp(40),
  },
  text: {
    marginVertical: hp(3),
    fontSize: hp(2.5),
  },
});
