import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {RootNavigatorRouteParams} from '../models/navigation';
import {Rent} from '../screens/rent';
import {Splash} from '../screens/splash';
import {Start} from '../screens/start';

export const RootNavigator: React.FC = () => {
  const Stack = createNativeStackNavigator<RootNavigatorRouteParams>();

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen
        name="Start"
        component={Start}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen
        name="Rent"
        component={Rent}
        options={{gestureEnabled: true}}
      />
    </Stack.Navigator>
  );
};
