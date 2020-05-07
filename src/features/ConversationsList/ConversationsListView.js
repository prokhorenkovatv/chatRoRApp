import React from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import ConversationItem from 'components/ConversationItem';
import { hp } from 'utils/ui';

const ConversationsListView = ({ conversations }) => (
  <SafeAreaView style={styles.container}>
    <FlatList
      data={conversations}
      renderItem={({ item }) => (
        <ConversationItem title={item.title} id={item.id} />
      )}
      keyExtractor={item => item.id.toString()}
    />
  </SafeAreaView>
);

export default ConversationsListView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp(2),
    justifyContent: 'center',
  },
});
