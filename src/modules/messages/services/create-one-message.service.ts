import { supabase } from '../../../infra/supabase/client';
import { ETables } from '../../../infra/supabase/enums/tables.enum';
import { EKindMessage } from '../enums/kind-message.enum';
import { MessageMapper } from '../../../infra/supabase/mappers/message.mapper';

type CreateOneMessageDto = {
  kind: keyof typeof EKindMessage;
  content: string;
  ownerId: string;
  roomId: string;
};

export class CreateOneMessageService {
  public static async execute(input: CreateOneMessageDto) {
    const formattedMessage = MessageMapper.toDatabase(input);

    await supabase.from(ETables.MESSAGES).insert(formattedMessage);
  }
}
