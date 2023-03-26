import bcrypt from 'react-native-bcrypt';

import { supabase } from '../../../infra/supabase/client';
import { ETables } from '../../../infra/supabase/enums/tables.enum';
import { UserMapper } from '../../../infra/supabase/mappers/user.mapper';

type CreateOneUserDto = {
  firstName: string;
  username: string;
  email: string;
  password: string;
};

export class CreateOneUserService {
  public static async execute(input: CreateOneUserDto) {
    const data = {
      ...input,
      password: bcrypt.hashSync(input.password),
    };

    const formattedUser = UserMapper.toDatabase(data);

    await supabase.from(ETables.USERS).insert(formattedUser);
  }
}
