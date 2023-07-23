import { FC } from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MenuLabel } from './BottomTabStyle';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/HomeScreen';
import { AntDesign, Entypo } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const homeStackOptions = {
  tabBarLabel: ({ focused }) => {
    return focused ? <MenuLabel>Home</MenuLabel> : null;
  },
  tabBarIcon: ({ focused }) => (
    <>{focused ? <Entypo name='home' size={24} color='#333653' /> : null}</>
  ),
};

const BottomTabNavigator = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        style={{ backgroundColor: 'red' }}
      >
        <Tab.Screen name='Home' component={Home} options={homeStackOptions} />
      </Tab.Navigator>
    </>
  );
};

export default BottomTabNavigator;
