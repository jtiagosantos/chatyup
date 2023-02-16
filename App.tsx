import 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
} from '@expo-google-fonts/poppins';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';

import { UserProvider } from './src/common/contexts/user/user.provider';
import { SplashProvider } from './src/common/contexts/splash/splash.provider';

import { AppRoutes } from './src/common/routes/app.routes';

const App = () => {
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <SplashProvider>
        <UserProvider>
          <NativeBaseProvider>
            <StatusBar backgroundColor="#18181B" translucent={false} style="light" />
            <AppRoutes />
          </NativeBaseProvider>
        </UserProvider>
      </SplashProvider>
    </NavigationContainer>
  );
};

export default App;
