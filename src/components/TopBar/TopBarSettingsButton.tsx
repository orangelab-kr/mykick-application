import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {screenWidth} from '../../tools/screenSize';

export const TopBarSettingsButton: React.FC = () => {
  return (
    <TouchableOpacity>
      <Icon
        name="settings"
        size={screenWidth / 16}
        style={{marginLeft: 3}}
        color="#003c56"
      />
    </TouchableOpacity>
  );
};
