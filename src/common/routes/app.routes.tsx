import { createNativeStackNavigator } from '@react-navigation/native-stack';

//public
import { AuthScreen } from '../../screens/public/auth/auth.screen';
import { SplashScreen } from '../../screens/public/splash/splash.screen';

//private
import { HomeScreen } from '../../screens/private/home/home.screen';

import { useUser } from '../hooks/use-user.hook';
import { useSplash } from '../hooks/use-splash.hook';

import type { RoutesList } from '../types/routes-list.type';

const Stack = createNativeStackNavigator<RoutesList>();

export const AppRoutes = () => {
  const { user } = useUser();
  const { isAppReady } = useSplash();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAppReady && <Stack.Screen name="splash" component={SplashScreen} />}

      {isAppReady &&
        (!user ? (
          <Stack.Screen name="auth" component={AuthScreen} />
        ) : (
          <Stack.Screen name="home" component={HomeScreen} />
        ))}
    </Stack.Navigator>
  );
};
