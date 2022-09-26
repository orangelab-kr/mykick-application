import {CommonActions} from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  openSettings,
  PERMISSIONS,
  requestMultiple,
  requestNotifications,
} from 'react-native-permissions';
import styled from 'styled-components/native';
import {CommonText} from '../components/Common/CommonText';
import {Depth} from '../components/Common/Depth';
import {IconWithTextBox} from '../components/IconWithTextBox';
import isAndroid from '../tools/isAndroid';
import {navigationRef} from '../tools/navigation';
import {screenHeight} from '../tools/screenSize';

export const requestPermissions = isAndroid
  ? [
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
      PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
      PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
    ]
  : [
      PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL,
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    ];

export const Permission: React.FC = () => {
  const onClick = async () => {
    const permissions = await requestMultiple(requestPermissions);
    if (Object.values(permissions).find(p => p !== 'granted')) {
      return Alert.alert(
        '권한이 필요합니다.',
        '설정에 접근하여 모든 권한을 허용해주세요.',
        [{text: '확인', onPress: openSettings}],
      );
    }

    navigationRef.current?.dispatch(
      CommonActions.reset({index: 0, routes: [{name: 'Splash'}]}),
    );
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <Depth disabled />
      <ScrollView>
        <Container>
          <Title>
            <Bold>접근 권한 승인</Bold>
          </Title>
          <Title>반드시 필요한 권한입니다.</Title>
          <IconWithTextBox icon="bluetooth">
            <Bold>킥보드 잠금해제</Bold>와 <Bold>헬멧 잠금해제</Bold> 통신할때에
            사용합니다.
          </IconWithTextBox>
          <IconWithTextBox icon="near-me">
            지도에서 <Bold>내 위치</Bold>를 표시할 때 사용합니다.
          </IconWithTextBox>
          <Button onPress={onClick}>
            <ButtonText>동의</ButtonText>
          </Button>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

const Container = styled(View)`
  margin: 12% 8%;
  margin-top: ${screenHeight * 0.2}px;
`;

const Button = styled(TouchableOpacity)`
  margin: 15px 0;
  width: 100%;
  height: ${screenHeight * 0.05}px;
  align-items: center;
  justify-content: center;
  background-color: black;
  border-radius: 3px;
  shadow-color: #999;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  elevation: 5;
  shadow-offset: {width: 3px, height: 3px};
`;

const ButtonText = styled(CommonText)`
  color: white;
  font-weight: 600;
`;

const Title = styled(CommonText)`
  color: #0a0c0c;
  font-size: 26px;
  shadow-color: #999;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  elevation: 5;
  shadow-offset: {width: 3px, height: 3px};
  font-weight: 300;
`;

const Bold = styled(CommonText)`
  font-weight: 700;
`;
