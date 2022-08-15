import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import {screenHeight, screenWidth} from '../../tools/screenSize';
import {CommonText} from '../Common/CommonText';

export interface FindButtonProps {
  onPress?: () => any;
}

export const FindButton: React.FC<FindButtonProps> = ({onPress}) => {
  return (
    <FindButtonContainer onPress={onPress}>
      <Icon name="volume-up" size={screenWidth / 12} color="#3578F6" />
      <FindButtonText>킥보드 찾기</FindButtonText>
    </FindButtonContainer>
  );
};

const FindButtonContainer = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
`;

const FindButtonText = styled(CommonText)`
  margin: ${screenHeight * 0.004}px;
  font-size: ${screenWidth / 25}px;
  font-weight: 700;
  color: #3578f6;
`;
