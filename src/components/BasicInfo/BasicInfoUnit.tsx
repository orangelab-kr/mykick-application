import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import {screenHeight, screenWidth} from '../../tools/screenSize';
import {CommonText} from '../Common/CommonText';

export interface BasicInfoUnitProps {
  label?: string;
  icon?: string;
  color?: string;
}

export const BasicInfoUnit: React.FC<BasicInfoUnitProps> = ({
  label,
  icon,
  color,
}) => {
  if (!color) color = '#1A1C1D';

  return (
    <BasicInfoUnitContainer>
      {icon && <Icon name={icon} size={screenWidth / 17} color="#1A1C1D" />}
      {label && <BasicInfoUnitText>{label}</BasicInfoUnitText>}
    </BasicInfoUnitContainer>
  );
};

const BasicInfoUnitContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${screenHeight * 0.01}px;
`;

const BasicInfoUnitText = styled(CommonText)`
  font-size: ${screenWidth / 24}px;
  font-weight: 600;
`;
