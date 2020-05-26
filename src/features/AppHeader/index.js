import React, { useRef } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { wp, hp } from 'utils/ui';
import { useSelector, useDispatch } from 'react-redux';
import { signout, selectUserPicture } from 'state/user';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { SCREENS } from 'navigation/constants';
import { useNavigation } from '@react-navigation/native';

const AppHeader = () => {
  const menu = useRef();
  const dispatch = useDispatch();

  const hideMenu = () => menu.current.hide();

  const showMenu = () => menu.current.show();

  const picture = useSelector(selectUserPicture);
  const navigation = useNavigation();

  return (
    <TouchableOpacity>
      <Menu
        ref={menu}
        button={
          <Avatar
            onPress={showMenu}
            style={styles.avatar}
            rounded
            large
            source={{
              uri: picture,
            }}
          />
        }
      >
        <MenuItem
          onPress={() => {
            hideMenu(), navigation.navigate(SCREENS.PROFILE);
          }}
        >
          Profile
        </MenuItem>
        <MenuDivider />
        <MenuItem
          onPress={() => {
            hideMenu(), dispatch(signout());
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </TouchableOpacity>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  avatar: {
    marginRight: 10,
    height: hp('4.5%'),
    width: wp('9%'),
  },
});
