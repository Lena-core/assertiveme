import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import MainScreen from './screens/MainScreen';
import HistoryScreen from './screens/HistoryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Main"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
