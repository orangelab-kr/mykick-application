import Slider from '@react-native-community/slider';
import {MenuView} from '@react-native-menu/menu';
import React from 'react';
import {Switch, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import NaverMapView, {MapType} from 'react-native-nmap';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WithLocalSvg} from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';
import {CommonText} from '../components/CommonText';
import {screenHeight, screenWidth} from '../tools/screenSize';

export const Control: React.FC = () => {
  return (
    <SafeAreaView>
      <Top>
        <MenuView
          actions={[
            {
              id: 'realmykick',
              title: '리얼마이킥 모드',
              state: 'mixed',
            },
            {id: 'rent', title: '마이킥 모드'},
          ]}>
          <LogoButton>
            <WithLocalSvg width="48%" height={40} asset={Logo} />
            <Icon
              name="expand-more"
              size={screenWidth / 15}
              style={{marginLeft: 3}}
              color="#003c56"
            />
          </LogoButton>
        </MenuView>
        <TouchableOpacity>
          <Icon
            name="settings"
            size={screenWidth / 16}
            style={{marginLeft: 3}}
            color="#003c56"
          />
        </TouchableOpacity>
      </Top>
      <Container>
        <StatusGroupContainer pointerEvents="box-none">
          <StatusContainer>
            <Icon name="circle" size={screenWidth / 20} color="#58C948" />
            <StatusText style={{color: '#58C948'}}>연결됨</StatusText>
          </StatusContainer>
          <StatusContainer>
            <Icon name="umbrella" size={screenWidth / 20} color="#3578F6" />
            <StatusText style={{color: '#3578F6'}}>26º</StatusText>
          </StatusContainer>
        </StatusGroupContainer>
        <NaverMapView
          style={{height: '100%', width: '100%'}}
          compass={false}
          scaleBar={false}
          zoomControl={false}
          mapType={MapType.Basic}
          useTextureView
        />
        <StickyContainer pointerEvents="box-none">
          <ControllerContainer>
            <GeneralControlContainer>
              <InfoGroupContainer>
                <InfoContainer>
                  <Icon
                    name="pin-drop"
                    size={screenWidth / 17}
                    color="#1A1C1D"
                  />
                  <InfoText>경기도 화성시 동탄대로 10길</InfoText>
                </InfoContainer>
                <InfoContainer>
                  <Icon name="bolt" size={screenWidth / 17} color="#1A1C1D" />
                  <InfoText>96%</InfoText>
                </InfoContainer>
              </InfoGroupContainer>
              <FindButton>
                <Icon
                  name="volume-up"
                  size={screenWidth / 12}
                  color="#3578F6"
                />
                <FindButtonText>킥보드 찾기</FindButtonText>
              </FindButton>
            </GeneralControlContainer>
            <PrimaryControl>
              <SwitchContainer>
                <SwitchText>라이트</SwitchText>
                <ResizedSwitch />
              </SwitchContainer>
              <PowerButton>
                <Icon
                  name="power-settings-new"
                  size={screenWidth / 9}
                  color="#3578F6"
                />
              </PowerButton>
              <SwitchContainer>
                <SwitchText>배터리 잠금</SwitchText>
                <ResizedSwitch />
              </SwitchContainer>
            </PrimaryControl>
            <SpeedContainer>
              <SpeedText>속도</SpeedText>
              <SpeedCenterContainer>
                <SpeedCurrentText>25km/h</SpeedCurrentText>
                <Slider
                  style={{width: '100%', height: 45}}
                  minimumValue={5}
                  maximumValue={25}
                  step={5}
                />
              </SpeedCenterContainer>
            </SpeedContainer>
            <SpeedMinMaxContainer>
              <SpeedMinMaxText>5km/h</SpeedMinMaxText>
              <SpeedMinMaxText>25km/h</SpeedMinMaxText>
            </SpeedMinMaxContainer>
          </ControllerContainer>
        </StickyContainer>
      </Container>
    </SafeAreaView>
  );
};

const Container = styled(View)`
  position: relative;
`;

const PowerButton = styled(TouchableOpacity)`
  padding: ${screenWidth * 0.05}px;
  border-radius: 150px;
  background-color: #fff;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-offset: {width: 5px, height: 5px};
  shadow-radius: 13px;
  elevation: 21;
`;

const LogoButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`;

const SwitchContainer = styled(View)`
  justify-content: center;
  align-items: center;
`;

const SwitchText = styled(CommonText)`
  margin-bottom: ${screenHeight * 0.01}px;
  font-size: ${screenWidth * 0.038}px;
  font-weight: 500;
`;

const ResizedSwitch = styled(Switch)`
  transform: scale(0.9, 0.9);
`;

const PrimaryControl = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-top: ${screenHeight * 0.02}px;
  justify-content: space-around;
`;

const Top = styled(View)`
  height: ${screenHeight * 0.065}px;
  padding: 0 ${screenWidth * 0.06}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StickyContainer = styled(View)`
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
  bottom: 0;
`;

const ControllerContainer = styled(View)`
  width: 87%;
  border-radius: 16px;
  height: ${screenHeight * 0.4}px;
  margin-bottom: ${screenHeight * 0.13}px;
  padding: ${screenHeight * 0.03}px;
  background-color: #fff;
`;

const SpeedContainer = styled(View)`
  margin-top: ${screenHeight * 0.02}px;
`;

const SpeedText = styled(CommonText)`
  font-size: ${screenWidth / 20}px;
  font-weight: 600;
`;

const StatusGroupContainer = styled(View)`
  z-index: 1;
  width: 100%;
  position: absolute;
  padding: ${screenHeight * 0.025}px;
  flex-direction: row;
  justify-content: space-between;
`;

const StatusContainer = styled(View)`
  flex-direction: row;
  padding: ${screenHeight * 0.01}px ${screenWidth * 0.03}px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
`;

const StatusText = styled(CommonText)`
  margin-left: ${screenHeight * 0.005}px;
  font-size: ${screenWidth / 23}px;
`;

const SpeedCurrentText = styled(CommonText)`
  color: #3578f6;
  font-weight: 800;
  font-size: ${screenWidth / 15}px;
`;

const SpeedMinMaxContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

const SpeedMinMaxText = styled(CommonText)`
  font-size: ${screenWidth / 27}px;
  color: #333739;
  font-weight: 400;
`;

const SpeedCenterContainer = styled(View)`
  align-items: center;
`;

const GeneralControlContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

const FindButton = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
`;

const FindButtonText = styled(CommonText)`
  margin: ${screenHeight * 0.004}px;
  font-size: ${screenWidth / 25}px;
  font-weight: 700;
  color: #3578f6;
`;

const InfoGroupContainer = styled(View)``;

const InfoContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${screenHeight * 0.01}px;
`;

const InfoText = styled(CommonText)`
  font-size: ${screenWidth / 24}px;
  font-weight: 600;
`;
