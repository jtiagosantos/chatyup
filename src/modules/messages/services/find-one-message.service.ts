import { supabase } from '../../../infra/supabase/client';
import { ETables } from '../../../infra/supabase/enums/tables.enum';
import { MessageMapper } from '../../../infra/supabase/mappers/message.mapper';

import type { MessageFromDatabase } from '../../../infra/supabase/mappers/message.mapper';

type FindOneMessageInput = {
  messageId?: string;
};

export class FindOneMessageService {
  public static async execute({ messageId }: FindOneMessageInput) {
    let messageFromDatabase: { [x: string]: any } | null;

    if (messageId) {
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
        .eq('id', messageId)
        .is('deleted_at', null);
      messageFromDatabase = response.data?.[0] ?? null;
    }

    if (!messageFromDatabase!) return null;

    const message = MessageMapper.toDomain(messageFromDatabase as MessageFromDatabase);

    return message;
  }
}
