import { supabase } from '../../../infra/supabase/client';
import { ETables } from '../../../infra/supabase/enums/tables.enum';
import { RoomMapper } from '../../../infra/supabase/mappers/room.mapper';

import type { RoomFromDatabase } from '../../../infra/supabase/mappers/room.mapper';

type FindOneRoomInput = {
  code?: string;
};

export class FindOneRoomService {
  public static async execute({ code }: FindOneRoomInput) {
    let roomFromDatabase: { [x: string]: any } | null;

    if (code) {
      const response = await supabase.from(ETables.ROOMS).select('*').eq('code', code);
      roomFromDatabase = response.data?.[0] ?? null;
    }

    if (!roomFromDatabase!) return null;

    const room = RoomMapper.toDomain(roomFromDatabase as RoomFromDatabase);

    return room;
  }
}
