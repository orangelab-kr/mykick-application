import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import {navigationRef} from '../../tools/navigation';
import {screenHeight, screenWidth} from '../../tools/screenSize';

export interface DepthProps {
  onPress?: () => void;
  disabled?: boolean;
  color?: string;
}

export const Depth: React.FC<DepthProps> = ({
  onPress,
  disabled,
  color = '#0a0c0c',
}) => {
  const onAction = () => {
    if (disabled) return;
    if (onPress) return onPress();
    navigationRef.current?.goBack();
  };

  return (
    <Container onPress={onAction}>
      {!disabled && (
        <Icon name="arrow-back-ios" color={color} size={screenWidth / 20} />
      )}
    </Container>
  );
};

const Container = styled(TouchableOpacity)`
  height: ${screenHeight * 0.07}px;
  padding-left: ${screenHeight * 0.035};
  width: ${screenWidth}px;
  flex-direction: row;
  align-items: center;
`;
