import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {LogBox, StatusBar} from 'react-native';
import {NotifierWrapper} from 'react-native-notifier';
import {ShowNotificationParams} from 'react-native-notifier/lib/typescript/types';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RecoilRoot} from 'recoil';
import {RootNavigator} from './navigators/root';
import {navigationRef} from './tools/navigation';

export const App: React.FC = () => {
  const notifierProps: ShowNotificationParams = {
    duration: 5000,
    showAnimationDuration: 800,
    hideOnPress: true,
    componentProps: {
      containerStyle: {borderRadius: 12},
      titleStyle: {color: '#000', fontWeight: '800'},
      descriptionStyle: {color: '#000', fontWeight: '400'},
    },
  };

  return (
    <RecoilRoot>
      <StatusBar barStyle="dark-content" />
      <NotifierWrapper {...notifierProps}>
        <SafeAreaProvider>
          <NavigationContainer
            ref={navigationRef}
            theme={{colors: {background: '#fff'}} as any}>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </NotifierWrapper>
    </RecoilRoot>
  );
};

LogBox.ignoreAllLogs();
