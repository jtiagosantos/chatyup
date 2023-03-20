import { supabase } from '../../../infra/supabase/client';
import { ETables } from '../../../infra/supabase/enums/tables.enum';
import { UserMapper } from '../../../infra/supabase/mappers/user.mapper';
import type { UserFromDatabase } from '../../../infra/supabase/mappers/user.mapper';

type FindOneUserInput = {
  email?: string;
  username?: string;
};

export class FindOneUserService {
  public static async execute({ email, username }: FindOneUserInput) {
    let userFromDatabase: {
      [x: string]: any;
    } | null;

    if (email) {
      const response = await supabase.from(ETables.USERS).select('*').eq('email', email);
      userFromDatabase = response.data?.[0] ?? null;
    } else if (username) {
      const response = await supabase
        .from(ETables.USERS)
        .select('*')
        .eq('username', username);
      userFromDatabase = response.data?.[0] ?? null;
    }

    if (!userFromDatabase!) return null;

    const user = UserMapper.toDomain(userFromDatabase as UserFromDatabase);

    return user;
  }
}
