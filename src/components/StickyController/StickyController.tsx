import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {screenHeight} from '../../tools/screenSize';

export interface ControllerProps {
  children: React.ReactNode;
}

export const StickyController: React.FC<ControllerProps> = ({children}) => {
  return (
    <StickyContainer pointerEvents="box-none">
      <ControllerContainer>{children}</ControllerContainer>
    </StickyContainer>
  );
};

const StickyContainer = styled(View)`
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
  bottom: 0;
`;

const ControllerContainer = styled(View)`
  width: 87%;
  border-radius: 16px;
  height: ${screenHeight * 0.34}px;
  margin-bottom: ${screenHeight * 0.18}px;
  padding: ${screenHeight * 0.03}px;
  background-color: #fff;
`;
