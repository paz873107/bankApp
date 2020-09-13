import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import * as render from './components/imports/AppImpots'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={render.Home} />
        <Stack.Screen name='Register' component={render.Register} />
        <Stack.Screen name='Main' component={render.Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#79d8aa',
    alignItems: 'center',
    justifyContent: 'center',
  },
});