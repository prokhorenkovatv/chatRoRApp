import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadConversations, selectConversations } from 'state/chat';
import Spinner from 'components/Spinner';
import LoadingError from 'components/LoadingError';
import ConversationsList from 'features/ConversationsList';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from 'navigation/constants';
import DeepLinking from 'react-native-deep-linking';
import { Linking } from 'react-native';

const LOAD_STATES = {
  LOADING: 'LOADING',
  FAILED: 'FAILED',
  LOADED: 'LOADED',
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loadingState, changeLoadingStatus] = useState(LOAD_STATES.LOADING);

  const setLoading = () => changeLoadingStatus(LOAD_STATES.LOADING);
  const setLoaded = () => changeLoadingStatus(LOAD_STATES.LOADED);
  const setFailed = () => changeLoadingStatus(LOAD_STATES.FAILED);

  const isLoading = loadingState === LOAD_STATES.LOADING;

  const _isMounted = useRef(true);

  const fetchConversations = () => {
    dispatch(loadConversations())
      .then(() => {
        if (_isMounted.current) {
          setLoaded;
        }
      })
      .catch(() => {
        if (_isMounted.current) {
          setFailed;
        }
      });
  };

  useEffect(() => {
    setLoading();
    DeepLinking.addScheme('chatrorapp://');
    DeepLinking.addRoute('/conversation/:id', response => {
      navigation.navigate(SCREENS.CHAT, { id: response.id });
    });
    Linking.getInitialURL()
      .then(url => {
        if (url) {
          Linking.openURL(url);
        }
      })
      .catch(err => console.error('An error occurred', err));

    Linking.addEventListener('url', handleOpenURL);

    fetchConversations();

    return () => {
      _isMounted.current = false;
      Linking.removeEventListener('url', handleOpenURL);
    };
  }, []);

  const handleOpenURL = event => {
    DeepLinking.evaluateUrl(event.url);
  };

  const conversations = useSelector(selectConversations);

  if ([LOAD_STATES.FAILED].includes(loadingState))
    return <LoadingError onRefresh={fetchConversations} />;

  if (isLoading) return <Spinner />;

  return <ConversationsList conversations={conversations} />;
};

export default HomeScreen;
