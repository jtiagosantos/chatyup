import { supabase } from '../../../infra/supabase/client';
import { ETables } from '../../../infra/supabase/enums/tables.enum';

type UpdateOneUserDto = {
  id: string;
  firstName?: string;
  username?: string;
  email?: string;
  avatarURL?: string;
};

export class UpdateOneUserService {
  public static async execute({
    id,
    firstName,
    username,
    email,
    avatarURL,
  }: UpdateOneUserDto) {
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
    if (avatarURL) {
      dataToUpdate = { ...dataToUpdate, avatar_url: avatarURL };
    }

    const dateNow = new Date();
    dataToUpdate = { ...dataToUpdate, updated_at: dateNow };

    await supabase.from(ETables.USERS).update(dataToUpdate).eq('id', id);
  }
}
