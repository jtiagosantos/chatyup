import firestore from '@react-native-firebase/firestore';
import { ECollections } from '../../../infra/firebase/enums/collections.enum';
import type { User } from '../types/user.type';

export class UpdateOneUserToDatabaseService {
  public static async execute({
    id,
    firstName,
    username,
    email,
  }: Omit<User, 'password'>) {
    let dataToUpdate = {};
    if (firstName) {
      dataToUpdate = { ...dataToUpdate, first_name: firstName };
    }
    if (username) {
      dataToUpdate = { ...dataToUpdate, username };
    }
    if (email) {
      dataToUpdate = { ...dataToUpdate, email };
    }
    const dateNow = firestore.Timestamp.now();
    dataToUpdate = { ...dataToUpdate, updated_at: dateNow };

    await firestore().collection(ECollections.USERS).doc(id).update(dataToUpdate);
  }
}
