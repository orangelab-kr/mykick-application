import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {screenWidth} from '../../tools/screenSize';

export interface TopBarSettingsButtonProps extends TouchableOpacityProps {}

export const TopBarSettingsButton: React.FC<TopBarSettingsButtonProps> = ({
  ...props
}) => {
  return (
    <TouchableOpacity {...props}>
      <Icon
        name="settings"
        size={screenWidth / 16}
        style={{marginLeft: 3}}
        color="#003c56"
      />
    </TouchableOpacity>
  );
};
