import {ParamListBase} from '@react-navigation/native';

type SubNavigator<T extends ParamListBase> = {
  [K in keyof T]: {screen: K; params?: T[K]};
}[keyof T];

export type RootNavigatorRouteParams = {
  Splash: undefined;
  Start: undefined;
  Register: undefined;
  Rent: undefined | {path: string};
  Control: undefined;
};
