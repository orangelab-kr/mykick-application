import {RootNavigatorRouteParams} from '../src/models/navigation';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootNavigatorRouteParams {}
  }
}
