import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import type { User } from '../../../modules/user/types/user.type';

export type UserToFirestore = Pick<User, 'firstName' | 'username' | 'email'>;

export type UserFromFirestore = {
  id: string;
  first_name: string;
  username: string;
  email: string;
  created_at: FirebaseFirestoreTypes.Timestamp;
  updated_at: FirebaseFirestoreTypes.Timestamp;
};

export class UserMapper {
  public static toFirestore(user: UserToFirestore) {
    const dateNow = firestore.Timestamp.now();

    return {
      first_name: user.firstName,
      username: user.username,
      email: user.email,
      created_at: dateNow,
      updated_at: dateNow,
    };
  }

  public static toDomain(user: UserFromFirestore): User {
    return {
      id: user.id,
      firstName: user.first_name,
      username: user.username,
      email: user.email,
      createdAt: user.created_at.toDate(),
      updatedAt: user.updated_at.toDate(),
    };
  }
}
