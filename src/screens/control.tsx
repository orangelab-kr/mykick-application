import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import NaverMapView, {MapType} from 'react-native-nmap';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';
import {BasicInfo} from '../components/BasicInfo/BasicInfo';
import {BasicInfoUnit} from '../components/BasicInfo/BasicInfoUnit';
import {CoreController} from '../components/CoreController/CoreController';
import {PowerButton} from '../components/PowerButton/PowerButton';
import {SpeedController} from '../components/SpeedController/SpeedController';
import {ConnectStatusBadge} from '../components/StatusBadge/ConnectStatusBadge';
import {StatusBadge} from '../components/StatusBadge/StatusBadge';
import {StatusBadgeGroup} from '../components/StatusBadge/StatusBadgeGroup';
import {StickyController} from '../components/StickyController/StickyController';
import {SwitchController} from '../components/SwitchController/SwitchController';
import {TopBar} from '../components/TopBar/TopBar';
import {useKickboard} from '../tools/kickboard';
import {navigationRef} from '../tools/navigation';

export const Control: React.FC = () => {
  const kickboard = useKickboard();

  useEffect(() => {
    AsyncStorage.getItem('realmykick-authkey').then(authkey => {
      if (!authkey) return navigationRef.current?.navigate('Register');
      kickboard.setAuthkey(JSON.parse(authkey));
    });
  }, []);

  useEffect(() => {
    kickboard.connect();
  }, [kickboard.credentials]);

  console.log(kickboard.power);

  return (
    <SafeAreaView>
      <TopBar />
      <Container>
        <StatusBadgeGroup>
          <ConnectStatusBadge status={kickboard.status} />
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
            <SwitchController
              label="라이트"
              disabled={kickboard.status !== 'connected'}
              value={kickboard.light}
              onChange={() => {
                kickboard.switchLightOn();
              }}
            />
            <PowerButton
              onPress={kickboard.switchPowerOn}
              color={kickboard.power ? '#3578F6' : '#153B54'}
              disabled={kickboard.status !== 'connected'}
            />
            <SwitchController
              label="배터리 잠금"
              disabled={kickboard.status !== 'connected'}
              value={kickboard.batteryLock}
              onChange={() => {
                kickboard.switchBatteryLock();
              }}
            />
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
