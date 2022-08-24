import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {WebView, WebViewNavigation} from 'react-native-webview';
import {TopBar} from '../components/TopBar/TopBar';
import {RootNavigatorRouteParams} from '../models/navigation';
import {navigationRef} from '../tools/navigation';

export const Rent: React.FC = () => {
  const {params} = useRoute<RouteProp<RootNavigatorRouteParams, 'Rent'>>();
  const path = params?.path || 'started/pricing';
  const onNavigationStateChange = (state: WebViewNavigation) => {
    if (!state.url.endsWith('/started')) return;
    navigationRef.current?.navigate('Start');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopBar />
      <WebView
        source={{uri: `https://my.hikick.kr/${path}`}}
        onNavigationStateChange={onNavigationStateChange}
        javascriptEnabled
        startInLoadingState
        scalesPageToFit
      />
    </SafeAreaView>
  );
};
