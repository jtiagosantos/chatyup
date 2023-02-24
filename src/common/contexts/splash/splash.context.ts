import { createContext } from 'react';

export const SplashContext = createContext({} as SplashContextData);

type SplashContextData = {
  isAppReady: boolean;
  setAppToReady: () => void;
};
