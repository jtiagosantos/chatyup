import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { ECollections } from '../../../infra/firebase/enums/collections.enum';
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

    const user = response!.docs?.[0]?.data() as User;

    return user;
  }
}
