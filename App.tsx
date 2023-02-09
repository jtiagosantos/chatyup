import 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './src/common/routes/app.routes';

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <StatusBar backgroundColor="#18181B" translucent={false} style="light" />
        <AppRoutes />
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
