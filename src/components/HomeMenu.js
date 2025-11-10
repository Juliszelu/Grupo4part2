import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import NewPost from '../screens/NewPost';
import HomeComment from './HomeComment';

const Tab = createBottomTabNavigator();

export default function HomeMenu() {
  return (
    <Tab.Navigator screenOptions={tabStyles}>
      
      <Tab.Screen
        name="Home"
        component={HomeComment}
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
            <FontAwesome name="edit" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />

    </Tab.Navigator>
  );
}
const tabStyles = {
  headerShown: false,

  tabBarActiveTintColor: "#6A5747",   
  tabBarInactiveTintColor: "#A49187", 

  tabBarStyle: {
    backgroundColor: "#FAF9F7",
    borderTopColor: "#E5D7C8",
    height: 60,
    paddingBottom: 6,
    paddingTop: 6,
  },

  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: "700",
  },
};

