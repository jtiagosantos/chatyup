import { useState, useCallback } from 'react';

import { SplashContext } from './splash.context';

import type { FC, PropsWithChildren } from 'react';

export const SplashProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [isAppReady, setIsAppReady] = useState(false);

  const setAppToReady = useCallback(() => {
    setIsAppReady(true);
  }, []);

  return (
    <SplashContext.Provider value={{ isAppReady, setAppToReady }}>
      {children}
    </SplashContext.Provider>
  );
};
