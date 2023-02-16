import { useState, useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { SignInService } from '../../../modules/user/services/sign-in.service';
import { CreateOneUserToAuthService } from '../../../modules/user/services/create-one-user-to-auth.service';
import { CreateOneUserToDatabaseService } from '../../../modules/user/services/create-one-user-to-database.service';
import { RecoveryPasswordService } from '../../../modules/user/services/recovery-password.service';

import { UserContext } from './user.context';

import { useStorage } from '../../hooks/use-storage.hook';

import { EStorage } from '../../enums/storage.enum';

import type { FC, PropsWithChildren } from 'react';
import type { User } from '../../../modules/user/types/user.type';
import type { SignInCredentials, SignUpCredentials } from './user.context';

export const UserProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { getItem, setItem, removeItem } = useStorage(EStorage.USER_INFO);
  const { navigate } = useNavigation();

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    await SignInService.execute({ email, password });
  }, []);

  const signUp = useCallback(
    async ({ firstName, username, email, password }: SignUpCredentials) => {
      await CreateOneUserToAuthService.execute({ email, password });
      await CreateOneUserToDatabaseService.execute({
        firstName,
        username,
        email,
      });
    },
    [],
  );

  const recoveryPassword = useCallback(async (email: string) => {
    await RecoveryPasswordService.execute(email);
  }, []);

  const signOut = useCallback(async () => {
    await removeUserFromStorage();
    setUser(null);
  }, []);

  const removeUserFromStorage = useCallback(async () => {
    await removeItem();
  }, []);

  const saveuserToState = useCallback((user: User | null) => {
    setUser(user);
  }, []);

  const saveUserToStorage = useCallback(async (user: Partial<User>) => {
    const storedUser = await getUserFromStorage();
    const dataToStore = {
      ...storedUser,
      ...user,
    };

    await setItem(dataToStore);
  }, []);

  const getUserFromStorage = useCallback(async () => {
    const storedUser = await getItem();

    return storedUser || {};
  }, []);

  useEffect(() => {
    getUserFromStorage().then((data) => {
      const userExists = !!Object.keys(data).length;
      if (userExists) {
        setUser(data);
        navigate('home');
      }
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        signIn,
        signUp,
        recoveryPassword,
        signOut,
        saveuserToState,
        saveUserToStorage,
      }}>
      {children}
    </UserContext.Provider>
  );
};