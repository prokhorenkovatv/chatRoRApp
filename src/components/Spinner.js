import React from 'react';
import { ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { THEME } from 'utils/ui';

const Spinner = () => (
  <ScrollView contentContainerStyle={styles.center}>
    <ActivityIndicator size="large" color={THEME.GREY} />
  </ScrollView>
);

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Spinner;
