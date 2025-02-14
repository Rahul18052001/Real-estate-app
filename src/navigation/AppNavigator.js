import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeListScreen from '../screens/HomeListScreen';
import HomeDetailScreen from '../screens/HomeDetailScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Only valid children (Screen, Group, or React.Fragment) are allowed here */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="HomeList"
          component={HomeListScreen}
          options={{ title: 'Home List' }}
        />
        <Stack.Screen
          name="HomeDetail"
          component={HomeDetailScreen}
          options={{ title: 'Home Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}