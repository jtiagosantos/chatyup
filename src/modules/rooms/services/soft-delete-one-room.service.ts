import { supabase } from '../../../infra/supabase/client';
import { ETables } from '../../../infra/supabase/enums/tables.enum';

type SoftDeleteOneRoomInput = {
  roomId: string;
};

export class SoftDeleteOneRoomService {
  public static async execute({ roomId }: SoftDeleteOneRoomInput) {
    const dateNow = new Date();

    await supabase.from(ETables.ROOMS).update({ deleted_at: dateNow }).eq('id', roomId);
  }
}
