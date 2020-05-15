import React from 'react';
import { View, StyleSheet, Text, ScrollView, Button } from 'react-native';
import { THEME, hp, wp } from 'utils/ui';
import PropTypes from 'prop-types';

const LoadingError = ({ onRefresh }) => (
  <ScrollView style={styles.refreshWrap}>
    <View style={styles.container}>
      <Text style={styles.emptyTitle}>
        No connection,
        {'\n'}
        drag down to refresh,
        {'\n'}
        or press the button below
      </Text>
      <Button title="Try again" onPress={onRefresh} style={styles.buttonText} />
    </View>
  </ScrollView>
);

export default LoadingError;

const styles = StyleSheet.create({
  refreshWrap: {
    width: wp('100%'),
    height: hp('100%'),
    paddingTop: hp(5),
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('100%'),
    height: hp('100%'),
  },
  emptyTitle: {
    fontSize: hp(2.5),
    color: THEME.GREY,
    width: wp('100%'),
    textAlign: 'center',
  },
  button: {
    backgroundColor: THEME.GREY,
    color: 'white',
    marginTop: hp(5),
  },
  buttonText: {
    fontSize: hp(1.8),
  },
});

LoadingError.propTypes = {
  onRefresh: PropTypes.func,
};
