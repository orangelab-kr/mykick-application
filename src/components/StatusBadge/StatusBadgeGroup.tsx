import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {screenHeight} from '../../tools/screenSize';

export interface StatusGroupProps {
  children: React.ReactNode;
}

export const StatusBadgeGroup: React.FC<StatusGroupProps> = ({children}) => {
  return (
    <StatusGroupContainer pointerEvents="box-none">
      {children}
    </StatusGroupContainer>
  );
};

const StatusGroupContainer = styled(View)`
  z-index: 1;
  width: 100%;
  position: absolute;
  padding: ${screenHeight * 0.025}px;
  flex-direction: row;
  justify-content: space-between;
`;
