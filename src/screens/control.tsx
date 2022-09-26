import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';
import React, {createRef, useEffect, useState} from 'react';
import {View} from 'react-native';
import NaverMapView, {
  LayerGroup,
  MapType,
  Marker,
  TrackingMode,
} from 'react-native-nmap';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components';
import {CoreController} from '../components/CoreController/CoreController';
import {PowerButton} from '../components/PowerButton/PowerButton';
import {SpeedController} from '../components/SpeedController/SpeedController';
import {ConnectStatusBadge} from '../components/StatusBadge/ConnectStatusBadge';
import {StatusBadge} from '../components/StatusBadge/StatusBadge';
import {StatusBadgeGroup} from '../components/StatusBadge/StatusBadgeGroup';
import {StickyController} from '../components/StickyController/StickyController';
import {SwitchController} from '../components/SwitchController/SwitchController';
import {TopBar} from '../components/TopBar/TopBar';
import {KickboardStatus, useKickboard} from '../tools/kickboard';
import {navigationRef} from '../tools/navigation';
import {useGeolocation} from '../tools/useGeolocation';

const marker = require('../assets/pin-ride.png');

export const Control: React.FC = () => {
  const kickboard = useKickboard();
  const [coords] = useGeolocation();
  const mapRef = createRef<NaverMapView>();
  const [location, setLocation] = useState();
  const [camera, setCamera] = useState({latitude: 0, longitude: 0});
  const {getItem, setItem} = useAsyncStorage('location');
  const [previousStatus, setPreviousStatus] = useState<KickboardStatus>();

  useEffect(() => {
    getItem().then(r => r && setLocation(JSON.parse(r)));
    AsyncStorage.getItem('realmykick-authkey').then(authkey => {
      if (!authkey) return navigationRef.current?.navigate('Register');
      kickboard.setAuthkey(JSON.parse(authkey));
    });
  }, []);

  useEffect(() => {
    kickboard.connect();
  }, [kickboard.credentials]);

  useEffect(() => {
    if (!coords) return;
    mapRef.current?.animateToCoordinate(coords);
    setCamera(coords);

    if (kickboard.status === 'connected') {
      setItem(JSON.stringify(coords));
    }
  }, [coords]);

  useEffect(() => {
    if (previousStatus === kickboard.status) return;
    setPreviousStatus(kickboard.status);

    if (kickboard.status === 'connected') {
      mapRef.current?.animateToCoordinate(coords as any);
    } else if (location) {
      mapRef.current?.animateToCoordinate(location);
    }
  }, [kickboard.status]);

  useEffect(() => {
    mapRef.current?.setLocationTrackingMode(TrackingMode.Follow);
    mapRef.current?.setLayerGroupEnabled(LayerGroup.LAYER_GROUP_BUILDING, true);
    mapRef.current?.setLayerGroupEnabled(LayerGroup.LAYER_GROUP_BICYCLE, true);
  }, []);

  if (!coords) return <></>;
  return (
    <SafeAreaView>
      <TopBar />
      <Container>
        <StatusBadgeGroup>
          <ConnectStatusBadge status={kickboard.status} />
          {/* <StatusBadge color="#3578F6" icon="umbrella" label="26º" /> */}
          {kickboard.status === 'connected' && (
            <StatusBadge
              color="#3578F6"
              icon="bolt"
              label={`${kickboard.batterySOC}%`}
            />
          )}
        </StatusBadgeGroup>
        <NaverMapView
          ref={mapRef}
          style={{height: '100%', width: '100%'}}
          compass={false}
          scaleBar={false}
          zoomControl={false}
          mapType={MapType.Basic}
          onCameraChange={setCamera}
          center={camera as any}
          showsMyLocationButton
          useTextureView>
          {kickboard.status === 'connected' ? (
            <Marker width={35} height={50} image={marker} coordinate={coords} />
          ) : location ? (
            <Marker
              width={35}
              height={50}
              image={marker}
              coordinate={location}
            />
          ) : (
            <></>
          )}
        </NaverMapView>
        <StickyController>
          {/* <BasicInfo>
            <BasicInfoUnit
              icon="pin-drop"
              label="서울특별시 강남구 대치동"
            />
            <BasicInfoUnit icon="bolt" label={`${kickboard.batterySOC}%`} />
          </BasicInfo> */}
          <CoreController>
            <SwitchController
              label="라이트"
              disabled={kickboard.loading || kickboard.power === false}
              value={kickboard.light}
              onChange={() => {
                kickboard.switchLight();
              }}
            />
            <PowerButton
              color={kickboard.power ? '#3578F6' : '#153B54'}
              disabled={kickboard.loading}
              onPress={() => {
                setItem(JSON.stringify(coords));
                kickboard.switchPower();
              }}
            />
            <SwitchController
              label="배터리 잠금"
              disabled={kickboard.loading}
              value={kickboard.batteryLock}
              onChange={() => {
                kickboard.switchBatteryLock();
              }}
            />
          </CoreController>
          <SpeedController
            maxSpeed={kickboard.maxSpeed}
            setMaxSpeed={kickboard.setMaxSpeed}
            disabled={kickboard.loading}
          />
        </StickyController>
      </Container>
    </SafeAreaView>
  );
};

const Container = styled(View)`
  position: relative;
`;
