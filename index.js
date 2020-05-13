/**
 * @format
 */
/**
 * @format
 */

import { AppRegistry } from 'react-native';
import React from 'react';
import ActionCableProvider from '@thrash-industries/react-actioncable-provider';
import ActionCable from 'react-native-actioncable';
import { API_WS_ROOT } from './src/constants';
import App from './App';
import { name as appName } from './app.json';

if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackHooks: true,
    trackExtraHooks: [[require('react-redux'), 'useSelector', 'useDispatch']],
  });
}

const cable = ActionCable.createConsumer(API_WS_ROOT);

export const AppContainer = () => {
  return (
    <ActionCableProvider cable={cable}>
      <App />
    </ActionCableProvider>
  );
};

AppRegistry.registerComponent(appName, () => AppContainer);
