import { supabase } from '../../../infra/supabase/client';
import { ETables } from '../../../infra/supabase/enums/tables.enum';
import { MessageMapper } from '../../../infra/supabase/mappers/message.mapper';

import type { MessageFromDatabase } from '../../../infra/supabase/mappers/message.mapper';

type FindManyMessagesInput = {
  roomId?: string;
};

export class FindManyMessagesService {
  public static async execute({ roomId }: FindManyMessagesInput) {
    let messagesFromDatabase: { [x: string]: any }[] | null;

    if (roomId) {
      const response = await supabase
        .from(ETables.MESSAGES)
        .select(
          `
          *,
          user: users (
            first_name,
            avatar_url
          )
        `,
        )
        .eq('room_id', roomId)
        .is('deleted_at', null)
        .order('created_at', {
          ascending: false,
        });
      messagesFromDatabase = response.data;
    }

    const messagesExist = !!messagesFromDatabase!;

    if (!messagesExist) return [];

    const messages = messagesFromDatabase!.map((message) =>
      MessageMapper.toDomain(message as MessageFromDatabase),
    );

    return messages;
  }
}
