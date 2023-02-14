import { createNativeStackNavigator } from '@react-navigation/native-stack';

//public
import { AuthScreen } from '../../screens/public/auth/auth.screen';

import type { StackRoutesList } from '../types/stack-routes-list.type';

const Stack = createNativeStackNavigator<StackRoutesList>();

export const AppRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth" component={AuthScreen} />
    </Stack.Navigator>
  );
};
