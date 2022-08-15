import Slider from '@react-native-community/slider';
import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {screenHeight, screenWidth} from '../../tools/screenSize';
import {CommonText} from '../Common/CommonText';

export const SpeedController: React.FC = () => {
  return (
    <SpeedContainer>
      <SpeedLabel>속도</SpeedLabel>
      <SpeedCenterContainer>
        <SpeedCurrentText>25km/h</SpeedCurrentText>
        <Slider
          style={{width: '100%', height: 45}}
          minimumValue={5}
          maximumValue={25}
          step={5}
        />
      </SpeedCenterContainer>
      <SpeedMinMaxContainer>
        <SpeedMinMaxText>5km/h</SpeedMinMaxText>
        <SpeedMinMaxText>25km/h</SpeedMinMaxText>
      </SpeedMinMaxContainer>
    </SpeedContainer>
  );
};

const SpeedContainer = styled(View)`
  margin-top: ${screenHeight * 0.02}px;
`;

const SpeedLabel = styled(CommonText)`
  font-size: ${screenWidth / 20}px;
  font-weight: 600;
`;

const SpeedCurrentText = styled(CommonText)`
  color: #3578f6;
  font-weight: 800;
  font-size: ${screenWidth / 15}px;
`;

const SpeedMinMaxContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

const SpeedMinMaxText = styled(CommonText)`
  font-size: ${screenWidth / 27}px;
  color: #333739;
  font-weight: 400;
`;

const SpeedCenterContainer = styled(View)`
  align-items: center;
`;
