import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { hp, wp } from 'utils/ui';

const resolveIcon = name =>
  ({
    'icon-camera': 'c',
    'icon-video-camera': 'v',
    'icon-clip': 'p',
    'icon-cross': 'r',
    'icon-checkmark': 'm',
  }[name]);

const Icon = ({ name, style }) => (
  <Text style={[styles.icon, style]}>{resolveIcon(name) || 'r'}</Text>
);

export default Icon;

const styles = StyleSheet.create({
  icon: {
    fontFamily: 'icomoon',
    color: 'grey',
    fontSize: hp(3.2),
  },
});
