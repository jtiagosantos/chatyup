import 'react-native-reanimated';
import './src/common/lib/bcrypt';
import './src/common/lib/dayjs';

import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { theme } from './src/common/styles/theme';

import { UserProvider } from './src/common/contexts/user/user.provider';
import { SplashProvider } from './src/common/contexts/splash/splash.provider';

import { AppRoutes } from './src/common/routes/app.routes';

const App = () => {
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_800ExtraBold,
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <SplashProvider>
        <UserProvider>
          <NativeBaseProvider theme={theme}>
            <StatusBar backgroundColor="#18181B" translucent={false} style="light" />
            <AppRoutes />
          </NativeBaseProvider>
        </UserProvider>
      </SplashProvider>
    </NavigationContainer>
  );
};

export default App;
