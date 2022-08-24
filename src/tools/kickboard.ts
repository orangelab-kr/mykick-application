import {Buffer} from '@craftzdog/react-native-buffer';
import {ModeOfOperation} from 'aes-js';
import _ from 'lodash';
import {useEffect, useState} from 'react';
import {BleManager, Characteristic, Device} from 'react-native-ble-plx';

export const manager = new BleManager();
export type KickboardStatus =
  | 'scanning'
  | 'connecting'
  | 'connected'
  | 'disconnected';

export interface KickboardCredentials {
  secretKey: string;
  macAddress: string;
  serviceId: string;
  characteristics: {
    writeId: string;
    readId: string;
  };
}

export const useKickboard = () => {
  const [power, setPower] = useState(false);
  const [light, setLight] = useState(false);
  const [batterySOC, setBatterySOC] = useState(100);
  const [batteryLock, setBatteryLock] = useState(false);
  const [maxSpeed, setRawMaxSpeed] = useState(0);
  const [writer, setWriter] = useState<Characteristic>();
  const [reader, setReader] = useState<Characteristic>();
  const [device, setDevice] = useState<Device>();
  const [token, setToken] = useState(_.times(4, () => 0x00));
  const [status, setStatus] = useState<KickboardStatus>('disconnected');
  const [credentials, setCredentials] = useState<KickboardCredentials>();
  const [cipher, setCipher] = useState<ModeOfOperation.ModeOfOperationECB>();

  const setAuthkey = (credentials: KickboardCredentials) => {
    setCredentials(credentials);

    const secretKey = Buffer.from(credentials.secretKey).toJSON().data;
    setCipher(new ModeOfOperation.ecb(secretKey));
  };

  const connect = async () => {
    if (!credentials || status === 'connected') return;
    setStatus('scanning');
    manager.startDeviceScan(
      [credentials.serviceId],
      {allowDuplicates: false},
      (err, device) => {
        if (err) throw err;
        if (!device || !device.manufacturerData) return;

        console.log(device.manufacturerData);
        const macAddress = Buffer.from(device.manufacturerData, 'base64')
          .reverse()
          .toString('hex')
          .toUpperCase();

        console.log(macAddress, credentials.macAddress);
        if (macAddress !== credentials.macAddress) return;
        setDevice(device);
      },
    );
  };

  const encrypt = (payload: number[]): string =>
    Buffer.from(cipher!.encrypt(payload)).toString('base64');

  const decrypt = (payload: string): number[] =>
    Buffer.from(cipher!.decrypt(Buffer.from(payload, 'base64'))).toJSON().data;

  const write = async (payload: number[]): Promise<void> => {
    if (!writer) return;
    let margin = 12 - payload.length;
    payload.push(..._.times(margin, () => _.random(0, 255)));
    payload.push(...token);

    console.log(payload);
    await writer.writeWithResponse(encrypt(payload));
  };

  const request = ({
    requestPayload,
    responsePrefix,
    responseSize = 16,
  }: {
    requestPayload: number[];
    responsePrefix: number[];
    responseSize: number;
  }): Promise<number[]> =>
    new Promise((resolve, reject) => {
      if (!reader) throw Error('아직 연결되지 않았습니다.');
      const validate = (payload?: string | null) => {
        if (!payload) return;
        const decryptedPayload = decrypt(payload);
        console.log(decryptedPayload);
        for (let i = 0; i < responsePrefix.length; i++) {
          if (decryptedPayload[i] !== responsePrefix[i]) return;
        }

        const start = responsePrefix.length;
        const end = start + responseSize;
        return decryptedPayload.slice(start, end);
      };

      const monitor = reader.monitor((err, msg) => {
        const payload = validate(msg?.value);
        if (!payload) return;

        monitor.remove();
        resolve(payload);
      });

      setTimeout(() => {
        monitor.remove();
        reject(new Error(`시간이 초과되었습니다.`));
      }, 3000);

      write(requestPayload);
    });

  const handshakeToken = async () => {
    const token = await request({
      requestPayload: [0x16, 0x5a, 0x01, 0x00, 0x00],
      responsePrefix: [0x16, 0x5a, 0x01, 0x04],
      responseSize: 4,
    });

    setToken(token);
    console.log('This connection session token is ' + token);
    setStatus('connected');
  };

  const isPowerOn = () => powerRW([0x00]);
  const setPowerOn = (power: boolean) => powerRW([0x01, power ? 0x01 : 0x00]);
  const switchPowerOn = () => setPowerOn(!power);
  const powerRW = async (payload: number[]) => {
    const power = await request({
      requestPayload: [0x61, 0x62, 0x31, ...payload],
      responsePrefix: [0x61, 0x62, 0x31],
      responseSize: 2,
    }).then(([, power]) => power === 0x01);

    setPower(power);
    return power;
  };

  const isLightOn = () => powerRW([0x00]);
  const setLightOn = (light: boolean) => lightRW([0x01, light ? 0x01 : 0x00]);
  const switchLightOn = () => setLightOn(!light);
  const lightRW = async (payload: number[]) => {
    const light = await request({
      requestPayload: [0x61, 0x62, 0x32, ...payload],
      responsePrefix: [0x61, 0x62, 0x32],
      responseSize: 2,
    }).then(([, light]) => light === 0x01);

    setLight(light);
    return light;
  };

  const isBatteryLocked = () => powerRW([0x00]);
  const setBatteryLocked = (light: boolean) =>
    batteryLockRW([0x01, light ? 0x01 : 0x00]);
  const switchBatteryLock = () => setBatteryLock(!light);
  const batteryLockRW = async (payload: number[]) => {
    const batteryLock = await request({
      requestPayload: [0x61, 0x62, 0x37, ...payload],
      responsePrefix: [0x61, 0x62, 0x37],
      responseSize: 2,
    }).then(([, batteryLock]) => batteryLock === 0x01);

    setBatteryLock(batteryLock);
    return batteryLock;
  };

  const getMaxSpeed = async () => {
    const maxSpeed = await settingsRW([0x00]).then(r => r[3]);
    setRawMaxSpeed(maxSpeed);
    return maxSpeed;
  };

  const setMaxSpeed = async (speed: number) => {
    const settings = await settingsRW([0x00]);
    settings[3] = speed;
    await settingsRW([0x05, ...settings]);
    setRawMaxSpeed(speed);
  };

  const settingsRW = async (payload: number[]) =>
    request({
      requestPayload: [0x61, 0x62, 0x35, ...payload],
      responsePrefix: [0x61, 0x62, 0x35, 0x05],
      responseSize: 5,
    });

  const getBatteryStatus = async () => {
    console.log(reader, writer);
    const batterySOC = await request({
      requestPayload: [0x61, 0x62, 0x28, 0x00],
      responsePrefix: [0x61, 0x62, 0x28, 0x0c],
      responseSize: 12,
    }).then(r => r[3]);

    setBatterySOC(batterySOC);
    console.log(batterySOC);
  };

  const pair = async () => {
    if (!credentials || !device || status !== 'scanning') return;
    const {
      serviceId,
      characteristics: {writeId, readId},
    } = credentials;

    setStatus('connecting');
    await device.connect();
    console.log('Successfully connected to device.');

    await device.discoverAllServicesAndCharacteristics();
    console.log('Successfully discover all services and characteristics.');

    const services = await device.services();
    const service = services.find(s => s.uuid === serviceId);
    if (!service) return;

    const characteistics = await service.characteristics();
    const writer = characteistics.find(c => c.uuid === writeId);
    const reader = characteistics.find(c => c.uuid === readId);

    if (!writer || !reader) return;
    console.log('Successfully get writer and reader.');

    setWriter(writer);
    setReader(reader);
  };

  const onInit = async () => {
    await getBatteryStatus();
    await isPowerOn();
    await isLightOn();
    await isBatteryLocked();
    await getMaxSpeed();
  };

  useEffect(() => {
    pair();
  }, [status, device]);

  useEffect(() => {
    if (!device || status === 'connected') return;
    if (!reader || !writer) return;
    handshakeToken();
  }, [status, device, reader, writer]);

  useEffect(() => {
    if (!device || status !== 'connected') return;
    if (!reader || !writer) return;
    onInit();
  }, [status, device, reader, writer]);

  useEffect(
    () => device?.onDisconnected(() => setStatus('disconnected')).remove,
    [device],
  );

  return {
    credentials,
    setAuthkey,
    setMaxSpeed,
    status,
    power,
    light,
    batteryLock,
    batterySOC,
    maxSpeed,
    setPowerOn,
    switchPowerOn,
    setLightOn,
    switchLightOn,
    setBatteryLocked,
    switchBatteryLock,
    connect,
  };
};
