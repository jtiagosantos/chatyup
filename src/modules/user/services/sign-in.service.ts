import bcrypt from 'react-native-bcrypt';

import { supabase } from '../../../infra/supabase/client';
import { UserMapper } from '../../../infra/supabase/mappers/user.mapper';
import { EmailNotFoundError } from '../errors/email-not-found.error';
import { InvalidPasswordError } from '../errors/invalid-password.error';
import { ETables } from '../../../infra/supabase/enums/tables.enum';
import type { UserFromDatabase } from '../../../infra/supabase/mappers/user.mapper';

type SignInInput = {
  email: string;
  password: string;
};

export class SignInService {
  public static async execute({ email, password }: SignInInput) {
    const response = await supabase
      .from(ETables.USERS)
      .select<'*', UserFromDatabase>('*')
      .eq('email', email);

    const userExists = !!response.data?.length;

    if (!userExists) {
      throw new EmailNotFoundError();
    }

    const userFromDatabase = response.data![0];

    const isValidPassword = bcrypt.compareSync(password, userFromDatabase?.password);

    if (!isValidPassword) {
      throw new InvalidPasswordError();
    }

    const user = UserMapper.toDomain(userFromDatabase);

    return user;
  }
}
