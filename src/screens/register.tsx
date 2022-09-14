import {Buffer} from '@craftzdog/react-native-buffer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, TextInput, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import {CommonText} from '../components/Common/CommonText';
import {Depth} from '../components/Common/Depth';
import {navigationRef} from '../tools/navigation';
import {openInAppBrowser} from '../tools/openInAppBrowser';
import {screenHeight, screenWidth} from '../tools/screenSize';

export const Register: React.FC = () => {
  const [valid, setValid] = useState(false);
  const [authkey, setAuthkey] = useState('');
  const openWhatIsAuthToken = () =>
    openInAppBrowser('https://i.hikick.kr/mykick/authkey');

  const onCheck = async () => {
    try {
      const rawJson = Buffer.from(authkey, 'base64').toString();
      const json = JSON.parse(rawJson);

      if (
        !json.secretKey ||
        !json.macAddress ||
        !json.serviceId ||
        !json.characteristics ||
        !json.characteristics.writeId ||
        !json.characteristics.readId
      ) {
        throw Error('올바른 인증키가 아닙니다.');
      }

      await AsyncStorage.setItem('realmykick-authkey', rawJson);
      navigationRef.current?.navigate('Control');
    } catch (err) {
      setValid(false);
      setTimeout(() => setValid(true), 3000);
    }
  };

  useEffect(() => {
    setValid(true);
  }, [authkey]);

  return (
    <SafeAreaView>
      <Depth />
      <Container>
        <Title>마이킥 등록하기 🔑</Title>
        <Description>받으신 인증키을 입력하여 주세요.</Description>
        <TextArea
          autoFocus
          multiline={true}
          numberOfLines={3}
          onChangeText={setAuthkey}
          placeholder="인증키을 붙여넣기해주세요."
        />
        <ButtonContainer transparent onPress={openWhatIsAuthToken}>
          <ButtonText transparent>인증키가 무엇인가요?</ButtonText>
        </ButtonContainer>
        <ButtonContainer
          onPress={onCheck}
          color={valid ? '#3578f6' : '#ff1248'}
          disabled={!valid}>
          <ButtonText>
            {valid ? '이용하기' : '올바른 인증키가 아닙니다.'}
          </ButtonText>
        </ButtonContainer>
      </Container>
    </SafeAreaView>
  );
};

const Container = styled(View)`
  margin: 0 ${screenWidth * 0.08}px;
`;

const Title = styled(CommonText)`
  margin: ${screenHeight * 0.005}px 0;
  font-size: ${screenWidth / 13}px;
  font-weight: 700;
`;

const Description = styled(CommonText)`
  font-size: ${screenWidth / 18}px;
  font-weight: 400;
`;

const TextArea = styled(TextInput)`
  margin: ${screenHeight * 0.01}px 0;
  height: ${screenHeight * 0.28}px;
  font-size: ${screenWidth / 23}px;
  border-width: 2px;
  border-color: #3578f6;
  border-radius: 8px;
  font-weight: 600;
  padding: 10px;
`;

const ButtonContainer = styled(TouchableOpacity)<{
  color?: string;
  transparent?: boolean;
}>`
  width: 100%;
  align-items: center;
  margin: ${screenHeight * 0.004}px 0;
  padding: ${screenHeight * 0.015}px 0;
  background-color: ${({transparent, color}) =>
    transparent ? '#fff' : color || '#3578f6'};
  border-color: ${({color}) => color || '#3578f6'};
  border-width: 2px;
  border-radius: 8px;
`;

const ButtonText = styled(CommonText)<{transparent?: boolean}>`
  font-weight: 800;
  font-size: ${screenWidth / 20}px;
  color: ${({transparent}) => (transparent ? '#3578f6' : '#fff')};
`;
