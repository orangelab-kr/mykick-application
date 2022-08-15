import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {WithLocalSvg} from 'react-native-svg';
import styled from 'styled-components/native';
import Logo from '../assets/logo.svg';
import {CommonText} from '../components/Common/CommonText';
import {navigationRef} from '../tools/navigation';
import {screenHeight, screenWidth} from '../tools/screenSize';

export const Start: React.FC = () => {
  const gotoRealmykick = () => navigationRef.current?.navigate('Control');
  const gotoRent = (path: string) => () =>
    navigationRef.current?.navigate('Rent', {path});

  return (
    <Container>
      <SafeAreaView />
      <WithLocalSvg width="40%" height={40} asset={Logo} />
      <Description>나만의 튼튼한 하이킥 킥보드</Description>
      <Hashtag>#튼튼한 #킥보드 #마이킥</Hashtag>
      <AnimationView
        loop
        autoPlay
        resizeMode="contain"
        source={require('../assets/lotties/64970-electric-scooter-baloon.json')}
      />
      <BottomContainer>
        <ButtonContainer onPress={gotoRealmykick}>
          <ButtonText>리얼 마이킥 등록하기</ButtonText>
        </ButtonContainer>
        <ButtonContainer transparent onPress={gotoRent('started/pricing')}>
          <ButtonText transparent>장 · 단기 렌탈 신청하기</ButtonText>
        </ButtonContainer>
        <TransparentContainer onPress={gotoRent('auth')}>
          <TransparentText>
            이미 <Text style={{fontWeight: '900'}}>마이킥</Text>을 가지고
            계신가요?
          </TransparentText>
        </TransparentContainer>
      </BottomContainer>
    </Container>
  );
};

const Container = styled(View)`
  position: relative;
  padding: ${screenHeight * 0.04}px ${screenWidth * 0.08}px;
  height: 100%;
  width: 100%;
`;

const Description = styled(CommonText)`
  margin: ${screenHeight * 0.002}px 0;
  font-size: ${screenWidth / 16}px;
  word-break: keep-all;
  font-weight: 600;
`;

const Hashtag = styled(CommonText)`
  font-weight: 500;
  font-size: ${screenWidth / 20}px;
  color: gray;
`;

const AnimationView = styled(AnimatedLottieView)`
  margin-top: ${screenHeight * 0.05}px;
  width: 100%;
`;

const BottomContainer = styled(View)`
  margin: 0 ${screenWidth * 0.08}px;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
`;

const ButtonContainer = styled(TouchableOpacity)<{transparent?: boolean}>`
  width: 100%;
  align-items: center;
  margin: ${screenHeight * 0.004}px 0;
  padding: ${screenHeight * 0.015}px 0;
  background-color: ${({transparent}) => (transparent ? '#fff' : '#3578f6')};
  border-color: #3578f6;
  border-width: 2px;
  border-radius: 8px;
`;

const ButtonText = styled(CommonText)<{transparent?: boolean}>`
  font-weight: 800;
  font-size: ${screenWidth / 20}px;
  color: ${({transparent}) => (transparent ? '#3578f6' : '#fff')};
`;

const TransparentContainer = styled(TouchableOpacity)`
  align-items: center;
  padding-top: ${screenHeight * 0.013}px;
  padding-bottom: ${screenHeight * 0.025}px;
`;

const TransparentText = styled(CommonText)`
  font-size: ${screenWidth / 22}px;
`;
