import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from '../screens/Register';
import Home from '../screens/Home'; 
import Login from '../screens/Login';
import Comentario from '../screens/Comentario';
import HomeMenu from '../components/HomeMenu';

const Stack = createNativeStackNavigator();

export default class Nav extends Component {
  render() {

    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={HomeMenu} /> 
        <Stack.Screen name="Comentario" component={Comentario} /> 
      </Stack.Navigator>
    );
  }
}

