import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {FindButton} from '../FindButton/FindButton';

export interface BasicInfoProps {
  children: React.ReactNode;
}

export const BasicInfo: React.FC<BasicInfoProps> = ({children}) => {
  return (
    <BasicInfoContainer>
      <View>{children}</View>
      <FindButton />
    </BasicInfoContainer>
  );
};

const BasicInfoContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;
