import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import {screenWidth} from '../../tools/screenSize';

export const PowerButton: React.FC = () => {
  return (
    <PowerButtonContainer>
      <Icon name="power-settings-new" size={screenWidth / 9} color="#3578F6" />
    </PowerButtonContainer>
  );
};

const PowerButtonContainer = styled(TouchableOpacity)`
  padding: ${screenWidth * 0.05}px;
  border-radius: 150px;
  background-color: #fff;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-offset: {width: 5px, height: 5px};
  shadow-radius: 13px;
  elevation: 21;
`;
