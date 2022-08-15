import React from 'react';
import {Switch, SwitchProps, View} from 'react-native';
import styled from 'styled-components/native';
import {screenHeight, screenWidth} from '../../tools/screenSize';
import {CommonText} from '../Common/CommonText';

export interface SwitchControllerProps extends SwitchProps {
  label?: string;
}

export const SwitchController: React.FC<SwitchControllerProps> = ({
  label,
  ...props
}) => {
  return (
    <SwitchContainer>
      {label && <SwitchText>{label}</SwitchText>}
      <ResizedSwitch {...props} />
    </SwitchContainer>
  );
};

const ResizedSwitch = styled(Switch)`
  transform: scale(0.9, 0.9);
`;

const SwitchContainer = styled(View)`
  justify-content: center;
  align-items: center;
`;

const SwitchText = styled(CommonText)`
  margin-bottom: ${screenHeight * 0.01}px;
  font-size: ${screenWidth / 27}px;
  font-weight: 500;
`;
