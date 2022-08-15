import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {screenHeight} from '../../tools/screenSize';

export interface CoreControllerProps {
  children: React.ReactNode;
}

export const CoreController: React.FC<CoreControllerProps> = ({children}) => {
  return <CoreControllerContainer>{children}</CoreControllerContainer>;
};

const CoreControllerContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-top: ${screenHeight * 0.02}px;
  justify-content: space-around;
`;
