import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import {screenHeight, screenWidth} from '../../tools/screenSize';
import {CommonText} from '../Common/CommonText';

export interface StatusBadgeProps {
  icon?: string;
  color?: string;
  label?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  icon,
  color,
}) => {
  if (!color) color = '#000';

  return (
    <StatusBadgeContainer>
      {icon && <Icon name={icon} size={screenWidth / 20} color={color} />}
      {label && <StatusBadgeText style={{color}}>{label}</StatusBadgeText>}
    </StatusBadgeContainer>
  );
};

const StatusBadgeContainer = styled(View)`
  flex-direction: row;
  padding: ${screenHeight * 0.01}px ${screenWidth * 0.03}px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
`;

const StatusBadgeText = styled(CommonText)`
  margin-left: ${screenHeight * 0.005}px;
  font-size: ${screenWidth / 23}px;
`;
