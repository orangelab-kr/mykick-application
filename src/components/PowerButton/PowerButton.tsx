import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import {screenWidth} from '../../tools/screenSize';

export interface PowerButtonProps extends TouchableOpacityProps {
  color: string;
}

export const PowerButton: React.FC<PowerButtonProps> = ({color, ...props}) => {
  return (
    <PowerButtonContainer {...props}>
      <Icon name="power-settings-new" size={screenWidth / 9} color={color} />
    </PowerButtonContainer>
  );
};

const PowerButtonContainer = styled(TouchableOpacity)`
  padding: ${screenWidth * 0.05}px;
  border-radius: ${screenWidth}px;
  background-color: #fff;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-offset: {width: 5px, height: 5px};
  shadow-radius: 13px;
  elevation: 21;
`;
