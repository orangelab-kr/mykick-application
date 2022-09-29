import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import {screenHeight, screenWidth} from '../../tools/screenSize';
import {TopBarLogo} from './TopBarLogo';

export const TopBar: React.FC = () => {
  return (
    <TopContainer>
      <TopBarLogo />
      {/* <TopBarSettingsButton onPress={() => AsyncStorage.clear()} /> */}
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
