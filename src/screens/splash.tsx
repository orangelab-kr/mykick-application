import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import CodePush, {DownloadProgress} from 'react-native-code-push';
import {Bar} from 'react-native-progress';
import {WithLocalSvg} from 'react-native-svg';
import styled from 'styled-components/native';
import Logo from '../assets/logo.svg';
import {navigationRef} from '../tools/navigation';
import {screenHeight, screenWidth} from '../tools/screenSize';

type StatusType =
  | 'starting'
  | 'checking'
  | 'downloading'
  | 'installing'
  | 'restarting';

export const StatusMessage: {
  [K in StatusType]: string;
} = {
  starting: '앱을 시작하고 있습니다.',
  checking: '업데이트를 확인하고 있습니다.',
  downloading: '업데이트를 다운로드 받고 있습니다.',
  installing: '업데이트를 진행하고 있습니다.',
  restarting: '업데이트가 완료되어 앱을 재시작합니다.',
};

export const Splash: React.FC = () => {
  const [status, setStatus] = useState<StatusType>('starting');
  const [progress, setProgress] = useState<number>();
  const navigation = useNavigation();

  const onVersionCheck = async () => {
    const options = {
      installMode: CodePush.InstallMode.ON_NEXT_RESTART,
      mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
      rollbackRetryOptions: {
        delayInHours: 24,
        maxRetryAttempts: 1,
      },
    };

    const syncStatusChangedCallback = (status: CodePush.SyncStatus) => {
      switch (status) {
        case CodePush.SyncStatus.UNKNOWN_ERROR:
        case CodePush.SyncStatus.UP_TO_DATE:
          onReady();
          break;
        case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
          setStatus('checking');
          break;
        case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
          setStatus('downloading');
          break;
        case CodePush.SyncStatus.INSTALLING_UPDATE:
          setStatus('installing');
          break;
      }
    };

    const downloadProgressCallback = ({
      receivedBytes,
      totalBytes,
    }: DownloadProgress) => setProgress(receivedBytes / totalBytes);

    await CodePush.sync(
      options,
      syncStatusChangedCallback,
      downloadProgressCallback,
      err => console.log(err),
    );
  };

  const onReady = async () => {
    // const [permissions, tryRequestNotification] = await Promise.all([
    //   checkMultiple(requiredPermissions),
    //   checkNotifications().then(r => r.status === 'denied'),
    // ]);

    // const isAllow = (p: string) => !['granted', 'unavailable'].includes(p);
    // if (Object.values(permissions).find(isAllow) || tryRequestNotification) {
    //   return navigationRef.current?.navigate('Permission');
    // }

    // if (user === null) return navigationRef.current?.navigate('Start');
    navigationRef.current?.navigate('Start');
  };

  useEffect(() => {
    onVersionCheck();
    return navigation.addListener('focus', onVersionCheck);
  }, []);

  return (
    <View style={{flex: 1}}>
      <Container>
        <WithLocalSvg width="40%" height={40} asset={Logo} />
        <Description>나만의 튼튼한 하이킥 킥보드 </Description>
      </Container>
      <ProgressContainer>
        {progress !== undefined && (
          <Bar progress={progress} height={4} width={180} color="#999" />
        )}
        <ProgressMessage>{StatusMessage[status]}</ProgressMessage>
      </ProgressContainer>
    </View>
  );
};

const Container = styled(View)`
  margin: ${screenHeight * 0.4}px ${screenWidth * 0.1}px;
  justify-content: center;
  align-items: flex-end;
`;

const Description = styled(Text)`
  font-size: ${screenWidth / 21}px;
  font-weight: 700;
`;

const ProgressContainer = styled(View)`
  bottom: 20px;
  position: absolute;
  align-items: center;
  width: 100%;
  color: #999;
`;

const ProgressMessage = styled(Text)`
  margin-top: 6px;
  text-align: center;
  color: #999;
`;
