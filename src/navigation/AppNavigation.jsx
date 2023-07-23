import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'BottomTabNavigator'}
    >
      <Stack.Screen name='BottomTabNavigator' component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
