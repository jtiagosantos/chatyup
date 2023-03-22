import { supabase } from '../../../infra/supabase/client';
import { ETables } from '../../../infra/supabase/enums/tables.enum';
import { RoomMapper } from '../../../infra/supabase/mappers/room.mapper';

type CreateOneRoomDto = {
  name: string;
  code: string;
  ownerId: string;
};

export class CreateOneRoomService {
  public static async execute(input: CreateOneRoomDto) {
    const formattedRoom = RoomMapper.toDatabase(input);

    await supabase.from(ETables.ROOMS).insert(formattedRoom);
  }
}
