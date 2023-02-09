import { StackRoutesList } from './stack-routes-list.type';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackRoutesList {}
  }
}
