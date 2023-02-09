import { useWindowDimensions } from 'react-native';
import Constants from 'expo-constants';

export const useDimensions = () => {
  const { width, height } = useWindowDimensions();
  const { statusBarHeight } = Constants;

  const safeheight = height - statusBarHeight;

  return { width, height: safeheight };
};
