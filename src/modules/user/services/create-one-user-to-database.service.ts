import firestore from '@react-native-firebase/firestore';
import { UserMapper } from '../../../infra/firebase/mappers/user.mapper';
import { ECollections } from '../../../infra/firebase/enums/collections.enum';
import type { User } from '../types/user.type';

type CreateOneUserToDatabaseInput = Pick<User, 'firstName' | 'username' | 'email'>;

export class CreateOneUserToDatabaseService {
  public static async execute(input: CreateOneUserToDatabaseInput) {
    const formattedUser = UserMapper.toFirestore(input);

    await firestore().collection(ECollections.USERS).add(formattedUser);
  }
}
