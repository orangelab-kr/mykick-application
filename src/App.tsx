import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {LogBox, SafeAreaView, StatusBar, Text} from 'react-native';
import {NotifierWrapper} from 'react-native-notifier';
import {ShowNotificationParams} from 'react-native-notifier/lib/typescript/types';
import {RecoilRoot} from 'recoil';
// import {navigationRef} from './navigators/navigation';
// import {RootNavigator} from './navigators/root';

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
      <NotifierWrapper {...notifierProps}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Text>Hello World!</Text>
        </SafeAreaView>
        <NavigationContainer
          // ref={navigationRef}
          theme={{colors: {background: '#fff'}} as any}>
          {/* <RootNavigator /> */}
        </NavigationContainer>
      </NotifierWrapper>
    </RecoilRoot>
  );
};

LogBox.ignoreAllLogs();
