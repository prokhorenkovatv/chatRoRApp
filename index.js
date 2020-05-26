// require('react-native').unstable_enableLogBox();
import { AppRegistry } from 'react-native';
import React from 'react';
import ActionCableProvider from '@thrash-industries/react-actioncable-provider';
import ActionCableJwt from './actionCable';
import { API_WS_ROOT } from './src/constants';
import App from './App';
import { name as appName } from './app.json';
import AsyncStorage from '@react-native-community/async-storage';
import { isProd } from 'utils/env';

if (!isProd) {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackHooks: true,
    trackExtraHooks: [[require('react-redux'), 'useSelector', 'useDispatch']],
  });
}

let token = 'abrakadabra';
AsyncStorage.setItem('token', token);

const connection = ActionCableJwt.createConnection({
  tokenCallback: async () => {
    let token = await AsyncStorage.getItem('token');
    return token;
  },
});

const cable = connection.createConsumer(API_WS_ROOT);

export const AppContainer = () => {
  console.log(cable);
  return (
    <ActionCableProvider cable={cable}>
      <App />
    </ActionCableProvider>
  );
};

AppRegistry.registerComponent(appName, () => AppContainer);
