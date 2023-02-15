import { createNativeStackNavigator } from '@react-navigation/native-stack';

//public
import { AuthScreen } from '../../screens/public/auth/auth.screen';

//private
import { HomeScreen } from '../../screens/private/home/home.screen';

import type { RoutesList } from '../types/routes-list.type';

const Stack = createNativeStackNavigator<RoutesList>();

export const AppRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth" component={AuthScreen} />
      <Stack.Screen name="home" component={HomeScreen} />
    </Stack.Navigator>
  );
};
