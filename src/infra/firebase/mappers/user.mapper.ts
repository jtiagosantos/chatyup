import firestore from '@react-native-firebase/firestore';
import type { User } from '../../../modules/user/types/user.type';

export type UserToFirestore = Omit<User, 'id' | 'password'>;

export type UserFromFirestore = {
  id: string;
  first_name: string;
  username: string;
  email: string;
  avatar_url: string;
};

export class UserMapper {
  public static toFirestore(user: UserToFirestore) {
    const dateNow = firestore.Timestamp.now();

    return {
      first_name: user.firstName,
      username: user.username,
      email: user.email,
      avatar_url: user.avatarURL,
      created_at: dateNow,
      updated_at: dateNow,
    };
  }

  public static toDomain(user: UserFromFirestore): Omit<User, 'password'> {
    return {
      id: user.id,
      firstName: user.first_name,
      username: user.username,
      email: user.email,
      avatarURL: user.avatar_url,
    };
  }
}
