import { useContext } from 'react';
import { SplashContext } from '../contexts/splash/splash.context';

export const useSplash = () => {
  const context = useContext(SplashContext);

  if (context === undefined) {
    throw new Error('useSplash must be used within a SplashProvider');
  }

  return context;
};
