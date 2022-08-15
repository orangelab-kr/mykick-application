import React from 'react';
import {TouchableOpacity} from 'react-native';
import {WithLocalSvg} from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import Logo from '../../assets/logo.svg';
import {screenWidth} from '../../tools/screenSize';

export const TopBarLogo: React.FC = () => {
  return (
    <LogoButton>
      <WithLocalSvg width="48%" height={40} asset={Logo} />
      <Icon name="expand-more" size={screenWidth / 15} color="#003c56" />
    </LogoButton>
  );
};

const LogoButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`;
