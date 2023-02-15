import { RoutesList } from './routes-list.type';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RoutesList {}
  }
}
