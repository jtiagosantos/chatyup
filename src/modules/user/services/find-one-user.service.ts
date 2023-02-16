import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { UserMapper } from '../../../infra/firebase/mappers/user.mapper';
import { ECollections } from '../../../infra/firebase/enums/collections.enum';
import type { UserFromFirestore } from '../../../infra/firebase/mappers/user.mapper';
import type { User } from '../types/user.type';

type FindOneUserInput = {
  email?: string;
  username?: string;
};

export class FindOneUserService {
  public static async execute({ email, username }: FindOneUserInput) {
    let response: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>;

    if (email) {
      response = await firestore()
        .collection(ECollections.USERS)
        .where('email', '==', email)
        .get();
    } else if (username) {
      response = await firestore()
        .collection(ECollections.USERS)
        .where('username', '==', username)
        .get();
    }

    const userExists = !response!.empty;

    if (!userExists) return null;

    const userFromFirestore = response!.docs?.[0]?.data() as UserFromFirestore;
    const userId = response!.docs?.[0].id;

    const formattedUser = UserMapper.toDomain(userFromFirestore);
    const user = {
      ...formattedUser,
      id: userId,
    } as User;

    return user;
  }
}
