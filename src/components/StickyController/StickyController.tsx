import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {screenHeight, screenWidth} from '../../tools/screenSize';

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
  justify-content: center;
  border-radius: ${screenWidth / 14}px;
  height: ${screenHeight * 0.33}px;
  margin-bottom: ${screenHeight * 0.18}px;
  padding: ${screenHeight * 0.03}px;
  background-color: #fff;
  shadow-color: #000;
  shadow-opacity: 0.3;
  shadow-offset: {width: 5px, height: 5px};
  shadow-radius: 13px;
  elevation: 21;
`;
