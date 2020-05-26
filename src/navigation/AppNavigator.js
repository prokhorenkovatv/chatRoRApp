import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SCREENS } from 'navigation/constants';
import ChatScreen from 'features/ChatScreen';
import HomeScreen from 'features/HomeScreen';
import SigninScreen from 'features/SigninScreen';
import { selectIsLoggedIn, selectUserName } from 'state/user';
import { useSelector } from 'react-redux';
import AppHeader from 'features/AppHeader';
import ProfileScreen from 'features/ProfileScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const name = useSelector(selectUserName);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name={name ? `Hi, ${name}!` : 'Hi!'}
              options={{
                headerRight: () => <AppHeader />,
              }}
              component={HomeScreen}
            />
            <Stack.Screen
              name={SCREENS.CHAT}
              options={({ route }) => ({
                title: route.params.title,
              })}
              component={ChatScreen}
            />
            <Stack.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
          </>
        ) : (
          <Stack.Screen
            name="Welcome!"
            component={SigninScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
