import { createContext } from 'react';
import type { User } from '../../../modules/user/types/user.type';

export const UserContext = createContext({} as UserContextData);

type UserContextData = {
  user: User | null;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  recoveryPassword: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  saveuserToState: (user: User | null) => void;
  saveUserToStorage: (user: Partial<User>) => Promise<void>;
};

export type SignInCredentials = {
  email: string;
  password: string;
};

export type SignUpCredentials = {
  firstName: string;
  username: string;
  email: string;
  password: string;
};
