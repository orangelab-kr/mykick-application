import AsyncStorage from '@react-native-async-storage/async-storage';
import {MenuAction, MenuView} from '@react-native-menu/menu';
import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import {navigationRef} from '../../tools/navigation';
import {screenHeight, screenWidth} from '../../tools/screenSize';
import {TopBarLogo} from './TopBarLogo';
import {TopBarSettingsButton} from './TopBarSettingsButton';

export const TopBar: React.FC = () => {
  const route = navigationRef.current?.getCurrentRoute();
  const actions: MenuAction[] = [
    {
      id: 'Control',
      title: '리얼마이킥 모드',
      state: route?.name === 'Control' ? 'on' : 'off',
    },
    {
      id: 'Rent',
      title: '마이킥 모드',
      state: route?.name === 'Rent' ? 'on' : 'off',
    },
  ];

  const onAction = (e: any) =>
    navigationRef.current?.navigate(e.nativeEvent.event);

  return (
    <TopContainer>
      <MenuView
        actions={actions}
        onPressAction={onAction}
        {...({children: <TopBarLogo />} as any)}
      />
      <TopBarSettingsButton onPress={() => AsyncStorage.clear()} />
    </TopContainer>
  );
};

const TopContainer = styled(View)`
  padding: ${screenHeight * 0.01}px ${screenWidth * 0.06}px;
  background-color: #fff;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
