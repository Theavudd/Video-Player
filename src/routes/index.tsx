import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import ScreenNames from '../utils/screenNames';
import Home from '../modules/home';
import Splash from '../modules/splash';
import PlayVideos from '../modules/videoPlayer/index2';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'simple_push',
          animationDuration: 1,
        }}>
        <Stack.Screen name={ScreenNames.splash} component={Splash} />
        <Stack.Screen name={ScreenNames.home} component={Home} />
        <Stack.Screen name={ScreenNames.videoPlayer} component={PlayVideos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
