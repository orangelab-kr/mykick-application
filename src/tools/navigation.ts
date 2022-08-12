import {NavigationContainerRef} from '@react-navigation/native';
import * as React from 'react';
import {RootNavigatorRouteParams} from '../models/navigation';

export interface RootParamList extends RootNavigatorRouteParams {}

export const navigationRef =
  React.createRef<NavigationContainerRef<RootParamList>>();
