import type { User } from '../../../modules/user/types/user.type';

type UserToDatabase = Omit<User, 'id' | 'avatarURL'>;

export type UserFromDatabase = {
  id: string;
  first_name: string;
  username: string;
  email: string;
  password: string;
  avatar_url: string;
};

export class UserMapper {
  public static toDatabase(data: UserToDatabase) {
    return {
      first_name: data.firstName,
      username: data.username,
      email: data.email,
      password: data.password,
    };
  }

  public static toDomain(data: UserFromDatabase): User {
    return {
      id: data.id,
      firstName: data.first_name,
      username: data.username,
      email: data.email,
      password: data.password,
      avatarURL: data.avatar_url,
    };
  }
}
