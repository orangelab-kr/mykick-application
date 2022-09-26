import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import {CommonText} from './Common/CommonText';

export interface IconWithMessageProps {
  icon: string;
  children: React.ReactNode;
}

export const IconWithTextBox: React.FC<IconWithMessageProps> = ({
  icon,
  children,
}) => (
  <Container>
    <IconContainer>
      <Icon name={icon} size={32} />
    </IconContainer>
    <TextContainer>{children}</TextContainer>
  </Container>
);

const Container = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  border-color: #eee;
  border-width: 1px;
  border-radius: 2px;
  margin-top: 10px;
`;

const IconContainer = styled(View)`
  width: 20%;
  justify-content: center;
  align-items: center;
`;

const TextContainer = styled(CommonText)`
  color: #0a0c0c;
  padding: 10px;
  font-size: 18px;
  width: 80%;
  font-weight: 400;
`;
