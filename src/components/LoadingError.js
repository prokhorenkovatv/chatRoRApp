import React from 'react';
import {
  View, StyleSheet, Text, ScrollView, Button
} from 'react-native';
import { THEME } from 'utils/ui';

const LoadingError = ({ onRefresh }) => (
  <ScrollView
    style={styles.refreshWrap}
  >
    <View style={styles.container}>
      <Text style={styles.emptyTitle}>
        No connection,
        {'\n'}
        drag down to refresh,
        {'\n'}
        or press the button below
      </Text>
      <Button
        title="Try again"
        onPress={onRefresh}
        style={styles.buttonText}
      />
    </View>
  </ScrollView>
);

export default LoadingError;

const styles = StyleSheet.create({
  refreshWrap: {
    width: '100%',
    height: '100%',
    paddingTop: 50,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  emptyTitle: {
    fontSize: 25,
    color: THEME.GREY,
    width: '100%',
    textAlign: 'center',
  },
  button: {
    backgroundColor: THEME.GREY,
    color: 'white',
    marginTop: 50
  },
  buttonText: {
    fontSize: 18
  }
});
