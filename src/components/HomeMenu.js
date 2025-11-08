import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import NewPost from '../screens/NewPost';

const Tab = createBottomTabNavigator();

export default function HomeMenu() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Nuevo post"
        component={NewPost}
        options={{
            tabBarIcon: ({ color, size }) => (
                <FontAwesome name="home" size={size} color={color} />
            ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
            tabBarIcon: ({ color, size }) => (
                <FontAwesome name="home" size={size} color={color} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
