import {MenuAction, MenuView} from '@react-native-menu/menu';
import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import {screenHeight, screenWidth} from '../../tools/screenSize';
import {TopBarLogo} from './TopBarLogo';
import {TopBarSettingsButton} from './TopBarSettingsButton';

export const TopBar: React.FC = () => {
  const actions: MenuAction[] = [
    {
      id: 'realmykick',
      title: '리얼마이킥 모드',
      state: 'mixed',
    },
    {id: 'rent', title: '마이킥 모드'},
  ];

  return (
    <TopContainer>
      <MenuView actions={actions} {...({children: <TopBarLogo />} as any)} />
      <TopBarSettingsButton />
    </TopContainer>
  );
};

const TopContainer = styled(View)`
  height: ${screenHeight * 0.065}px;
  padding: 0 ${screenWidth * 0.06}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
