import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import ScreenNames from '../utils/screenNames';
import Home from '../modules/home';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={ScreenNames.home} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
