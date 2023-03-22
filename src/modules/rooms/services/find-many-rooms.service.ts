import { supabase } from '../../../infra/supabase/client';
import { ETables } from '../../../infra/supabase/enums/tables.enum';
import { RoomMapper } from '../../../infra/supabase/mappers/room.mapper';

import type { RoomFromDatabase } from '../../../infra/supabase/mappers/room.mapper';

type FindManyRoomsInput = {
  ownerId?: string;
};

export class FindManyRoomsService {
  public static async execute({ ownerId }: FindManyRoomsInput) {
    let roomsFromDatabase: { [x: string]: any }[] | null;

    if (ownerId) {
      const response = await supabase
        .from(ETables.ROOMS)
        .select('*')
        .eq('owner_id', ownerId)
        .is('deleted_at', null)
        .order('created_at', {
          ascending: false,
        });
      roomsFromDatabase = response.data;
    }

    const roomsExist = !!roomsFromDatabase!;

    if (!roomsExist) return [];

    const rooms = roomsFromDatabase!.map((room) =>
      RoomMapper.toDomain(room as RoomFromDatabase),
    );

    return rooms;
  }
}
