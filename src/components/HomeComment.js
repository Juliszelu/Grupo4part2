import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Comentario from '../screens/Comentario';

const Stack = createNativeStackNavigator();

export default class HomeComment extends Component {
  render() {

    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Comentario" component={Comentario} />
      </Stack.Navigator>
    );
  }
}

