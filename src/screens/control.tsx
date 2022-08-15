import React from 'react';
import {Switch, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import NaverMapView, {MapType} from 'react-native-nmap';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';
import {BasicInfo} from '../components/BasicInfo/BasicInfo';
import {BasicInfoUnit} from '../components/BasicInfo/BasicInfoUnit';
import {CommonText} from '../components/Common/CommonText';
import {CoreController} from '../components/CoreController/CoreController';
import {PowerButton} from '../components/PowerButton/PowerButton';
import {SpeedController} from '../components/SpeedController/SpeedController';
import {StatusBadge} from '../components/StatusBadge/StatusBadge';
import {StatusBadgeGroup} from '../components/StatusBadge/StatusBadgeGroup';
import {StickyController} from '../components/StickyController/StickyController';
import {SwitchController} from '../components/SwitchController/SwitchController';
import {TopBar} from '../components/TopBar/TopBar';
import {screenHeight, screenWidth} from '../tools/screenSize';

export const Control: React.FC = () => {
  return (
    <SafeAreaView>
      <TopBar />
      <Container>
        <StatusBadgeGroup>
          <StatusBadge color="#58C948" icon="circle" label="연결됨" />
          <StatusBadge color="#3578F6" icon="umbrella" label="26º" />
        </StatusBadgeGroup>
        <NaverMapView
          style={{height: '100%', width: '100%'}}
          compass={false}
          scaleBar={false}
          zoomControl={false}
          mapType={MapType.Basic}
          useTextureView
        />
        <StickyController>
          <BasicInfo>
            <BasicInfoUnit
              icon="pin-drop"
              label="경기도 화성시 동탄대로 10길"
            />
            <BasicInfoUnit icon="bolt" label="96%" />
          </BasicInfo>
          <CoreController>
            <SwitchController label="라이트" />
            <PowerButton />
            <SwitchController label="배터리 잠금" />
          </CoreController>
          <SpeedController />
        </StickyController>
      </Container>
    </SafeAreaView>
  );
};

const Container = styled(View)`
  position: relative;
`;
