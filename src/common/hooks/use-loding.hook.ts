import { useState } from 'react';

export const useLoading = (initialValue = false) => {
  const [isLoading, setIsLoading] = useState(initialValue);

  const enableLoading = () => setIsLoading(true);

  const disableLoading = () => setIsLoading(false);

  return {
    isLoading,
    enableLoading,
    disableLoading,
  };
};
