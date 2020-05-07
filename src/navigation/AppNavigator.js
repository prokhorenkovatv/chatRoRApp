import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SCREENS } from 'navigation/constants';
import ChatScreen from 'features/ChatScreen';
import HomeScreen from 'features/HomeScreen';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SCREENS.HOME}>
        <Stack.Screen name="Chat App" component={HomeScreen} />
        <Stack.Screen
          name={SCREENS.CHAT}
          options={({ route }) => ({
            title: route.params.title,
          })}
          component={ChatScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
