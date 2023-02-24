import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RoutesList } from './routes-list.type';

export type ScreenProps<RouteName extends keyof RoutesList> = NativeStackScreenProps<
  RoutesList,
  RouteName
>;
