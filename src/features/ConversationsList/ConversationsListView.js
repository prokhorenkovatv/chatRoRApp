import React from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import ConversationItem from 'components/ConversationItem';
import { hp } from 'utils/ui';
import PropTypes from 'prop-types';

const renderItem = ({ item }) => (
  <ConversationItem title={item.title} id={item.id} />
);

const keyExtractor = item => item.id.toString();

const ConversationsListView = ({ conversations }) => (
  <SafeAreaView style={styles.container}>
    <FlatList
      data={conversations}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
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

ConversationsListView.propTypes = {
  conversations: PropTypes.array,
};
